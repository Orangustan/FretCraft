import type { QualityRating } from "../types/practiceLog";
import type { BonusEvent } from "../types/xp";

/** Base XP awarded per minute of practice before any multipliers. */
export const BASE_RATE_PER_MINUTE = 3;

/**
 * Multiplier applied to rawXP based on the learner's self-assessed quality rating.
 * A quality-1 session still awards XP — it represents effort and time.
 */
export const QUALITY_MULTIPLIERS: Record<QualityRating, number> = {
  1: 0.4,
  2: 0.7,
  3: 1.0,
  4: 1.3,
  5: 1.6,
};

/**
 * Streak bonuses applied when the learner has practiced for N or more consecutive
 * calendar days. The highest applicable threshold wins (not cumulative).
 */
export const STREAK_THRESHOLDS: { days: number; multiplier: number }[] = [
  { days: 1,  multiplier: 1.0  },
  { days: 3,  multiplier: 1.1  },
  { days: 7,  multiplier: 1.25 },
  { days: 14, multiplier: 1.4  },
  { days: 30, multiplier: 1.6  },
];

/**
 * Multiplier applied to rawXP based on node difficulty.
 * Harder nodes reward more XP to reflect the greater skill investment.
 */
export const DIFFICULTY_MULTIPLIERS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 0.8,
  2: 0.9,
  3: 1.0,
  4: 1.15,
  5: 1.35,
};

/**
 * Tiered diminishing returns on session duration.
 * Applied before quality/streak/difficulty multipliers.
 * Process each tier from top to bottom; partial minutes are prorated.
 *
 * Example: 75-minute session
 *   0–30 min  → 30 × 3 × 1.0  = 90 rawXP
 *   31–60 min → 30 × 3 × 0.5  = 45 rawXP
 *   61–75 min → 15 × 3 × 0.1  =  4.5 rawXP ≈ 4 rawXP
 *   total rawXP = 139
 */
export const DIMINISHING_RETURNS_TIERS: { upToMinutes: number; rate: number }[] = [
  { upToMinutes: 30,       rate: 1.0 },
  { upToMinutes: 60,       rate: 0.5 },
  { upToMinutes: Infinity, rate: 0.1 },
];

/**
 * All recognized bonus events in the system.
 * `checkBonusEvents()` in lib/xp.ts evaluates which of these fire
 * after each practice session.
 */
export const BONUS_EVENTS: BonusEvent[] = [
  {
    id: "first-session",
    label: "First Session",
    xp: 25,
    trigger: "Awarded when the learner logs their very first session on a node.",
    oneTimeOnly: true,
  },
  {
    id: "mastery-unlocked",
    label: "Mastery Unlocked",
    xp: 150,
    trigger: "Awarded when all mastery gates are cleared and a passing test result is confirmed.",
    oneTimeOnly: true,
  },
  {
    id: "tempo-target-hit",
    label: "Tempo Target Hit",
    xp: 50,
    trigger: "Awarded when the session's tempoReached meets or exceeds the node's tempoRange.target.",
    oneTimeOnly: false,
  },
  {
    id: "consistency-week",
    label: "Consistent Week",
    xp: 75,
    trigger: "Awarded when the global practice streak reaches 7 or more consecutive days.",
    oneTimeOnly: false,
  },
  {
    id: "clean-first-attempt",
    label: "Clean First Attempt",
    xp: 100,
    trigger: "Awarded when the learner passes the mastery test on their very first attempt for a node.",
    oneTimeOnly: true,
  },
];
