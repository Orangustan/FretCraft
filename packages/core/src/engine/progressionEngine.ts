import type { Player, NodeStatus } from "../schema/Player";
import type { SkillNode } from "../schema/SkillNode";
import type { SkillTree } from "../schema/SkillTree";
import { xpProgressInLevel } from "./xpEngine";
import { getNodeStatus, getAvailableNodes, completeNode } from "./unlockEngine";

export const ProgressionEngine = {
  getTreeStatus(tree: SkillTree, player: Player): Record<string, NodeStatus> {
    return Object.fromEntries(
      tree.nodes.map((node) => [node.id, getNodeStatus(node.id, tree, player)])
    );
  },

  getPlayerSummary(
    tree: SkillTree,
    player: Player
  ): {
    level: number;
    xpTotal: number;
    xpProgress: { current: number; required: number; percent: number };
    completedCount: number;
    availableCount: number;
    lockedCount: number;
    percentComplete: number;
  } {
    const statuses = Object.values(this.getTreeStatus(tree, player));
    const completedCount = statuses.filter((s) => s === "completed").length;
    const availableCount = statuses.filter((s) => s === "available").length;
    const lockedCount = statuses.filter((s) => s === "locked").length;
    const total = tree.nodes.length;

    return {
      level: player.level,
      xpTotal: player.xpTotal,
      xpProgress: xpProgressInLevel(player.xpTotal),
      completedCount,
      availableCount,
      lockedCount,
      percentComplete: total > 0 ? completedCount / total : 0,
    };
  },

  applyNodeCompletion(
    nodeId: string,
    tree: SkillTree,
    player: Player
  ): {
    updatedPlayer: Player;
    newlyAvailableNodes: SkillNode[];
    leveledUp: boolean;
    newLevel?: number;
  } {
    const availableBefore = new Set(
      getAvailableNodes(tree, player).map((n) => n.id)
    );

    const updatedPlayer = completeNode(nodeId, tree, player);

    const availableAfter = getAvailableNodes(tree, updatedPlayer);
    const newlyAvailableNodes = availableAfter.filter(
      (n) => !availableBefore.has(n.id)
    );

    const leveledUp = updatedPlayer.level > player.level;

    return {
      updatedPlayer,
      newlyAvailableNodes,
      leveledUp,
      ...(leveledUp ? { newLevel: updatedPlayer.level } : {}),
    };
  },
};
