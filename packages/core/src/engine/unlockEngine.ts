import type { Player, NodeStatus } from "../schema/Player";
import type { SkillNode } from "../schema/SkillNode";
import type { SkillTree } from "../schema/SkillTree";
import { calculateLevel } from "./xpEngine";
import { getCurrentRank, isTierAccessible, getNextRank, rankToMinTier, hasCompletedTier, advanceRank } from "./rankEngine";

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
    case "tier-test-passed":
      return player.passedTierTests.length >= cond.value;
    default:
      return false;
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

  const currentRank = getCurrentRank(player, tree.archetypeId);
  if (!isTierAccessible(node.tier, currentRank)) return "locked";

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

function accuracyMultiplier(accuracy: number): number {
  if (accuracy >= 0.9) return 1.0;
  if (accuracy >= 0.7) return 0.75;
  if (accuracy >= 0.5) return 0.5;
  return 0.25;
}

export function completeNode(
  nodeId: string,
  tree: SkillTree,
  player: Player,
  accuracyScore = 1.0
): Player {
  const node = tree.nodes.find((n) => n.id === nodeId);
  if (!node) throw new Error(`Node '${nodeId}' not found in tree`);

  const earnedXp = Math.round(node.xpReward * accuracyMultiplier(accuracyScore));
  const newXpTotal = player.xpTotal + earnedXp;
  let updated: Player = {
    ...player,
    xpTotal: newXpTotal,
    level: calculateLevel(newXpTotal),
    nodeProgress: {
      ...player.nodeProgress,
      [nodeId]: {
        nodeId,
        status: "completed",
        xpEarned: earnedXp,
        completedExercises: player.nodeProgress[nodeId]?.completedExercises ?? [],
        completedAt: new Date().toISOString(),
      },
    },
  };

  // Auto-advance rank when the completed node finishes the current tier
  const currentRank = getCurrentRank(updated, tree.archetypeId);
  const nextRank = getNextRank(currentRank);
  if (nextRank && hasCompletedTier(rankToMinTier(currentRank), tree, updated)) {
    updated = advanceRank(updated, tree.archetypeId);
  }

  return updated;
}
