import type { Player, NodeStatus } from "../schema/Player";
import type { SkillNode, SkillTree } from "../schema/SkillTree";
import { calculateLevel } from "./xpEngine";

function isUnlockConditionSatisfied(node: SkillNode, player: Player): boolean {
  const cond = node.unlockCondition;
  if (!cond) return true;
  switch (cond.type) {
    case "xp-threshold":
      return player.xpTotal >= cond.value;
    case "node-complete": {
      const completedCount = Object.values(player.nodeProgress).filter(
        (p) => p.status === "completed"
      ).length;
      return completedCount >= cond.value;
    }
    case "time-played":
      return true;
  }
}

export function getNodeStatus(
  nodeId: string,
  tree: SkillTree,
  player: Player
): NodeStatus {
  const progress = player.nodeProgress[nodeId];
  if (progress?.status === "completed") return "completed";
  if (progress?.status === "in-progress") return "in-progress";

  const node = tree.nodes.find((n) => n.id === nodeId);
  if (!node) return "locked";

  const prereqsMet = node.prerequisites.every(
    (prereqId) => player.nodeProgress[prereqId]?.status === "completed"
  );

  if (prereqsMet && isUnlockConditionSatisfied(node, player)) return "available";
  return "locked";
}

export function getAvailableNodes(tree: SkillTree, player: Player): SkillNode[] {
  return tree.nodes.filter(
    (node) => getNodeStatus(node.id, tree, player) === "available"
  );
}

export function canUnlockNode(
  nodeId: string,
  tree: SkillTree,
  player: Player
): { canUnlock: boolean; reason?: string } {
  const node = tree.nodes.find((n) => n.id === nodeId);
  if (!node) return { canUnlock: false, reason: `Node '${nodeId}' not found in tree` };

  for (const prereqId of node.prerequisites) {
    if (player.nodeProgress[prereqId]?.status !== "completed") {
      const prereqLabel = tree.nodes.find((n) => n.id === prereqId)?.label ?? prereqId;
      return { canUnlock: false, reason: `Requires '${prereqLabel}' to be completed first` };
    }
  }

  const cond = node.unlockCondition;
  if (cond) {
    if (cond.type === "xp-threshold" && player.xpTotal < cond.value) {
      return { canUnlock: false, reason: `Requires ${cond.value} total XP` };
    }
    if (cond.type === "node-complete") {
      const completedCount = Object.values(player.nodeProgress).filter(
        (p) => p.status === "completed"
      ).length;
      if (completedCount < cond.value) {
        return { canUnlock: false, reason: `Requires ${cond.value} completed nodes` };
      }
    }
  }

  return { canUnlock: true };
}

export function completeNode(nodeId: string, tree: SkillTree, player: Player): Player {
  const node = tree.nodes.find((n) => n.id === nodeId);
  if (!node) throw new Error(`Node '${nodeId}' not found in tree`);

  const newXpTotal = player.xpTotal + node.xpReward;
  return {
    ...player,
    xpTotal: newXpTotal,
    level: calculateLevel(newXpTotal),
    nodeProgress: {
      ...player.nodeProgress,
      [nodeId]: {
        nodeId,
        status: "completed",
        xpEarned: node.xpReward,
        completedExercises: player.nodeProgress[nodeId]?.completedExercises ?? [],
        completedAt: new Date().toISOString(),
      },
    },
  };
}
