import type { SkillNode, SongNode } from '../data/types';
import { BRANCH_SECTORS, TIER_Y, SONG_BAND_Y, isSongNode } from '../data/types';

export interface NodePosition3D {
  x: number;
  y: number;
  z: number;
}

const BUCKET_SPREAD = 0.9;  // horizontal spacing between nodes in the same tier+branch bucket
const SONG_SPREAD   = 2.2;  // horizontal spacing between songs

export function computeLayout(
  nodes: (SkillNode | SongNode)[]
): Record<string, NodePosition3D> {
  const positions: Record<string, NodePosition3D> = {};

  // --- Non-song nodes ---
  const skillNodes = nodes.filter(n => !isSongNode(n));

  // Group by branch + tier to spread overlapping nodes
  const buckets = new Map<string, SkillNode[]>();
  for (const node of skillNodes) {
    const key = `${node.branch}:${node.tier}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(node as SkillNode);
  }

  for (const [key, group] of buckets) {
    const [branch, tierStr] = key.split(':');
    const tier = Number(tierStr) as 1 | 2 | 3 | 4 | 5;
    const sectorX = BRANCH_SECTORS[branch as keyof typeof BRANCH_SECTORS];
    const tierY = TIER_Y[tier];

    const count = group.length;
    const startX = sectorX - ((count - 1) / 2) * BUCKET_SPREAD;

    group.forEach((node, i) => {
      // Use manual override if provided
      if (node.position) {
        positions[node.id] = { x: node.position.x, y: node.position.y, z: 0 };
        return;
      }
      // Small Z jitter for depth variety
      const zJitter = (Math.abs(node.id.charCodeAt(node.id.length - 1) % 5) - 2) * 0.15;
      positions[node.id] = {
        x: startX + i * BUCKET_SPREAD,
        y: tierY,
        z: zJitter,
      };
    });
  }

  // --- Song nodes — spaced across the bottom band ---
  const songs = nodes.filter(isSongNode);
  const songCount = songs.length;
  const songTotalWidth = (songCount - 1) * SONG_SPREAD;
  const songStartX = -songTotalWidth / 2;

  songs.forEach((song, i) => {
    if (song.position) {
      positions[song.id] = { x: song.position.x, y: SONG_BAND_Y, z: 0 };
      return;
    }
    positions[song.id] = {
      x: songStartX + i * SONG_SPREAD,
      y: SONG_BAND_Y,
      z: 0,
    };
  });

  return positions;
}
