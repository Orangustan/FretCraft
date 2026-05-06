import { useState, useMemo } from 'react';
import {
  ROCKER_TREE, JAZZ_TREE, BLUES_TREE, CLASSICAL_TREE, METAL_TREE, VAIDEOLOGY_TREE, COUNTRY_TREE,
  ROCKER_TIER_TESTS, COUNTRY_TIER_TESTS,
  getRankTestsForArchetype, getCurrentRank, canAdvanceRank, getNextRank,
  ProgressionEngine,
} from '@guitar-st/core';
import type { TierTestResult, BranchType, PlayerRank, RankTest } from '@guitar-st/core';

const BUILT_IN_TREES = [ROCKER_TREE, JAZZ_TREE, BLUES_TREE, CLASSICAL_TREE, METAL_TREE, VAIDEOLOGY_TREE, COUNTRY_TREE];

const RANK_LABELS: Record<PlayerRank, string> = {
  beginner: 'Beginner',
  novice: 'Novice',
  intermediate: 'Intermediate',
  expert: 'Expert',
  pro: 'Pro',
};

const BRANCHES: { id: BranchType; label: string; color: string }[] = [
  { id: 'technique',        label: 'Technique',         color: '#f87171' },
  { id: 'rhythm-timing',    label: 'Rhythm & Timing',   color: '#fb923c' },
  { id: 'fretboard-theory', label: 'Fretboard & Theory',color: '#facc15' },
  { id: 'harmony-chords',   label: 'Harmony & Chords',  color: '#4ade80' },
  { id: 'lead-improvisation',label: 'Lead & Improv',    color: '#60a5fa' },
  { id: 'music-theory',     label: 'Music Theory',      color: '#c084fc' },
  { id: 'ear-training',     label: 'Ear Training',      color: '#f472b6' },
];
import { usePlayer } from '../../store/playerStore';
import { useSkillTree } from './useSkillTree';
import { SkillTreeCanvas } from './SkillTreeCanvas';
import { NodeDetailPanel } from './NodeDetailPanel';
import { PracticeSession } from '../practice/PracticeSession';
import { RankTestSession } from '../practice/RankTestSession';
import { TierTestModal } from '../practice/TierTestModal';
import type { SessionConfig } from '../practice/sessionConfig';
import { DEFAULT_SESSION_CONFIG } from '../practice/sessionConfig';
import './SkillTreeView.css';

const TIER_TEST_REGISTRY = [...ROCKER_TIER_TESTS, ...COUNTRY_TIER_TESTS];

export default function SkillTreeView() {
  const { activeTree, customTrees, setActiveTree, dispatch, player } = usePlayer();
  const { nodeStatuses, handleNodeClick, selectedNodeId, resetSelection } = useSkillTree(activeTree);
  const [practiceNodeId, setPracticeNodeId] = useState<string | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig>(DEFAULT_SESSION_CONFIG);
  const [activeTierTestId, setActiveTierTestId] = useState<string | null>(null);
  const [activeRankTest, setActiveRankTest] = useState<RankTest | null>(null);
  const [activeBranch, setActiveBranch] = useState<BranchType | 'all'>('all');

  const selectedNode = selectedNodeId
    ? activeTree.nodes.find((n) => n.id === selectedNodeId) ?? null
    : null;

  const practiceNode = practiceNodeId
    ? activeTree.nodes.find((n) => n.id === practiceNodeId) ?? null
    : null;

  const activeTierTest = activeTierTestId
    ? TIER_TEST_REGISTRY.find((t) => t.id === activeTierTestId) ?? null
    : null;

  // Rank info for active archetype
  const corePlayerForRank = useMemo(() => ({
    id: 'local',
    name: player.name,
    activeArchetypeId: activeTree.archetypeId,
    xpTotal: player.xp,
    level: player.level,
    nodeProgress: Object.fromEntries(
      Object.entries(player.nodeProgress).map(([id, s]) => [
        id,
        { nodeId: id, status: s === 'complete' ? 'completed' : s, xpEarned: 0, completedExercises: [] },
      ])
    ),
    passedTierTests: player.passedTierTests ?? [],
    passedRankTests: player.passedRankTests ?? [],
    archetypeRanks: player.archetypeRanks ?? {},
    unlockedAchievements: player.unlockedAchievements ?? [],
  }), [player, activeTree.archetypeId]);

  const currentRank = getCurrentRank(corePlayerForRank as Parameters<typeof getCurrentRank>[0], activeTree.archetypeId);
  const nextRank = getNextRank(currentRank);
  const rankTests = getRankTestsForArchetype(activeTree.archetypeId);
  const canAdvance = canAdvanceRank(corePlayerForRank as Parameters<typeof canAdvanceRank>[0], activeTree, rankTests);

  const gateTest = nextRank
    ? rankTests.find((t) => t.fromRank === currentRank && t.toRank === nextRank) ?? null
    : null;

  // Determine if any tier test is available (all nodes in tier done, test not yet passed)
  const availableTierTest = useMemo(() => {
    const passedTests = new Set(player.passedTierTests);
    const completedNodes = new Set(
      Object.entries(player.nodeProgress)
        .filter(([, s]) => s === 'complete')
        .map(([id]) => id)
    );

    return TIER_TEST_REGISTRY.find((test) => {
      if (passedTests.has(test.id)) return false;
      const tierNodes = activeTree.nodes.filter((n) => n.tier === test.tierId);
      if (tierNodes.length === 0) return false;
      return tierNodes.every((n) => completedNodes.has(n.id));
    }) ?? null;
  }, [player.nodeProgress, player.passedTierTests, activeTree.nodes]);

  const handleTreeChange = (treeId: string) => {
    setActiveTree(treeId);
    resetSelection();
    setActiveBranch('all');
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
    // Auto-advance rank if completing this node finishes the current tier
    const { rankAdvanced, newRank } = ProgressionEngine.applyNodeCompletion(
      practiceNodeId,
      activeTree,
      corePlayerForRank as Parameters<typeof ProgressionEngine.applyNodeCompletion>[2]
    );
    if (rankAdvanced && newRank) {
      dispatch({ type: 'ADVANCE_RANK', payload: { archetypeId: activeTree.archetypeId, newRank: newRank as PlayerRank } });
    }
    setPracticeNodeId(null);
  };

  const handleTierTestPass = (result: TierTestResult) => {
    if (!activeTierTestId) return;
    dispatch({ type: 'PASS_TIER_TEST', payload: { testId: activeTierTestId } });
    console.log('Tier test passed:', result);
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
    <div className="skill-tree-view">
      <div className="archetype-selector">
        <label htmlFor="archetype-select">Archetype</label>
        <div className="archetype-selector__row">
          <select
            id="archetype-select"
            value={activeTree.id}
            onChange={(e) => handleTreeChange(e.target.value)}
          >
            {BUILT_IN_TREES.map((tree) => (
              <option key={tree.id} value={tree.id}>{tree.name}</option>
            ))}
            {customTrees.length > 0 && (
              <optgroup label="Custom">
                {customTrees.map((tree) => (
                  <option key={tree.id} value={tree.id}>{tree.name}</option>
                ))}
              </optgroup>
            )}
          </select>
          <span className={`rank-badge rank-badge--${currentRank}`}>
            {RANK_LABELS[currentRank]}
          </span>
        </div>
      </div>

      {/* Rank gate test banner — appears when tier completion unlocks advancement */}
      {canAdvance && !activeRankTest && nextRank && (
        <div className="rank-gate-banner">
          <span className="rank-gate-banner__text">
            Ready to advance to <strong>{RANK_LABELS[nextRank]}</strong>!
          </span>
          {gateTest && (
            <button
              className="rank-gate-banner__btn"
              onClick={() => setActiveRankTest(gateTest)}
            >
              Take Rank Test
            </button>
          )}
          <button
            className="rank-gate-banner__btn rank-gate-banner__btn--secondary"
            onClick={() => dispatch({ type: 'ADVANCE_RANK', payload: { archetypeId: activeTree.archetypeId, newRank: nextRank } })}
          >
            Advance (Skip Test)
          </button>
        </div>
      )}

      {/* Test-out banner — appears even if tier not complete */}
      {!canAdvance && gateTest && nextRank && (
        <div className="rank-gate-banner rank-gate-banner--testout">
          <span className="rank-gate-banner__text">
            Want to skip to <strong>{RANK_LABELS[nextRank]}</strong>?
          </span>
          <button
            className="rank-gate-banner__btn"
            onClick={() => setActiveRankTest(gateTest)}
          >
            Test Out
          </button>
        </div>
      )}

      {availableTierTest && !activeTierTestId && (
        <div className="tier-test-banner">
          <span>{RANK_LABELS[({ 1: 'beginner', 2: 'novice', 3: 'intermediate', 4: 'expert' } as Record<number, PlayerRank>)[availableTierTest.tierId] ?? 'beginner']} tier complete!</span>
          <button
            className="tier-test-banner__btn"
            onClick={() => setActiveTierTestId(availableTierTest.id)}
          >
            Take Tier Test to Advance
          </button>
        </div>
      )}

      <div className="branch-legend">
        <button
          className={`branch-chip branch-chip--all${activeBranch === 'all' ? ' branch-chip--active' : ''}`}
          onClick={() => setActiveBranch('all')}
        >
          All
        </button>
        {BRANCHES.map((b) => (
          <button
            key={b.id}
            className={`branch-chip${activeBranch === b.id ? ' branch-chip--active' : ''}`}
            style={{ '--branch-color': b.color } as React.CSSProperties}
            onClick={() => setActiveBranch(activeBranch === b.id ? 'all' : b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <SkillTreeCanvas
        tree={activeTree}
        nodeStatuses={nodeStatuses}
        selectedNodeId={selectedNodeId}
        onNodeClick={handleNodeClick}
        activeBranch={activeBranch}
        currentRank={currentRank}
      />
      {selectedNode && (
        <NodeDetailPanel
          key={selectedNode.id}
          node={selectedNode}
          status={nodeStatuses[selectedNode.id] ?? 'locked'}
          tree={activeTree}
          onBeginPractice={(config) => { setSessionConfig(config); setPracticeNodeId(selectedNode.id); }}
        />
      )}
      {practiceNode && (
        <PracticeSession
          node={practiceNode}
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
          onFail={() => {}}
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
    </div>
  );
}
