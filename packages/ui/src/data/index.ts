import type { SkillNode, SongNode, Branch } from './types';
import { isSongNode } from './types';
import { validateGraph } from './validation';

import musicTheoryRaw from './music-theory.json';
import fretboardTheoryRaw from './fretboard-theory.json';
import techniqueRaw from './technique.json';
import rhythmTimingRaw from './rhythm-timing.json';
import harmonyChordsRaw from './harmony-chords.json';
import earTrainingRaw from './ear-training.json';
import leadImprovRaw from './lead-improv.json';
import songsRaw from './songs.json';
import layoutOverrides from './layout-overrides.json';

// Cast JSON imports through unknown to avoid TS strict inference on JSON arrays
const allRaw = [
  ...musicTheoryRaw,
  ...fretboardTheoryRaw,
  ...techniqueRaw,
  ...rhythmTimingRaw,
  ...harmonyChordsRaw,
  ...earTrainingRaw,
  ...leadImprovRaw,
  ...songsRaw,
] as unknown as (SkillNode | SongNode)[];

// Apply manual position overrides from layout-overrides.json
const overrides = layoutOverrides as Record<string, { x: number; y: number }>;
for (const node of allRaw) {
  if (overrides[node.id]) {
    node.position = overrides[node.id];
  }
}

// Validate on module load — throws with a descriptive message if the graph is malformed
validateGraph(allRaw);

export const allNodes: (SkillNode | SongNode)[] = allRaw;

export const nodeMap: Map<string, SkillNode | SongNode> = new Map(
  allRaw.map(n => [n.id, n])
);

export const nodesByBranch: Record<Branch, (SkillNode | SongNode)[]> = {
  'music-theory':    [],
  'fretboard-theory':[],
  'technique':       [],
  'rhythm-timing':   [],
  'harmony-chords':  [],
  'ear-training':    [],
  'lead-improv':     [],
  'song':            [],
};

for (const node of allRaw) {
  nodesByBranch[node.branch].push(node);
}

export const songNodes: SongNode[] = allRaw.filter(isSongNode);

export const skillNodes: SkillNode[] = allRaw.filter(n => !isSongNode(n));
