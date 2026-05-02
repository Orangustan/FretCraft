import { describe, it, expect } from "vitest";
import { ARCHETYPE_REGISTRY, getArchetype } from "../src/archetypes/index";
import { ROCKER_TREE } from "../src/archetypes/rocker/tree";
import { getNodeStatus, completeNode } from "../src/engine/unlockEngine";
import { ProgressionEngine } from "../src/engine/progressionEngine";
import type { Player } from "../src/schema/Player";

function freshPlayer(): Player {
  return {
    id: "integration-player",
    name: "Rocker",
    activeArchetypeId: "rocker",
    xpTotal: 0,
    level: 1,
    nodeProgress: {},
  };
}

describe("Full Rocker Progression", () => {
  it("loads ROCKER_TREE from the archetype registry", () => {
    const tree = getArchetype("rocker");
    expect(tree).toBeDefined();
    expect(tree).toBe(ARCHETYPE_REGISTRY["rocker"]);
    expect(tree).toBe(ROCKER_TREE);
    expect(tree!.archetypeId).toBe("rocker");
    expect(tree!.nodes).toHaveLength(12);
    expect(tree!.rootNodeId).toBe("rocker-001");
  });

  it("rocker-001 and rocker-002 are available; all others are locked for a fresh player", () => {
    const player = freshPlayer();
    const tree = ROCKER_TREE;

    expect(getNodeStatus("rocker-001", tree, player)).toBe("available");
    expect(getNodeStatus("rocker-002", tree, player)).toBe("available");

    for (const node of tree.nodes) {
      if (node.id === "rocker-001" || node.id === "rocker-002") continue;
      expect(getNodeStatus(node.id, tree, player)).toBe("locked");
    }
  });

  it("completing rocker-001 increases XP by its reward and recalculates level to 2", () => {
    const tree = ROCKER_TREE;
    const player = freshPlayer();
    const node001 = tree.nodes.find((n) => n.id === "rocker-001")!;

    const after001 = completeNode("rocker-001", tree, player);

    expect(after001.xpTotal).toBe(node001.xpReward); // 100 XP
    expect(after001.level).toBe(2); // 100 XP crosses the level-2 threshold
    expect(after001.nodeProgress["rocker-001"].status).toBe("completed");
    expect(after001.nodeProgress["rocker-001"].xpEarned).toBe(node001.xpReward);
  });

  it("completing rocker-002 makes rocker-003, rocker-004, and rocker-005 available", () => {
    const tree = ROCKER_TREE;
    let player = freshPlayer();
    player = completeNode("rocker-001", tree, player);
    player = completeNode("rocker-002", tree, player);

    expect(getNodeStatus("rocker-003", tree, player)).toBe("available");
    expect(getNodeStatus("rocker-004", tree, player)).toBe("available");
    expect(getNodeStatus("rocker-005", tree, player)).toBe("available");
  });

  it("completing rocker-003 alone does not unlock rocker-007; completing rocker-004 does", () => {
    const tree = ROCKER_TREE;
    let player = freshPlayer();
    player = completeNode("rocker-001", tree, player);
    player = completeNode("rocker-002", tree, player);
    player = completeNode("rocker-003", tree, player);

    // rocker-007 needs both rocker-003 AND rocker-004
    expect(getNodeStatus("rocker-007", tree, player)).toBe("locked");

    player = completeNode("rocker-004", tree, player);

    expect(getNodeStatus("rocker-007", tree, player)).toBe("available");
  });

  it("completeNode is pure — original player objects are never mutated", () => {
    const tree = ROCKER_TREE;

    // Check after first completion
    const p0 = freshPlayer();
    const snap0 = JSON.stringify(p0);
    const p1 = completeNode("rocker-001", tree, p0);
    expect(JSON.stringify(p0)).toBe(snap0);

    // Check after chained completion
    const snap1 = JSON.stringify(p1);
    completeNode("rocker-002", tree, p1);
    expect(JSON.stringify(p1)).toBe(snap1);
  });

  it("getPlayerSummary reflects accurate counts at each progression step", () => {
    const tree = ROCKER_TREE;
    let player = freshPlayer();

    // Step 0 — fresh player: 0 completed, 2 available (001, 002), 10 locked
    let summary = ProgressionEngine.getPlayerSummary(tree, player);
    expect(summary.completedCount).toBe(0);
    expect(summary.availableCount).toBe(2);
    expect(summary.lockedCount).toBe(10);
    expect(summary.percentComplete).toBe(0);
    expect(summary.xpTotal).toBe(0);
    expect(summary.level).toBe(1);

    // Step 1 — complete rocker-001: 1 completed, 3 available (002, 003, 005), 8 locked
    player = completeNode("rocker-001", tree, player);
    summary = ProgressionEngine.getPlayerSummary(tree, player);
    expect(summary.completedCount).toBe(1);
    expect(summary.availableCount).toBe(3);
    expect(summary.lockedCount).toBe(8);
    expect(summary.level).toBe(2);

    // Step 2 — complete rocker-002: 2 completed, 3 available (003, 004, 005), 7 locked
    player = completeNode("rocker-002", tree, player);
    summary = ProgressionEngine.getPlayerSummary(tree, player);
    expect(summary.completedCount).toBe(2);
    expect(summary.availableCount).toBe(3);
    expect(summary.lockedCount).toBe(7);

    // Step 3 — complete rocker-003: 3 completed, 3 available (004, 005, 006), 6 locked
    player = completeNode("rocker-003", tree, player);
    summary = ProgressionEngine.getPlayerSummary(tree, player);
    expect(summary.completedCount).toBe(3);
    expect(summary.availableCount).toBe(3);
    expect(summary.lockedCount).toBe(6);

    // Step 4 — complete rocker-004: 4 completed, 3 available (005, 006, 007), 5 locked
    player = completeNode("rocker-004", tree, player);
    summary = ProgressionEngine.getPlayerSummary(tree, player);
    expect(summary.completedCount).toBe(4);
    expect(summary.availableCount).toBe(3);
    expect(summary.lockedCount).toBe(5);
    expect(summary.percentComplete).toBeCloseTo(4 / 12);
  });
});
