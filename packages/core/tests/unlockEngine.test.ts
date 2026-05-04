import { describe, it, expect } from "vitest";
import {
  getNodeStatus,
  getAvailableNodes,
  canUnlockNode,
  completeNode,
} from "../src/engine/unlockEngine";
import type { SkillTree } from "../src/schema/SkillTree";
import type { Player, NodeProgress } from "../src/schema/Player";

function makePlayer(overrides: Partial<Player> = {}): Player {
  return {
    id: "player-1",
    name: "Test Player",
    activeArchetypeId: "rocker",
    xpTotal: 0,
    level: 1,
    nodeProgress: {},
    passedTierTests: [],
    passedRankTests: [],
    archetypeRanks: {},
    unlockedAchievements: [],
    ...overrides,
  };
}

function completedProgress(nodeId: string, xpEarned = 0): NodeProgress {
  return { nodeId, status: "completed", xpEarned, completedExercises: [] };
}

const rootNode = {
  id: "root",
  label: "Power Chords",
  archetype: "rocker",
  tier: 1,
  content: { description: "Root node", objectives: [] },
  xpReward: 100,
  prerequisites: [],
};

const childNode = {
  id: "child",
  label: "Barre Chords",
  archetype: "rocker",
  tier: 2,
  content: { description: "Child node", objectives: [] },
  xpReward: 200,
  prerequisites: ["root"],
};

const xpLockedNode = {
  id: "xp-locked",
  label: "Advanced Technique",
  archetype: "rocker",
  tier: 1,
  content: { description: "Requires XP", objectives: [] },
  xpReward: 300,
  prerequisites: [],
  unlockCondition: { type: "xp-threshold" as const, value: 500 },
};

const tree: SkillTree = {
  id: "tree-1",
  archetypeId: "rocker",
  name: "Test Tree",
  description: "Test tree",
  nodes: [rootNode, childNode, xpLockedNode],
  rootNodeId: "root",
  createdAt: new Date().toISOString(),
};

describe("getNodeStatus", () => {
  it("node with no prerequisites is available for a new player", () => {
    expect(getNodeStatus("root", tree, makePlayer())).toBe("available");
  });

  it("node with unmet prerequisites is locked", () => {
    expect(getNodeStatus("child", tree, makePlayer())).toBe("locked");
  });

  it("node becomes available once all prerequisites are completed and player has rank", () => {
    const player = makePlayer({
      nodeProgress: { root: completedProgress("root", 100) },
      archetypeRanks: { rocker: 'novice' },
    });
    expect(getNodeStatus("child", tree, player)).toBe("available");
  });

  it("returns 'completed' when player progress is completed", () => {
    const player = makePlayer({
      nodeProgress: { root: completedProgress("root", 100) },
    });
    expect(getNodeStatus("root", tree, player)).toBe("completed");
  });

  it("returns 'in-progress' when player progress is in-progress", () => {
    const player = makePlayer({
      nodeProgress: {
        root: { nodeId: "root", status: "in-progress", xpEarned: 0, completedExercises: [] },
      },
    });
    expect(getNodeStatus("root", tree, player)).toBe("in-progress");
  });

  it("xp-threshold node is locked when player lacks XP", () => {
    expect(getNodeStatus("xp-locked", tree, makePlayer({ xpTotal: 100 }))).toBe("locked");
  });

  it("xp-threshold node is available when player has enough XP", () => {
    expect(getNodeStatus("xp-locked", tree, makePlayer({ xpTotal: 500 }))).toBe("available");
  });
});

describe("getAvailableNodes", () => {
  it("returns root node for a new player", () => {
    const ids = getAvailableNodes(tree, makePlayer()).map((n) => n.id);
    expect(ids).toContain("root");
    expect(ids).not.toContain("child");
  });

  it("includes child node once root is completed and player has novice rank", () => {
    const player = makePlayer({
      nodeProgress: { root: completedProgress("root", 100) },
      archetypeRanks: { rocker: 'novice' },
    });
    const ids = getAvailableNodes(tree, player).map((n) => n.id);
    expect(ids).toContain("child");
    expect(ids).not.toContain("root");
  });
});

describe("canUnlockNode", () => {
  it("returns canUnlock true for node with no prerequisites", () => {
    expect(canUnlockNode("root", tree, makePlayer())).toEqual({ canUnlock: true });
  });

  it("returns canUnlock false with prereq label in reason", () => {
    const result = canUnlockNode("child", tree, makePlayer());
    expect(result.canUnlock).toBe(false);
    expect(result.reason).toContain("Power Chords");
  });

  it("returns canUnlock false with XP amount in reason", () => {
    const result = canUnlockNode("xp-locked", tree, makePlayer({ xpTotal: 100 }));
    expect(result.canUnlock).toBe(false);
    expect(result.reason).toContain("500");
  });

  it("returns canUnlock true once prerequisite is completed", () => {
    const player = makePlayer({
      nodeProgress: { root: completedProgress("root", 100) },
    });
    expect(canUnlockNode("child", tree, player)).toEqual({ canUnlock: true });
  });
});

describe("completeNode", () => {
  it("does not mutate the original player object", () => {
    const player = makePlayer();
    const snapshot = JSON.stringify(player);
    completeNode("root", tree, player);
    expect(JSON.stringify(player)).toBe(snapshot);
  });

  it("sets nodeProgress status to 'completed' and adds completedAt", () => {
    const updated = completeNode("root", tree, makePlayer());
    expect(updated.nodeProgress["root"].status).toBe("completed");
    expect(updated.nodeProgress["root"].completedAt).toBeDefined();
  });

  it("increases xpTotal by the node's xpReward", () => {
    const player = makePlayer({ xpTotal: 200 });
    const updated = completeNode("root", tree, player);
    expect(updated.xpTotal).toBe(300);
  });

  it("recalculates level based on new xpTotal", () => {
    // root gives 100 XP; threshold for level 2 is exactly 100, so level becomes 2
    const player = makePlayer({ xpTotal: 0, level: 1 });
    const updated = completeNode("root", tree, player);
    expect(updated.level).toBe(2);
  });

  it("sets xpEarned in nodeProgress to the node's xpReward", () => {
    const updated = completeNode("root", tree, makePlayer());
    expect(updated.nodeProgress["root"].xpEarned).toBe(rootNode.xpReward);
  });

  it("preserves existing nodeProgress for other nodes", () => {
    const player = makePlayer({
      nodeProgress: { child: completedProgress("child", 200) },
    });
    const updated = completeNode("root", tree, player);
    expect(updated.nodeProgress["child"].status).toBe("completed");
  });
});
