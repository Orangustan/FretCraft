import type { TestType } from "./node";

/** Subjective quality self-assessment for a practice session (1 = poor, 5 = excellent). */
export type QualityRating = 1 | 2 | 3 | 4 | 5;

/**
 * An immutable record of a single practice session for one node.
 * Never mutate existing entries — append only. Recalculate NodeProgress
 * from the full log whenever the log changes.
 */
export interface PracticeLogEntry {
  /** UUID. Generate with crypto.randomUUID() */
  id: string;
  nodeId: string;
  /** Calendar date in YYYY-MM-DD format (local time, not UTC). */
  date: string;
  durationMinutes: number;
  qualityRating: QualityRating;
  /**
   * Highest tempo reached during this session in BPM.
   * null when the session involved no metric/tempo-based practice.
   */
  tempoReached: number | null;
  /** Free-form session notes from the learner. */
  notes: string;
  xpAwarded: number;
  /** IDs of BonusEvents triggered during this session. */
  bonusEventsTriggered: string[];
  /** Freeform labels for filtering and review (e.g. "technique", "slow-practice"). */
  tags: string[];
}

export type { TestType };
