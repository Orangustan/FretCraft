import type { SkillNode as CoreSkillNode, BranchType } from '@guitar-st/core';
import type { Branch, NodeStatus as DisplayNodeStatus } from '../../data/types';

export type CoreNodeStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface ConstellationNode {
  id: string;
  title: string;
  branch: Branch;
  tier: 1 | 2 | 3 | 4 | 5;
  isAnchor: boolean;
  prerequisites: string[];
  position?: { x: number; y: number };
  coreNode: CoreSkillNode;
}

export function adaptBranch(branch: BranchType | undefined): Branch {
  if (!branch) return 'music-theory';
  if (branch === 'lead-improvisation') return 'lead-improv';
  return branch as Branch;
}

export function adaptStatus(coreStatus: CoreNodeStatus): DisplayNodeStatus {
  switch (coreStatus) {
    case 'locked':      return 'locked';
    case 'available':   return 'available';
    case 'in-progress': return 'in_progress';
    case 'completed':   return 'mastered';
  }
}

// Positions within this range are treated as explicit 3D world coords.
// Old archetype nodes use large SVG pixel values (100-2000+) which we ignore.
const is3DPosition = (p: { x: number; y: number }) =>
  Math.abs(p.x) <= 20 && Math.abs(p.y) <= 10;

export function adaptCoreNode(node: CoreSkillNode): ConstellationNode {
  const tier = (Math.max(1, Math.min(5, node.tier)) as 1 | 2 | 3 | 4 | 5);
  return {
    id: node.id,
    title: node.label,
    branch: adaptBranch(node.branch),
    tier,
    isAnchor: node.prerequisites.length === 0,
    prerequisites: node.prerequisites,
    position: node.position && is3DPosition(node.position) ? node.position : undefined,
    coreNode: node,
  };
}

export function buildConstellationMap(nodes: CoreSkillNode[]): Map<string, ConstellationNode> {
  const map = new Map<string, ConstellationNode>();
  for (const node of nodes) {
    map.set(node.id, adaptCoreNode(node));
  }
  return map;
}
