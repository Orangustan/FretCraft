import type { FretCraftNode, NodeProgress } from "../types/node";
import type { PracticeLogEntry } from "../types/practiceLog";
import type { BonusEvent, XPBreakdown } from "../types/xp";
import type { MasteryTestResult } from "../types/mastery";
import { calculateSessionXP, checkBonusEvents } from "./xp";

/**
 * Returns all log entries for a specific node, in chronological order.
 */
export function getNodeLogs(
  logs: PracticeLogEntry[],
  nodeId: string
): PracticeLogEntry[] {
  return logs.filter((l) => l.nodeId === nodeId);
}

/**
 * Calculates the current global practice streak in consecutive calendar days.
 * Any log entry on any node counts toward the streak.
 * The streak is broken when there is a calendar-day gap in the log history.
 */
export function calculateCurrentStreak(logs: PracticeLogEntry[]): number {
  if (logs.length === 0) return 0;

  const uniqueDays = [
    ...new Set(logs.map((l) => l.date)),
  ].sort().reverse(); // most recent first

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  })();

  // Streak only counts if the most recent session was today or yesterday.
  if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const current = new Date(uniqueDays[i - 1]);
    const prev = new Date(uniqueDays[i]);
    const diffDays =
      (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diffDays) === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Creates and returns a fully computed log entry (with XP and bonus events),
 * alongside the full XPBreakdown for display purposes.
 *
 * The caller is responsible for appending the returned entry to the log store.
 * This function is pure — it does not mutate any arguments.
 */
export function addLogEntry(
  existing: PracticeLogEntry[],
  entry: Omit<PracticeLogEntry, "id" | "xpAwarded" | "bonusEventsTriggered">,
  node: FretCraftNode,
  currentStreak: number,
  testResult?: MasteryTestResult
): { entry: PracticeLogEntry; breakdown: XPBreakdown; bonusEvents: BonusEvent[] } {
  const breakdown = calculateSessionXP({
    durationMinutes: entry.durationMinutes,
    qualityRating: entry.qualityRating,
    currentStreak,
    nodeDifficulty: node.difficulty,
  });

  // Determine if consistency-week bonus fires so we can include it in the
  // draft entry before passing it to checkBonusEvents.
  const projectedStreak = currentStreak; // streak includes today if we log
  const weekBonusFired = projectedStreak >= 7;

  const draftEntry: PracticeLogEntry = {
    ...entry,
    id: "generate-with-crypto.randomUUID()", // generate with crypto.randomUUID()
    xpAwarded: breakdown.finalXP,
    bonusEventsTriggered: weekBonusFired ? ["consistency-week"] : [],
  };

  const bonusEvents = checkBonusEvents({
    node,
    logs: existing,
    newEntry: draftEntry,
    testResult,
  });

  const bonusXP = bonusEvents.reduce((acc, e) => acc + e.xp, 0);
  const totalAwarded = breakdown.finalXP + bonusXP;

  const finalEntry: PracticeLogEntry = {
    ...draftEntry,
    xpAwarded: totalAwarded,
    bonusEventsTriggered: bonusEvents.map((e) => e.id),
  };

  const finalBreakdown: XPBreakdown = {
    ...breakdown,
    bonusEvents,
    totalAwarded,
  };

  return { entry: finalEntry, breakdown: finalBreakdown, bonusEvents };
}

/**
 * Recomputes all NodeProgress summary fields from the complete log history
 * for a given node. Call this whenever the log changes to keep progress
 * in sync without storing derived state separately.
 *
 * The `status` field is not recalculated here — status transitions
 * (locked → unlocked → in-progress → mastered) are managed by the
 * mastery gate logic in lib/mastery.ts and should be applied separately.
 */
export function updateNodeProgress(
  node: FretCraftNode,
  logs: PracticeLogEntry[]
): NodeProgress {
  const nodeLogs = getNodeLogs(logs, node.id);

  if (nodeLogs.length === 0) {
    return {
      ...node.progress,
      totalMinutesLogged: 0,
      totalXpEarned: 0,
      averageQuality: 0,
      uniqueDaysActive: 0,
      currentStreak: calculateCurrentStreak(logs),
      lastSessionDate: null,
    };
  }

  const totalMinutesLogged = nodeLogs.reduce(
    (acc, l) => acc + l.durationMinutes,
    0
  );
  const totalXpEarned = nodeLogs.reduce((acc, l) => acc + l.xpAwarded, 0);
  const averageQuality =
    nodeLogs.reduce((acc, l) => acc + l.qualityRating, 0) / nodeLogs.length;
  const uniqueDaysActive = new Set(nodeLogs.map((l) => l.date)).size;
  const currentStreak = calculateCurrentStreak(logs);

  const sorted = [...nodeLogs].sort((a, b) => (a.date > b.date ? -1 : 1));
  const lastSessionDate = sorted[0]?.date ?? null;

  return {
    ...node.progress,
    totalMinutesLogged,
    totalXpEarned,
    averageQuality,
    uniqueDaysActive,
    currentStreak,
    lastSessionDate,
  };
}
