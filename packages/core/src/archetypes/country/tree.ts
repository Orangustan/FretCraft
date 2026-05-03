import type { SkillTree } from "../../schema/SkillTree";
import { COUNTRY_NODES } from "./nodes";

export const COUNTRY_TREE: SkillTree = {
  id: "country",
  archetypeId: "country",
  name: "Country / Americana",
  description:
    "A progressive skill tree covering the full vocabulary of country and Americana guitar, from open chords and hybrid picking basics through chicken pickin', pedal steel bends, country shuffle, banjo rolls, and Nashville tuning, building toward advanced skills including fast country runs, Telecaster twang, Western swing harmony, and open-G slide technique.",
  nodes: COUNTRY_NODES,
  rootNodeId: "country-001",
  createdAt: "2026-05-03T00:00:00.000Z",
};
