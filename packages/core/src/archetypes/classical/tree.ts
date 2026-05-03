import type { SkillTree } from "../../schema/SkillTree";
import { CLASSICAL_NODES } from "./nodes";

export const CLASSICAL_TREE: SkillTree = {
  id: "classical",
  archetypeId: "classical",
  name: "Classical Guitar",
  description:
    "A structured path through the foundational techniques of classical guitar, from right-hand strokes and arpeggio independence through Bach counterpoint, Tárrega Romanticism, and concert performance preparation.",
  nodes: CLASSICAL_NODES,
  rootNodeId: "classical-001",
  createdAt: "2026-05-02T00:00:00.000Z",
};
