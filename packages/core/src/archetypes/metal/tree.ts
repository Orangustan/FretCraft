import type { SkillTree } from "../../schema/SkillTree";
import { METAL_NODES } from "./nodes";

export const METAL_TREE: SkillTree = {
  id: "metal",
  archetypeId: "metal",
  name: "Metal Guitar",
  description:
    "A high-intensity path through metal guitar technique, from the fundamentals of alternate picking and palm muting through gallop rhythms, sweep arpeggios, two-hand tapping, tremolo picking, neo-classical phrasing, and original metal composition.",
  nodes: METAL_NODES,
  rootNodeId: "metal-001",
  createdAt: "2026-05-02T00:00:00.000Z",
};
