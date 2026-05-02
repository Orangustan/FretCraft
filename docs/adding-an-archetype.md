# Adding an Archetype

An archetype is a curated skill tree (e.g. "rocker", "jazz") that ships with the app. Follow these five steps to add one.

## Steps

### 1. Create `packages/core/src/archetypes/{name}/nodes.ts`

Define a `SkillNode[]` that satisfies the `SkillNode` interface from `../../schema/SkillNode`.

```ts
// packages/core/src/archetypes/jazz/nodes.ts
import { SkillNode } from "../../schema/SkillNode";

export const JAZZ_NODES: SkillNode[] = [
  {
    id: "jazz-001",
    label: "Shell Voicings",
    archetype: "jazz",
    tier: 1,
    xpReward: 100,
    prerequisites: [],
    position: { x: 250, y: 200 },
    content: {
      description: "...",
      objectives: ["..."],
      tips: ["..."],
    },
    exercises: [
      { id: "ex-jazz-001-1", type: "technique", prompt: "...", xpValue: 50 },
    ],
    musicElements: [{ type: "chord-type", value: "shell voicing" }],
  },
  // ...
];
```

Required fields on every node: `id`, `label`, `archetype`, `tier`, `xpReward`, `prerequisites`, `content` (with `description` and `objectives`).

### 2. Create `packages/core/src/archetypes/{name}/tree.ts`

Assemble the nodes into a `SkillTree` object.

```ts
// packages/core/src/archetypes/jazz/tree.ts
import type { SkillTree } from "../../schema/SkillTree";
import { JAZZ_NODES } from "./nodes";

export const JAZZ_TREE: SkillTree = {
  id: "jazz",
  archetypeId: "jazz",
  name: "Jazz Guitar",
  description: "...",
  nodes: JAZZ_NODES,
  rootNodeId: "jazz-001",
  createdAt: new Date().toISOString(),
};
```

### 3. Register in `packages/core/src/archetypes/index.ts`

Add the new tree to `ARCHETYPE_REGISTRY` and re-export it:

```ts
import { JAZZ_TREE } from "./jazz/tree";

export { JAZZ_TREE } from "./jazz/tree";

export const ARCHETYPE_REGISTRY: Record<string, SkillTree> = {
  rocker: ROCKER_TREE,
  jazz: JAZZ_TREE,   // ← add this line
};
```

### 4. Add to `ArchetypeId` union in `schema/SkillTree.ts`

```ts
// packages/core/src/schema/SkillTree.ts
export type ArchetypeId = "rocker" | "jazz" | "custom";
//                                    ^^^^^^ add your id here
```

### 5. Run typecheck

```sh
pnpm --filter @guitar-st/core typecheck
```

TypeScript will surface any missing required fields, wrong types, or broken imports immediately.
