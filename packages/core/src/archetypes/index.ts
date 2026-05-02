import type { SkillTree } from "../schema/SkillTree";
import { ROCKER_TREE } from "./rocker/tree";

export const ARCHETYPE_REGISTRY: Record<string, SkillTree> = {
  rocker: ROCKER_TREE,
};

export function getArchetype(id: string): SkillTree | undefined {
  return ARCHETYPE_REGISTRY[id];
}
