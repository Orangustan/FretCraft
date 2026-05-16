import type { QualityRating } from "../types/practiceLog";
import type { BonusEvent, XPBreakdown } from "../types/xp";
import type { FretCraftNode } from "../types/node";
import type { PracticeLogEntry } from "../types/practiceLog";
import type { MasteryTestResult } from "../types/mastery";
import {
  BASE_RATE_PER_MINUTE,
  QUALITY_MULTIPLIERS,
  STREAK_THRESHOLDS,
  DIFFICULTY_MULTIPLIERS,
  DIMINISHING_RETURNS_TIERS,
  BONUS_EVENTS,
} from "../constants/xp";

/**
 * Applies diminishing-returns tiers to a session duration and returns raw XP
 * (before quality, streak, or difficulty multipliers are applied).
 *
 * Each tier defines a rate multiplier for minutes up to its ceiling.
 * Minutes are processed in tier order; partial tiers are prorated.
 */
export function calculateDiminishedMinutes(durationMinutes: number): number {
  let remaining = durationMinutes;
  let prevCeiling = 0;
  let rawXP = 0;

  for (const tier of DIMINISHING_RETURNS_TIERS) {
    if (remaining <= 0) break;
    const tierCapacity = tier.upToMinutes - prevCeiling;
    const minutesInTier = Math.min(remaining, tierCapacity);
    rawXP += minutesInTier * BASE_RATE_PER_MINUTE * tier.rate;
    remaining -= minutesInTier;
    prevCeiling = tier.upToMinutes;
  }

  return Math.round(rawXP);
}

/**
 * Returns the XP quality multiplier for a given self-assessment rating.
 */
export function getQualityMultiplier(quality: QualityRating): number {
  return QUALITY_MULTIPLIERS[quality];
}

/**
 * Returns the streak multiplier for the given consecutive-day streak count.
 * Selects the highest threshold whose `days` value does not exceed `currentStreak`.
 */
export function getStreakMultiplier(currentStreak: number): number {
  let multiplier = STREAK_THRESHOLDS[0].multiplier;
  for (const tier of STREAK_THRESHOLDS) {
    if (currentStreak >= tier.days) {
      multiplier = tier.multiplier;
    }
  }
  return multiplier;
}

/**
 * Returns the difficulty-weight XP multiplier for a node difficulty level (1–5).
 * Falls back to 1.0 for out-of-range values.
 */
export function getDifficultyMultiplier(difficulty: number): number {
  return DIFFICULTY_MULTIPLIERS[difficulty as 1 | 2 | 3 | 4 | 5] ?? 1.0;
}

/**
 * Computes the full XP breakdown for a single practice session.
 * Diminishing returns are applied first to produce rawXP; then
 * quality, streak, and difficulty multipliers are applied independently.
 * Bonus events are NOT included here — call `checkBonusEvents` separately.
 */
export function calculateSessionXP(params: {
  durationMinutes: number;
  qualityRating: QualityRating;
  currentStreak: number;
  nodeDifficulty: number;
}): XPBreakdown {
  const { durationMinutes, qualityRating, currentStreak, nodeDifficulty } = params;

  const rawXP = calculateDiminishedMinutes(durationMinutes);
  const qualityMultiplier = getQualityMultiplier(qualityRating);
  const streakMultiplier = getStreakMultiplier(currentStreak);
  const nodeWeightMultiplier = getDifficultyMultiplier(nodeDifficulty);

  const finalXP = Math.round(rawXP * qualityMultiplier * streakMultiplier * nodeWeightMultiplier);

  const basePossible = durationMinutes * BASE_RATE_PER_MINUTE;
  const diminishingReturnsMultiplier =
    basePossible > 0 ? rawXP / basePossible : 1;

  return {
    rawXP,
    qualityMultiplier,
    streakMultiplier,
    nodeWeightMultiplier,
    diminishingReturnsMultiplier,
    finalXP,
    bonusEvents: [],
    totalAwarded: finalXP,
  };
}

/**
 * Evaluates which bonus events fire for a given session.
 * Returns only events that are applicable; the caller merges these into
 * the XPBreakdown returned by `calculateSessionXP`.
 *
 * One-time events are only returned if they have not appeared in any
 * previous log entry's `bonusEventsTriggered` list for this node.
 */
export function checkBonusEvents(params: {
  node: FretCraftNode;
  logs: PracticeLogEntry[];
  newEntry: PracticeLogEntry;
  testResult?: MasteryTestResult;
}): BonusEvent[] {
  const { node, logs, newEntry, testResult } = params;
  const triggered: BonusEvent[] = [];

  const previouslyFiredIds = new Set(
    logs.flatMap((l) => l.bonusEventsTriggered)
  );

  for (const event of BONUS_EVENTS) {
    // Skip one-time events already awarded for this node.
    if (event.oneTimeOnly && previouslyFiredIds.has(event.id)) continue;

    switch (event.id) {
      case "first-session":
        if (logs.length === 0) triggered.push(event);
        break;

      case "mastery-unlocked":
        if (testResult?.passed && node.progress.masteryAttempts === 0) {
          triggered.push(event);
        }
        break;

      case "tempo-target-hit": {
        const target = node.practice.tempoRange?.target;
        if (
          target !== undefined &&
          newEntry.tempoReached !== null &&
          newEntry.tempoReached >= target
        ) {
          triggered.push(event);
        }
        break;
      }

      case "consistency-week":
        // Calculated after the new entry is appended — caller supplies streak.
        if (newEntry.bonusEventsTriggered.includes("consistency-week")) {
          triggered.push(event);
        }
        break;

      case "clean-first-attempt":
        if (
          testResult?.passed &&
          node.progress.masteryAttempts === 0
        ) {
          triggered.push(event);
        }
        break;
    }
  }

  return triggered;
}
