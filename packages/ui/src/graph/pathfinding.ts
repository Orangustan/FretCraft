import type { SkillNode, SongNode, NodeStatus } from '../data/types';

type NodeMap = Map<string, SkillNode | SongNode>;

// How many currently-locked nodes would be transitively unblocked by learning `nodeId`
function countDownstreamUnlocks(
  nodeId: string,
  nodeMap: NodeMap,
  nodeStatuses: Record<string, NodeStatus>
): number {
  const queue: string[] = [nodeId];
  const visited = new Set<string>([nodeId]);
  let count = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const [id, node] of nodeMap) {
      if (visited.has(id)) continue;
      const status = nodeStatuses[id] ?? 'locked';
      if (status !== 'locked' && status !== 'available') continue;
      if (node.prerequisites.includes(current)) {
        visited.add(id);
        count++;
        queue.push(id);
      }
    }
  }
  return count;
}

// Returns the top `limit` available nodes with the most downstream unlocks
export function findNextUp(
  nodeMap: NodeMap,
  nodeStatuses: Record<string, NodeStatus>,
  limit = 3
): string[] {
  const available: { id: string; score: number }[] = [];

  for (const [id] of nodeMap) {
    const status = nodeStatuses[id] ?? 'locked';
    if (status !== 'available') continue;
    const score = countDownstreamUnlocks(id, nodeMap, nodeStatuses);
    available.push({ id, score });
  }

  available.sort((a, b) => b.score - a.score);
  return available.slice(0, limit).map(a => a.id);
}

// Returns the ordered list of node IDs that need to be completed to unlock `targetId`
// from the current state. Result is ordered: first unlockable node first.
export function getPrereqPath(
  nodeMap: NodeMap,
  nodeStatuses: Record<string, NodeStatus>,
  targetId: string
): string[] {
  const path: string[] = [];
  const visited = new Set<string>();

  function dfs(id: string): boolean {
    if (visited.has(id)) return false;
    visited.add(id);

    const node = nodeMap.get(id);
    if (!node) return false;

    const status = nodeStatuses[id] ?? 'locked';

    // Already done — no need to include
    if (status === 'learned' || status === 'mastered') return true;

    // Recursively resolve prerequisites first
    for (const prereqId of node.prerequisites) {
      const prereqStatus = nodeStatuses[prereqId] ?? 'locked';
      if (prereqStatus !== 'learned' && prereqStatus !== 'mastered') {
        dfs(prereqId);
      }
    }

    path.push(id);
    return true;
  }

  dfs(targetId);
  return path;
}
