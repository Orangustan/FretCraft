import { useState } from 'react';
import { ProgressionEngine } from '@guitar-st/core';
import type { SkillTree, NodeStatus, Player as CorePlayer, NodeProgress as CoreNodeProgress } from '@guitar-st/core';
import { usePlayer, type Player as StorePlayer } from '../../store/playerStore';

function adaptPlayer(storePlayer: StorePlayer, archetypeId: string): CorePlayer {
  const nodeProgress: Record<string, CoreNodeProgress> = {};
  for (const [nodeId, rawStatus] of Object.entries(storePlayer.nodeProgress)) {
    const status: NodeStatus = rawStatus === 'complete' ? 'completed' : (rawStatus as NodeStatus);
    nodeProgress[nodeId] = { nodeId, status, xpEarned: 0, completedExercises: [] };
  }
  return {
    id: 'local',
    name: storePlayer.name,
    activeArchetypeId: archetypeId,
    xpTotal: storePlayer.xp,
    level: storePlayer.level,
    nodeProgress,
    passedTierTests: storePlayer.passedTierTests ?? [],
    passedRankTests: storePlayer.passedRankTests ?? [],
    archetypeRanks: storePlayer.archetypeRanks ?? {},
    unlockedAchievements: storePlayer.unlockedAchievements ?? [],
  };
}

export function useSkillTree(tree: SkillTree) {
  const { player } = usePlayer();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const corePlayer = adaptPlayer(player, tree.archetypeId);
  const nodeStatuses = ProgressionEngine.getTreeStatus(tree, corePlayer);
  const playerSummary = ProgressionEngine.getPlayerSummary(tree, corePlayer);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  const resetSelection = () => setSelectedNodeId(null);

  return { nodeStatuses, playerSummary, handleNodeClick, selectedNodeId, resetSelection };
}
