import type { SkillTree } from "../../schema/SkillTree";
import { BLUES_NODES } from "./nodes";

export const BLUES_TREE: SkillTree = {
  id: "blues",
  archetypeId: "blues",
  name: "Blues Guitar",
  description:
    "A progressive skill tree covering the core techniques and vocabulary of blues guitar, from the 12-bar form and blues scale through string bends, shuffle rhythm, and vibrato, building toward advanced skills including call and response, turnarounds, double stops, hybrid picking, the Texas shuffle, and expressive solo playing.",
  nodes: BLUES_NODES,
  rootNodeId: "blues-001",
  createdAt: "2026-05-02T00:00:00.000Z",
};
