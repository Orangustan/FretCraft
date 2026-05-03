import type { SkillTree } from "../schema/SkillTree";
import { ROCKER_TREE } from "./rocker/tree";
import { JAZZ_TREE } from "./jazz/tree";
import { BLUES_TREE } from "./blues/tree";
import { CLASSICAL_TREE } from "./classical/tree";
import { METAL_TREE } from "./metal/tree";
import { VAIDEOLOGY_TREE } from "./vaideology/tree";
import { COUNTRY_TREE } from "./country/tree";

export { ROCKER_TREE } from "./rocker/tree";
export { ROCKER_TIER_TESTS } from "./rocker/tests";
export { JAZZ_TREE } from "./jazz/tree";
export { BLUES_TREE } from "./blues/tree";
export { CLASSICAL_TREE } from "./classical/tree";
export { METAL_TREE } from "./metal/tree";
export { VAIDEOLOGY_TREE } from "./vaideology/tree";
export { COUNTRY_TREE } from "./country/tree";
export { COUNTRY_TIER_TESTS } from "./country/tests";
export { ACHIEVEMENTS } from "./achievements";

export const ARCHETYPE_REGISTRY: Record<string, SkillTree> = {
  rocker: ROCKER_TREE,
  jazz: JAZZ_TREE,
  blues: BLUES_TREE,
  classical: CLASSICAL_TREE,
  metal: METAL_TREE,
  vaideology: VAIDEOLOGY_TREE,
  country: COUNTRY_TREE,
};

export function getArchetype(id: string): SkillTree | undefined {
  return ARCHETYPE_REGISTRY[id];
}
