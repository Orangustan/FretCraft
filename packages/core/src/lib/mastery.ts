import type { FretCraftNode } from "../types/node";
import type { PracticeLogEntry } from "../types/practiceLog";
import type { MasteryTestResult } from "../types/mastery";

/** Result shape for `getMasteryGateStatus` — designed for direct UI rendering. */
export interface MasteryGateStatus {
  timeGate: { required: number; current: number; passed: boolean };
  qualityGate: { required: number; current: number; passed: boolean };
  spacingGate: { required: number; current: number; passed: boolean };
}

/**
 * Returns the practice log entries for a specific node.
 */
function getNodeLogs(logs: PracticeLogEntry[], nodeId: string): PracticeLogEntry[] {
  return logs.filter((l) => l.nodeId === nodeId);
}

/**
 * Computes the average quality rating across the most recent N sessions for a node.
 * Returns 0 if there are fewer sessions than `count`.
 */
function recentQualityAvg(nodeLogs: PracticeLogEntry[], count: number): number {
  if (nodeLogs.length === 0) return 0;
  const recent = nodeLogs.slice(-count);
  const sum = recent.reduce((acc, l) => acc + l.qualityRating, 0);
  return sum / recent.length;
}

/**
 * Counts the number of distinct calendar days (YYYY-MM-DD) represented in a log set.
 */
function countUniqueDays(nodeLogs: PracticeLogEntry[]): number {
  return new Set(nodeLogs.map((l) => l.date)).size;
}

/**
 * Returns a structured breakdown of each mastery gate for a node, useful for
 * rendering a "here's what you still need" progress checklist in the UI.
 */
export function getMasteryGateStatus(
  node: FretCraftNode,
  logs: PracticeLogEntry[]
): MasteryGateStatus {
  const nodeLogs = getNodeLogs(logs, node.id);
  const { mastery } = node;

  const totalMinutes = nodeLogs.reduce((acc, l) => acc + l.durationMinutes, 0);
  const uniqueDays = countUniqueDays(nodeLogs);
  const avgQuality = recentQualityAvg(nodeLogs, mastery.recentSessionCount);

  return {
    timeGate: {
      required: mastery.minTotalMinutes,
      current: totalMinutes,
      passed: totalMinutes >= mastery.minTotalMinutes,
    },
    qualityGate: {
      required: mastery.minRecentQualityAvg,
      current: avgQuality,
      passed: avgQuality >= mastery.minRecentQualityAvg,
    },
    spacingGate: {
      required: mastery.minUniqueSessionDays,
      current: uniqueDays,
      passed: uniqueDays >= mastery.minUniqueSessionDays,
    },
  };
}

/**
 * Determines whether the learner may attempt the mastery test right now.
 * All three gates must pass AND the retry cooldown must have elapsed.
 *
 * Does NOT check whether the test has already been passed — the caller
 * should guard on `node.progress.masteryConfirmed` separately.
 */
export function canAttemptMastery(
  node: FretCraftNode,
  logs: PracticeLogEntry[]
): boolean {
  const gates = getMasteryGateStatus(node, logs);
  const allGatesPassed =
    gates.timeGate.passed &&
    gates.qualityGate.passed &&
    gates.spacingGate.passed;

  if (!allGatesPassed) return false;

  // Enforce retry cooldown after a failed attempt.
  const { lastMasteryAttemptDate, masteryAttempts } = node.progress;
  if (masteryAttempts > 0 && lastMasteryAttemptDate !== null) {
    const lastAttempt = new Date(lastMasteryAttemptDate);
    const cooldownEnd = new Date(lastAttempt);
    cooldownEnd.setDate(cooldownEnd.getDate() + node.mastery.retryAfterDays);
    if (new Date() < cooldownEnd) return false;
  }

  return true;
}

/**
 * Evaluates a completed mastery test result and returns whether it constitutes
 * a confirmed pass. Both the high-level `passed` flag on the result AND the
 * rubric coverage are checked.
 *
 * Academic score is validated when present (must be ≥ 0.7 by convention —
 * override this threshold in the caller if the node specifies otherwise).
 */
export function confirmMastery(
  node: FretCraftNode,
  testResult: MasteryTestResult
): boolean {
  if (!testResult.passed) return false;

  // Verify rubric: every required criterion must appear in rubricCriteriaMet.
  const requiredIds = node.mastery.rubric.map((r) => r.id);
  const metSet = new Set(testResult.rubricCriteriaMet);
  const allRubricMet = requiredIds.every((id) => metSet.has(id));
  if (!allRubricMet) return false;

  // Validate academic score when present.
  if (testResult.academicScore !== null && testResult.academicScore < 0.7) {
    return false;
  }

  return true;
}
