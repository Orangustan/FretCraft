import type { SkillTree } from "../../schema/SkillTree";
import { UNIVERSAL_NODES } from "./nodes";

export const UNIVERSAL_TREE: SkillTree = {
  id: "universal",
  archetypeId: "universal",
  name: "Guitar Foundation",
  description:
    "A universal guitar curriculum that builds technique and rhythm from the ground up, then branches outward into fretboard logic, harmony, ear training, theory, and lead improvisation.",
  nodes: UNIVERSAL_NODES,
  rootNodeId: "u-technique",
  createdAt: "2026-01-01T00:00:00.000Z",
};
