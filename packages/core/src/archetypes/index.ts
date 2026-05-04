import type { SkillTree } from "../schema/SkillTree";
import type { RankTest } from "../schema/RankTest";
import { ROCKER_TREE } from "./rocker/tree";
import { JAZZ_TREE } from "./jazz/tree";
import { BLUES_TREE } from "./blues/tree";
import { CLASSICAL_TREE } from "./classical/tree";
import { METAL_TREE } from "./metal/tree";
import { VAIDEOLOGY_TREE } from "./vaideology/tree";
import { COUNTRY_TREE } from "./country/tree";
import { ROCKER_RANK_TESTS } from "./rocker/rankTests";
import { JAZZ_RANK_TESTS } from "./jazz/rankTests";
import { BLUES_RANK_TESTS } from "./blues/rankTests";
import { CLASSICAL_RANK_TESTS } from "./classical/rankTests";
import { METAL_RANK_TESTS } from "./metal/rankTests";
import { VAIDEOLOGY_RANK_TESTS } from "./vaideology/rankTests";
import { COUNTRY_RANK_TESTS } from "./country/rankTests";

export { ROCKER_TREE } from "./rocker/tree";
export { ROCKER_TIER_TESTS } from "./rocker/tests";
export { ROCKER_RANK_TESTS } from "./rocker/rankTests";
export { JAZZ_TREE } from "./jazz/tree";
export { JAZZ_RANK_TESTS } from "./jazz/rankTests";
export { BLUES_TREE } from "./blues/tree";
export { BLUES_RANK_TESTS } from "./blues/rankTests";
export { CLASSICAL_TREE } from "./classical/tree";
export { CLASSICAL_RANK_TESTS } from "./classical/rankTests";
export { METAL_TREE } from "./metal/tree";
export { METAL_RANK_TESTS } from "./metal/rankTests";
export { VAIDEOLOGY_TREE } from "./vaideology/tree";
export { VAIDEOLOGY_RANK_TESTS } from "./vaideology/rankTests";
export { COUNTRY_TREE } from "./country/tree";
export { COUNTRY_TIER_TESTS } from "./country/tests";
export { COUNTRY_RANK_TESTS } from "./country/rankTests";
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

export const RANK_TEST_REGISTRY: Record<string, RankTest[]> = {
  rocker: ROCKER_RANK_TESTS,
  jazz: JAZZ_RANK_TESTS,
  blues: BLUES_RANK_TESTS,
  classical: CLASSICAL_RANK_TESTS,
  metal: METAL_RANK_TESTS,
  vaideology: VAIDEOLOGY_RANK_TESTS,
  country: COUNTRY_RANK_TESTS,
};

export const ALL_RANK_TESTS: RankTest[] = [
  ...ROCKER_RANK_TESTS,
  ...JAZZ_RANK_TESTS,
  ...BLUES_RANK_TESTS,
  ...CLASSICAL_RANK_TESTS,
  ...METAL_RANK_TESTS,
  ...VAIDEOLOGY_RANK_TESTS,
  ...COUNTRY_RANK_TESTS,
];

export function getRankTestsForArchetype(archetypeId: string): RankTest[] {
  return RANK_TEST_REGISTRY[archetypeId] ?? [];
}
