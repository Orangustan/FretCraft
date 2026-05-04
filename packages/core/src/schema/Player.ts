export type NodeStatus = "locked" | "available" | "in-progress" | "completed";

export type PlayerRank = "beginner" | "novice" | "intermediate" | "expert" | "pro";

export const RANK_ORDER: PlayerRank[] = ["beginner", "novice", "intermediate", "expert", "pro"];

export interface NodeProgress {
  nodeId: string;
  status: NodeStatus;
  xpEarned: number;
  completedExercises: string[];
  completedAt?: string;
}

export interface Player {
  id: string;
  name: string;
  activeArchetypeId: string;
  xpTotal: number;
  level: number;
  nodeProgress: Record<string, NodeProgress>;
  passedTierTests: string[];
  passedRankTests: string[];
  unlockedAchievements: string[];
  archetypeRanks: Record<string, PlayerRank>;
}
