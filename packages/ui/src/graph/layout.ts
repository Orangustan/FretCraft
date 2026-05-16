import { BRANCH_SECTORS, TIER_Y } from '../data/types';
import type { Branch } from '../data/types';

export interface NodeLike {
  id: string;
  branch: Branch;
  tier: 1 | 2 | 3 | 4 | 5;
  prerequisites: string[];
  position?: { x: number; y: number };
}

export interface NodePosition3D {
  x: number;
  y: number;
  z: number;
}

const BUCKET_SPREAD = 0.9;

export function computeLayout(nodes: NodeLike[]): Record<string, NodePosition3D> {
  const positions: Record<string, NodePosition3D> = {};

  const buckets = new Map<string, NodeLike[]>();
  for (const node of nodes) {
    const key = `${node.branch}:${node.tier}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(node);
  }

  for (const [key, group] of buckets) {
    const [branch, tierStr] = key.split(':');
    const tier = Number(tierStr) as 1 | 2 | 3 | 4 | 5;
    const sectorX = BRANCH_SECTORS[branch as Branch] ?? 0;
    const tierY = TIER_Y[tier];

    const count = group.length;
    const startX = sectorX - ((count - 1) / 2) * BUCKET_SPREAD;

    group.forEach((node, i) => {
      if (node.position) {
        positions[node.id] = { x: node.position.x, y: node.position.y, z: 0 };
        return;
      }
      const zJitter = (Math.abs(node.id.charCodeAt(node.id.length - 1) % 5) - 2) * 0.15;
      positions[node.id] = {
        x: startX + i * BUCKET_SPREAD,
        y: tierY,
        z: zJitter,
      };
    });
  }

  return positions;
}
