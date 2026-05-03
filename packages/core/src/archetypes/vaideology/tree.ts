import type { SkillTree } from "../../schema/SkillTree";
import { VAIDEOLOGY_NODES } from "./nodes";

export const VAIDEOLOGY_TREE: SkillTree = {
  id: "vaideology",
  archetypeId: "vaideology",
  name: "Vaideology: Music Theory for Guitar",
  description:
    "A 12-node skill tree derived from Steve Vai's Vaideology (Hal Leonard, 2019), built around his core thesis that intellectual understanding and experiential knowing are complementary — not interchangeable. The tree runs two parallel tracks: Academic Study (theory, notation, naming) and Experiential Study (listening, feeling, internalizing), converging at two synthesis nodes: Chord Scales / Modes (harmony synthesis) and Guitar Harmonics / The Groove (rhythm and technique synthesis). Topics span chromatic fretboard mapping, interval theory, key signatures, chord spelling, modal progressions, rhythm notation, composition notation, pentatonic and blues scales, and Vai's signature artificial harmonics.",
  nodes: VAIDEOLOGY_NODES,
  rootNodeId: "vai-001",
  createdAt: "2026-05-02T00:00:00.000Z",
};
