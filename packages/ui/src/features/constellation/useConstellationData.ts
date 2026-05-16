import { useMemo } from 'react';
import { ProgressionEngine } from '@guitar-st/core';
import type { Player as CorePlayer, NodeProgress as CoreNodeProgress, NodeStatus as CoreNodeStatus } from '@guitar-st/core';
import { usePlayer, type Player as StorePlayer } from '../../store/playerStore';
import { computeLayout } from '../../graph/layout';
import {
  adaptCoreNode,
  adaptStatus,
  buildConstellationMap,
  type ConstellationNode,
} from './coreAdapter';
import type { NodeStatus as DisplayNodeStatus } from '../../data/types';

function adaptPlayerForEngine(storePlayer: StorePlayer, archetypeId: string): CorePlayer {
  const nodeProgress: Record<string, CoreNodeProgress> = {};
  for (const [nodeId, rawStatus] of Object.entries(storePlayer.nodeProgress)) {
    const status: CoreNodeStatus = rawStatus === 'complete' ? 'completed' : (rawStatus as CoreNodeStatus);
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

export interface ConstellationData {
  constellationNodes: ConstellationNode[];
  constellationMap: Map<string, ConstellationNode>;
  displayStatuses: Record<string, DisplayNodeStatus>;
  coreStatuses: Record<string, CoreNodeStatus>;
  positions: Record<string, { x: number; y: number; z: number }>;
  corePlayer: CorePlayer;
}

export function useConstellationData(): ConstellationData {
  const { player, activeTree } = usePlayer();

  const corePlayer = useMemo(
    () => adaptPlayerForEngine(player, activeTree.archetypeId),
    [player, activeTree.archetypeId]
  );

  const constellationNodes = useMemo(
    () => activeTree.nodes.map(adaptCoreNode),
    [activeTree.nodes]
  );

  const constellationMap = useMemo(
    () => buildConstellationMap(activeTree.nodes),
    [activeTree.nodes]
  );

  const coreStatuses = useMemo(
    () => ProgressionEngine.getTreeStatus(activeTree, corePlayer) as Record<string, CoreNodeStatus>,
    [activeTree, corePlayer]
  );

  const displayStatuses = useMemo<Record<string, DisplayNodeStatus>>(() => {
    const result: Record<string, DisplayNodeStatus> = {};
    for (const [id, s] of Object.entries(coreStatuses)) {
      result[id] = adaptStatus(s as CoreNodeStatus);
    }
    return result;
  }, [coreStatuses]);

  const positions = useMemo(
    () => computeLayout(constellationNodes),
    [constellationNodes]
  );

  return { constellationNodes, constellationMap, displayStatuses, coreStatuses, positions, corePlayer };
}
