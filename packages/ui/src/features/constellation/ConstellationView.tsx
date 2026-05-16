import { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ROCKER_TIER_TESTS, COUNTRY_TIER_TESTS,
  getRankTestsForArchetype, getCurrentRank, canAdvanceRank, getNextRank,
  ProgressionEngine,
} from '@guitar-st/core';
import type { TierTestResult, PlayerRank, RankTest } from '@guitar-st/core';
import { SkyCanvas } from '../../scene/SkyCanvas';
import { Nodes } from '../../scene/SkillNode3D';
import { Edges } from '../../scene/SkillEdge3D';
import { LoadingSequence } from './LoadingSequence';
import { NextUpPanel } from './NextUpPanel';
import { SearchBar } from './SearchBar';
import { FilterChips } from './FilterChips';
import { ArchetypeSelector } from './ArchetypeSelector';
import { NodeDetailPanel } from '../skill-tree/NodeDetailPanel';
import { PracticeSession } from '../practice/PracticeSession';
import { RankTestSession } from '../practice/RankTestSession';
import { TierTestModal } from '../practice/TierTestModal';
import { useConstellationData } from './useConstellationData';
import { usePlayer } from '../../store/playerStore';
import { useProgressStore } from '../../store/progressStore';
import { useUIStore } from '../../store/uiStore';
import type { SessionConfig } from '../practice/sessionConfig';
import { DEFAULT_SESSION_CONFIG } from '../practice/sessionConfig';
import './ConstellationView.css';

const TIER_TEST_REGISTRY = [...ROCKER_TIER_TESTS, ...COUNTRY_TIER_TESTS];

export default function ConstellationView() {
  const hasPlayedIntro = useRef(false);
  const [showIntro, setShowIntro] = useState(false);
  const [uiVisible, setUiVisible] = useState(false);
  const [practiceNodeId, setPracticeNodeId] = useState<string | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig>(DEFAULT_SESSION_CONFIG);
  const [activeTierTestId, setActiveTierTestId] = useState<string | null>(null);
  const [activeRankTest, setActiveRankTest] = useState<RankTest | null>(null);

  const { activeTree, dispatch, player } = usePlayer();
  const { touchNode } = useProgressStore();
  const { selectedNodeId, panelOpen, filterBranch, filterStatus, filterTier, searchResults, closePanel } = useUIStore();

  const { constellationNodes, constellationMap, displayStatuses, coreStatuses, positions, corePlayer } = useConstellationData();

  // Play intro once per session
  useEffect(() => {
    if (!hasPlayedIntro.current) {
      hasPlayedIntro.current = true;
      setShowIntro(true);
    } else {
      setUiVisible(true);
    }
  }, []);

  // Reset panel when archetype changes
  useEffect(() => {
    closePanel();
  }, [activeTree.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedNode = selectedNodeId ? constellationMap.get(selectedNodeId) : null;
  const practiceNode = practiceNodeId ? constellationMap.get(practiceNodeId) : null;

  const activeTierTest = activeTierTestId
    ? TIER_TEST_REGISTRY.find(t => t.id === activeTierTestId) ?? null
    : null;

  // Rank gate state
  const currentRank = getCurrentRank(corePlayer as Parameters<typeof getCurrentRank>[0], activeTree.archetypeId);
  const nextRank = getNextRank(currentRank);
  const rankTests = getRankTestsForArchetype(activeTree.archetypeId);
  const canAdvance = canAdvanceRank(corePlayer as Parameters<typeof canAdvanceRank>[0], activeTree, rankTests);
  const gateTest = nextRank
    ? rankTests.find(t => t.fromRank === currentRank && t.toRank === nextRank) ?? null
    : null;

  const availableTierTest = useMemo(() => {
    const passedTests = new Set(player.passedTierTests);
    const completedNodes = new Set(
      Object.entries(player.nodeProgress)
        .filter(([, s]) => s === 'complete')
        .map(([id]) => id)
    );
    return TIER_TEST_REGISTRY.find(test => {
      if (passedTests.has(test.id)) return false;
      const tierNodes = activeTree.nodes.filter(n => n.tier === test.tierId);
      if (tierNodes.length === 0) return false;
      return tierNodes.every(n => completedNodes.has(n.id));
    }) ?? null;
  }, [player.nodeProgress, player.passedTierTests, activeTree.nodes]);

  // Filter visibility: null = show all
  const visibleNodeIds = useMemo(() => {
    const hasFilter = filterBranch || filterStatus || filterTier || searchResults;
    if (!hasFilter) return null;

    const ids = new Set<string>();
    for (const node of constellationNodes) {
      if (filterBranch && node.branch !== filterBranch) continue;
      if (filterTier && node.tier !== filterTier) continue;
      if (filterStatus && displayStatuses[node.id] !== filterStatus) continue;
      if (searchResults && !searchResults.has(node.id)) continue;
      ids.add(node.id);
    }
    return ids;
  }, [filterBranch, filterStatus, filterTier, searchResults, constellationNodes, displayStatuses]);

  // Dim nodes outside active filter
  const filteredStatuses = useMemo(() => {
    if (!visibleNodeIds) return displayStatuses;
    const result = { ...displayStatuses };
    for (const node of constellationNodes) {
      if (!visibleNodeIds.has(node.id)) result[node.id] = 'locked';
    }
    return result;
  }, [visibleNodeIds, displayStatuses, constellationNodes]);

  const handleBeginPractice = (config: SessionConfig) => {
    if (!selectedNodeId) return;
    setSessionConfig(config);
    setPracticeNodeId(selectedNodeId);
  };

  const handlePracticeComplete = (earnedXp: number, accuracyScore: number) => {
    if (!practiceNodeId) return;
    dispatch({ type: 'COMPLETE_NODE', payload: { nodeId: practiceNodeId } });
    dispatch({ type: 'ADD_XP', payload: { amount: earnedXp } });
    dispatch({
      type: 'LOG_PRACTICE_SESSION',
      payload: {
        date: new Date().toISOString(),
        durationSeconds: sessionConfig.durationMinutes * 60,
        xpEarned: earnedXp,
        nodesWorked: [practiceNodeId],
        accuracyAvg: accuracyScore,
      },
    });
    touchNode(practiceNodeId);
    const { rankAdvanced, newRank } = ProgressionEngine.applyNodeCompletion(
      practiceNodeId,
      activeTree,
      corePlayer as Parameters<typeof ProgressionEngine.applyNodeCompletion>[2]
    );
    if (rankAdvanced && newRank) {
      dispatch({ type: 'ADVANCE_RANK', payload: { archetypeId: activeTree.archetypeId, newRank: newRank as PlayerRank } });
    }
    setPracticeNodeId(null);
  };

  const handleTierTestPass = (result: TierTestResult) => {
    if (!activeTierTestId) return;
    dispatch({ type: 'PASS_TIER_TEST', payload: { testId: activeTierTestId } });
    setActiveTierTestId(null);
    console.info('Tier test passed:', result);
  };

  const handleRankTestPass = (newRank: PlayerRank) => {
    if (!activeRankTest) return;
    dispatch({
      type: 'PASS_RANK_TEST',
      payload: { testId: activeRankTest.id, archetypeId: activeTree.archetypeId, newRank },
    });
    setActiveRankTest(null);
  };

  return (
    <div className="constellation-view">
      <SkyCanvas>
        <Nodes
          nodes={constellationNodes}
          positions={positions}
          nodeStatuses={filteredStatuses}
          nodeMap={constellationMap}
        />
        <Edges
          nodes={constellationNodes}
          positions={positions}
          nodeStatuses={filteredStatuses}
        />
      </SkyCanvas>

      {/* HTML overlay layer */}
      <div className="constellation-overlay">
        {uiVisible && (
          <>
            <ArchetypeSelector />

            <div className="constellation-overlay__top">
              <SearchBar nodes={constellationNodes} />
              <FilterChips />
            </div>

            {/* Tier test banner */}
            {availableTierTest && (
              <div className="constellation-banner constellation-banner--tier">
                <span>Tier test ready: <strong>{availableTierTest.label}</strong></span>
                <button onClick={() => setActiveTierTestId(availableTierTest.id)}>Take Test</button>
              </div>
            )}

            {/* Rank gate banner */}
            {canAdvance && nextRank && (
              <div className="constellation-banner constellation-banner--rank">
                <span>Ready to advance to <strong>{nextRank}</strong></span>
                {gateTest ? (
                  <button onClick={() => setActiveRankTest(gateTest)}>Take Rank Test</button>
                ) : (
                  <button onClick={() => dispatch({ type: 'ADVANCE_RANK', payload: { archetypeId: activeTree.archetypeId, newRank: nextRank } })}>
                    Advance
                  </button>
                )}
              </div>
            )}

            <div className="constellation-overlay__bottom-left">
              <NextUpPanel
                nodes={constellationNodes}
                nodeMap={constellationMap}
                nodeStatuses={displayStatuses}
              />
            </div>
          </>
        )}

        <AnimatePresence>
          {panelOpen && selectedNode && (
            <motion.div
              key={selectedNode.id}
              className="constellation-panel-wrapper"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <NodeDetailPanel
                node={selectedNode.coreNode}
                status={coreStatuses[selectedNode.id] ?? 'locked'}
                tree={activeTree}
                onBeginPractice={handleBeginPractice}
                onClose={closePanel}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen practice overlay */}
      {practiceNode && (
        <PracticeSession
          node={practiceNode.coreNode}
          tree={activeTree}
          sessionConfig={sessionConfig}
          onComplete={handlePracticeComplete}
          onClose={() => setPracticeNodeId(null)}
        />
      )}

      {activeTierTest && (
        <TierTestModal
          test={activeTierTest}
          onPass={handleTierTestPass}
          onFail={() => setActiveTierTestId(null)}
          onClose={() => setActiveTierTestId(null)}
        />
      )}

      {activeRankTest && (
        <RankTestSession
          test={activeRankTest}
          onPass={handleRankTestPass}
          onFail={() => setActiveRankTest(null)}
          onClose={() => setActiveRankTest(null)}
        />
      )}

      {/* Loading / intro sequence */}
      <AnimatePresence>
        {showIntro && (
          <LoadingSequence
            nodes={constellationNodes}
            onDone={() => {
              setShowIntro(false);
              setUiVisible(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
