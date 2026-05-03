import type { SkillTree } from "../../schema/SkillTree";
import { JAZZ_NODES } from "./nodes";

export const JAZZ_TREE: SkillTree = {
  id: "jazz",
  archetypeId: "jazz",
  name: "Jazz Guitar",
  description:
    "A progressive skill tree covering the harmonic and improvisational language of jazz guitar, from shell voicings and jazz rhythm fundamentals through ii-V-I progressions, modal playing, and advanced techniques including tritone substitution, chord-melody playing, bebop lines, and full reharmonization.",
  nodes: JAZZ_NODES,
  rootNodeId: "jazz-001",
  createdAt: "2026-05-02T00:00:00.000Z",
};
