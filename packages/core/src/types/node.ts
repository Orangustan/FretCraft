/** Which domain of guitar knowledge this node belongs to. */
export type NodeCategory =
  | "technique"
  | "theory"
  | "ear-training"
  | "rhythm"
  | "musicianship"
  | "repertoire"
  | "composition";

/**
 * Structural role of the node in the skill graph.
 * - core: required for curriculum progression
 * - elective: optional depth / side branches
 * - milestone: significant achievement gates (e.g. first song, first solo)
 * - bonus: extra-credit content beyond the main path
 */
export type NodeType = "core" | "elective" | "milestone" | "bonus";

/** Lifecycle state of a node for a given learner. */
export type NodeStatus = "locked" | "unlocked" | "in-progress" | "mastered";

/** The visual format used to render notation for this node. */
export type DiagramType = "fretboard" | "chord" | "tab" | "staff";

/**
 * What kind of mastery test is required.
 * - academic: written / verbal / recognition quiz
 * - performance: live or recorded playing demonstration
 * - both: must pass both components
 */
export type TestType = "academic" | "performance" | "both";

/**
 * A single dimension of the mastery rubric.
 * Weights across all criteria in a MasteryRequirements.rubric must sum to 1.0.
 */
export interface RubricCriterion {
  id: string;
  description: string;
  /** Fractional weight of this criterion. All weights in one rubric must total 1.0. */
  weight: number;
  /** null = not yet evaluated; true/false = evaluator judgment */
  passed: boolean | null;
}

/** A single piece of supporting media attached to a node. */
export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: "lesson" | "demo" | "breakdown" | "backing-track";
}

/**
 * Notation representations for the musical content in this node.
 * Fields are null when that format is not applicable or not yet authored.
 */
export interface NotationBlock {
  /** ASCII tablature string or URL to a tab image / PDF. null if not applicable. */
  tablature: string | null;
  /** ASCII chord grid or URL to chord diagram image. null if not applicable. */
  chordChart: string | null;
  /** URL to standard notation image/PDF, or LilyPond source. null if not applicable. */
  standardNotation: string | null;
  /** The primary visual format used to render this node's notation in the UI. */
  diagramType: DiagramType;
}

/** A single focused practice exercise within a node. */
export interface Drill {
  id: string;
  description: string;
  /** Starting tempo in BPM. null when the drill is non-metric (e.g. free-form listening). */
  tempoStart?: number;
  /** Goal tempo in BPM once the drill is mastered. */
  tempoTarget?: number;
  durationMinutes: number;
}

/** BPM range for a node's practice material. null when the node is non-metric. */
export interface TempoRange {
  start: number;
  target: number;
}

/**
 * All criteria that must be satisfied before a learner can claim mastery.
 * Gates are evaluated independently; all must pass simultaneously.
 */
export interface MasteryRequirements {
  testType: TestType;
  /** Prompt shown during the academic (knowledge) portion. null when testType is "performance". */
  academicPrompt: string | null;
  /** Prompt shown during the performance portion. null when testType is "academic". */
  performancePrompt: string | null;
  /** Ordered rubric criteria the evaluator scores during a mastery attempt. */
  rubric: RubricCriterion[];
  /** Minimum number of distinct calendar days with at least one practice log entry. */
  minUniqueSessionDays: number;
  /** Minimum cumulative minutes logged across all sessions for this node. */
  minTotalMinutes: number;
  /**
   * Average quality rating across the most recent `recentSessionCount` sessions
   * must meet or exceed this threshold (1–5 scale).
   */
  minRecentQualityAvg: number;
  /** How many recent sessions are averaged for the quality trend gate. */
  recentSessionCount: number;
  /** Minimum days that must elapse between mastery attempts after a failure. */
  retryAfterDays: number;
}

/**
 * Running summary of a learner's engagement with a single node.
 * Derived from the full PracticeLogEntry history; do not mutate directly.
 */
export interface NodeProgress {
  status: NodeStatus;
  totalMinutesLogged: number;
  totalXpEarned: number;
  /** Rolling average quality across all sessions for this node. */
  averageQuality: number;
  /** Count of distinct calendar days with at least one session logged. */
  uniqueDaysActive: number;
  /** Current consecutive-day practice streak (any node resets/extends this). */
  currentStreak: number;
  masteryAttempts: number;
  /** True once all mastery gates are cleared (time, quality, spacing). */
  masteryUnlocked: boolean;
  /** True once a passing mastery test result has been confirmed. */
  masteryConfirmed: boolean;
  /** ISO date string of the most recent practice session, or null if none yet. */
  lastSessionDate: string | null;
  /** ISO date string of the most recent mastery attempt, or null if none yet. */
  lastMasteryAttemptDate: string | null;
}

/** The complete definition of a skill node in the FretCraft graph. */
export interface FretCraftNode {
  /** Kebab-case slug used as the canonical identifier and prerequisite reference. */
  id: string;
  name: string;
  description: string;
  /** Curriculum phase index (0–7). 0 = Orientation, 7 = Vaideology. */
  phase: number;
  category: NodeCategory;
  /** Subjective difficulty on a 1–5 scale; influences XP multipliers. */
  difficulty: number;
  nodeType: NodeType;
  /** IDs of nodes that must be mastered before this node unlocks. */
  prerequisites: string[];
  mastery: MasteryRequirements;
  media: MediaItem[];
  notation: NotationBlock;
  practice: {
    /** Rough total time investment expected to reach mastery. */
    estimatedHours: number;
    drills: Drill[];
    /** Null for non-metric nodes (e.g. ear training, composition). */
    tempoRange: TempoRange | null;
    commonMistakes: string[];
    /** IDs of nodes that complement or reinforce this one. */
    relatedNodes: string[];
  };
  /** Song titles that prominently feature the skill taught in this node. */
  benchmarkSongs: string[];
  /** Live progress state for the current learner. Recalculated from logs. */
  progress: NodeProgress;
  meta: {
    tags: string[];
    /** Page reference in Steve Vai's Vaideology, or null if not referenced there. */
    vaideologyRef: string | null;
    /** ISO date string of the last content edit. */
    lastUpdated: string;
    /** Increment on every breaking schema change. */
    version: number;
    instructorNotes: string;
  };
}
