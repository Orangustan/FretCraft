import type { AnalysisResult } from "../analyzer/aiAnalyzer.js";
import { scoreElements, groupByCluster } from "../analyzer/difficultyScorer.js";

const NODE_GAP_X = 220;
const NODE_GAP_Y = 200;
const TIER_START_Y = 200;

function difficultyToTier(difficulty: number): number {
  if (difficulty <= 2) return 1;
  if (difficulty === 3) return 2;
  if (difficulty === 4) return 3;
  return 4;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function exercisesForElement(
  nodeId: string,
  elementValue: string,
  difficulty: number
): Array<{ id: string; type: string; prompt: string; bpm?: number; durationSeconds: number; xpValue: number }> {
  const bpm = difficulty <= 2 ? 70 : difficulty === 3 ? 90 : difficulty === 4 ? 110 : 130;
  return [
    {
      id: `${nodeId}-ex-1`,
      type: "technique",
      prompt: `Practice ${elementValue} slowly, focusing on clean execution. Start at ${bpm} BPM.`,
      bpm,
      durationSeconds: 120,
      xpValue: Math.round(difficulty * 10),
    },
    {
      id: `${nodeId}-ex-2`,
      type: "performance",
      prompt: `Apply ${elementValue} in a short musical context of 4–8 bars. Record yourself and review.`,
      bpm: Math.round(bpm * 1.2),
      durationSeconds: 120,
      xpValue: Math.round(difficulty * 15),
    },
  ];
}

type NodeShape = {
  id: string;
  label: string;
  archetype: string;
  tier: number;
  xpReward: number;
  prerequisites: string[];
  unlockCondition?: { type: string; value: number };
  position: { x: number; y: number };
  content: {
    description: string;
    objectives: string[];
    tips: string[];
  };
  exercises: ReturnType<typeof exercisesForElement>;
  musicElements: Array<{ type: string; value: string; difficulty?: number }>;
};

export interface GeneratedTree {
  id: string;
  archetypeId: "custom";
  name: string;
  description: string;
  nodes: NodeShape[];
  rootNodeId: string;
  createdAt: string;
  sourceScoreId?: string;
}

function buildNodes(result: AnalysisResult, treeId: string): NodeShape[] {
  const scored = scoreElements(result.elements);
  const grouped = groupByCluster(scored);

  // Deduplicate elements within each cluster by value
  const uniqueByCluster: Record<string, typeof scored> = {};
  for (const [cluster, elements] of Object.entries(grouped)) {
    const seen = new Set<string>();
    uniqueByCluster[cluster] = elements.filter((el) => {
      const key = `${el.type}:${el.value.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  const allElements = Object.values(uniqueByCluster).flat();
  allElements.sort((a, b) => (a.difficulty ?? 1) - (b.difficulty ?? 1));

  const byTier: Record<number, typeof allElements> = {};
  for (const el of allElements) {
    const tier = difficultyToTier(el.difficulty ?? 1);
    (byTier[tier] ??= []).push(el);
  }

  const nodes: NodeShape[] = [];
  const idByTierIndex: Record<string, string> = {};

  for (const [tierStr, tierElements] of Object.entries(byTier)) {
    const tier = Number(tierStr);
    const y = TIER_START_Y + (tier - 1) * NODE_GAP_Y;
    const totalWidth = tierElements.length * NODE_GAP_X;
    const startX = Math.max(50, Math.round((900 - totalWidth) / 2));

    tierElements.forEach((el, i) => {
      const nodeId = `${treeId}-t${tier}-${i + 1}`;
      const x = startX + i * NODE_GAP_X;
      idByTierIndex[`${tier}:${i}`] = nodeId;

      const prereqs: string[] = [];
      if (tier > 1) {
        const prevTierEls = byTier[tier - 1] ?? [];
        const sameClusters = prevTierEls
          .map((pe, pi) => ({ pe, pi }))
          .filter(({ pe }) => pe.skillCluster === el.skillCluster);

        if (sameClusters.length > 0) {
          const prereqId = idByTierIndex[`${tier - 1}:${sameClusters[0].pi}`];
          if (prereqId) prereqs.push(prereqId);
        } else if (prevTierEls.length > 0) {
          const prereqId = idByTierIndex[`${tier - 1}:0`];
          if (prereqId) prereqs.push(prereqId);
        }
      }

      nodes.push({
        id: nodeId,
        label: capitalize(el.value),
        archetype: "custom",
        tier,
        xpReward: (el.difficulty ?? 1) * 40,
        prerequisites: prereqs,
        unlockCondition: tier > 1 ? { type: "node-complete", value: 1 } : undefined,
        position: { x, y },
        content: {
          description: `${capitalize(el.value)} is a ${el.type} element identified in your uploaded score. Mastering it will improve your ability to perform this piece accurately.`,
          objectives: [
            `Understand the role of ${el.value} in the context of the piece`,
            `Execute ${el.value} cleanly at the target tempo`,
            `Apply ${el.value} expressively in a musical phrase`,
          ],
          tips: [
            `Practice ${el.value} in isolation before combining with other elements`,
            `Use a metronome — start slow and gradually increase the tempo`,
          ],
        },
        exercises: exercisesForElement(nodeId, el.value, el.difficulty ?? 1),
        musicElements: [{ type: el.type, value: el.value, difficulty: el.difficulty }],
      });
    });
  }

  return nodes;
}

export function generateTree(
  result: AnalysisResult,
  scoreName: string,
  sourceScoreId?: string
): GeneratedTree {
  const treeId = `custom-${Date.now()}`;
  const nodes = buildNodes(result, treeId);
  const rootNodeId = nodes.find((n) => n.tier === 1)?.id ?? `${treeId}-t1-1`;

  return {
    id: treeId,
    archetypeId: "custom",
    name: `${scoreName} — Custom Tree`,
    description: `Custom skill tree generated from "${scoreName}". Overall difficulty: ${result.estimatedOverallDifficulty}/5. ${result.summary}`,
    nodes,
    rootNodeId,
    createdAt: new Date().toISOString(),
    sourceScoreId,
  };
}
