import type { SkillNode } from './types';

// Kahn's algorithm: returns sorted order or throws with cycle participants
function topologicalSort(nodes: SkillNode[]): void {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();

  for (const n of nodes) {
    if (!inDegree.has(n.id)) inDegree.set(n.id, 0);
    if (!adj.has(n.id)) adj.set(n.id, []);
  }

  for (const n of nodes) {
    for (const prereq of n.prerequisites) {
      adj.get(prereq)!.push(n.id);
      inDegree.set(n.id, (inDegree.get(n.id) ?? 0) + 1);
    }
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }

  let processed = 0;
  while (queue.length > 0) {
    const id = queue.shift()!;
    processed++;
    for (const neighbor of (adj.get(id) ?? [])) {
      const newDeg = (inDegree.get(neighbor) ?? 0) - 1;
      inDegree.set(neighbor, newDeg);
      if (newDeg === 0) queue.push(neighbor);
    }
  }

  if (processed !== nodes.length) {
    const cycleNodes = [...inDegree.entries()]
      .filter(([, deg]) => deg > 0)
      .map(([id]) => id);
    throw new Error(
      `Constellation graph has a cycle involving: ${cycleNodes.join(', ')}`
    );
  }
}

// Check every prerequisite ID exists in the node map
function checkDanglingPrereqs(nodes: SkillNode[]): void {
  const ids = new Set(nodes.map(n => n.id));
  for (const n of nodes) {
    for (const prereq of n.prerequisites) {
      if (!ids.has(prereq)) {
        throw new Error(
          `Node "${n.id}" references unknown prerequisite "${prereq}"`
        );
      }
    }
  }
}

// Check for duplicate IDs
function checkDuplicateIds(nodes: SkillNode[]): void {
  const seen = new Set<string>();
  for (const n of nodes) {
    if (seen.has(n.id)) {
      throw new Error(`Duplicate node id: "${n.id}"`);
    }
    seen.add(n.id);
  }
}

export function validateGraph(nodes: SkillNode[]): void {
  checkDuplicateIds(nodes);
  checkDanglingPrereqs(nodes);
  topologicalSort(nodes);
}
