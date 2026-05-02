export type NodeStatus = "locked" | "available" | "in-progress" | "completed";

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
}
