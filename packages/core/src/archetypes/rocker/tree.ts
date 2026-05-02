import type { SkillTree } from "../../schema/SkillTree";
import { ROCKER_NODES } from "./nodes";

export const ROCKER_TREE: SkillTree = {
  id: "rocker",
  archetypeId: "rocker",
  name: "Rock Guitar",
  description:
    "A progressive skill tree covering the core techniques of rock guitar, from open chords and pick technique through barre chords, pentatonic soloing, and expressive lead playing.",
  nodes: ROCKER_NODES,
  rootNodeId: "rocker-001",
  createdAt: "2026-05-01T00:00:00.000Z",
};
