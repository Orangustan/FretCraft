import type { SkillNode } from "./SkillNode";

export type ArchetypeId = "rocker" | "jazz" | "blues" | "classical" | "metal" | "vaideology" | "country" | "custom";

export interface SkillTree {
  id: string;
  archetypeId: ArchetypeId | string;
  name: string;
  description: string;
  nodes: SkillNode[];
  rootNodeId: string;
  createdAt: string;
  sourceScoreId?: string;
}
