export type BranchType =
  | "technique"
  | "rhythm-timing"
  | "fretboard-theory"
  | "harmony-chords"
  | "lead-improvisation"
  | "music-theory"
  | "ear-training";

export type MusicElementType =
  | "key"
  | "time-signature"
  | "technique"
  | "scale"
  | "chord-type"
  | "rhythm-pattern"
  | "dynamic"
  | "articulation";

export interface MusicElement {
  type: MusicElementType;
  value: string;
  measure?: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

export interface MediaRef {
  type: "video" | "audio" | "image" | "pdf-excerpt";
  url: string;
  label: string;
  timestampSeconds?: number;
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface NodeContent {
  description: string;
  objectives: string[];
  tips?: string[];
  mediaRefs?: MediaRef[];
  externalLinks?: ExternalLink[];
}

export type ExerciseType = "technique" | "theory" | "ear-training" | "performance";

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  bpm?: number;
  durationSeconds?: number;
  xpValue: number;
  /** MIDI note name for pitch-detection exercises, e.g. "A4" or "E2" */
  targetNote?: string;
}

export interface UnlockCondition {
  type: "xp-threshold" | "node-complete" | "time-played" | "tier-test-passed";
  value: number;
}

export interface SkillNode {
  id: string;
  label: string;
  archetype: string;
  tier: number;
  branch?: BranchType;
  content: NodeContent;
  exercises?: Exercise[];
  xpReward: number;
  prerequisites: string[];
  unlockCondition?: UnlockCondition;
  musicElements?: MusicElement[];
  sourceScore?: string;
  position?: { x: number; y: number };
  icon?: string;
  color?: string;
}
