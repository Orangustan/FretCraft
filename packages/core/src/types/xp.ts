/**
 * A discrete event that awards bonus XP on top of a session's base calculation.
 * Bonus events are checked after the session XP is calculated.
 */
export interface BonusEvent {
  id: string;
  label: string;
  xp: number;
  /** Human-readable description of what caused this event to fire. */
  trigger: string;
  /** If true, this event can only be awarded once per node across all time. */
  oneTimeOnly: boolean;
}

/**
 * Full audit trail of how XP was computed for a single practice session.
 * Each multiplier is applied independently to rawXP; they do not stack
 * (i.e. finalXP = rawXP × qualityMultiplier × streakMultiplier × nodeWeightMultiplier).
 * Diminishing returns are already baked into rawXP before multipliers are applied.
 */
export interface XPBreakdown {
  /** Base XP after diminishing-returns tiers, before any multipliers. */
  rawXP: number;
  qualityMultiplier: number;
  streakMultiplier: number;
  /** Difficulty-weight multiplier derived from the node's difficulty (1–5). */
  nodeWeightMultiplier: number;
  /**
   * Effective aggregate diminishing-returns factor for display purposes only.
   * Computed as rawXP / (durationMinutes × BASE_RATE_PER_MINUTE).
   */
  diminishingReturnsMultiplier: number;
  /** Rounded integer: rawXP × qualityMultiplier × streakMultiplier × nodeWeightMultiplier. */
  finalXP: number;
  /** Bonus events that fired during this session. */
  bonusEvents: BonusEvent[];
  /** finalXP + sum of all bonusEvent.xp values. */
  totalAwarded: number;
}
