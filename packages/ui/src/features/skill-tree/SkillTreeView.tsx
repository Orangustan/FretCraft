import { useState, useMemo } from 'react';
import { ROCKER_TREE, JAZZ_TREE, BLUES_TREE, CLASSICAL_TREE, METAL_TREE, ROCKER_TIER_TESTS } from '@guitar-st/core';

const BUILT_IN_TREES = [ROCKER_TREE, JAZZ_TREE, BLUES_TREE, CLASSICAL_TREE, METAL_TREE];
import type { TierTestResult } from '@guitar-st/core';
import { usePlayer } from '../../store/playerStore';
import { useSkillTree } from './useSkillTree';
import { SkillTreeCanvas } from './SkillTreeCanvas';
import { NodeDetailPanel } from './NodeDetailPanel';
import { PracticeSession } from '../practice/PracticeSession';
import { TierTestModal } from '../practice/TierTestModal';
import './SkillTreeView.css';

const TIER_TEST_REGISTRY = [...ROCKER_TIER_TESTS];

export default function SkillTreeView() {
  const { activeTree, customTrees, setActiveTree, dispatch, player } = usePlayer();
  const { nodeStatuses, handleNodeClick, selectedNodeId, resetSelection } = useSkillTree(activeTree);
  const [practiceNodeId, setPracticeNodeId] = useState<string | null>(null);
  const [activeTierTestId, setActiveTierTestId] = useState<string | null>(null);

  const selectedNode = selectedNodeId
    ? activeTree.nodes.find((n) => n.id === selectedNodeId) ?? null
    : null;

  const practiceNode = practiceNodeId
    ? activeTree.nodes.find((n) => n.id === practiceNodeId) ?? null
    : null;

  const activeTierTest = activeTierTestId
    ? TIER_TEST_REGISTRY.find((t) => t.id === activeTierTestId) ?? null
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
  };

  const handlePracticeComplete = (earnedXp: number) => {
    if (!practiceNodeId) return;
    dispatch({ type: 'COMPLETE_NODE', payload: { nodeId: practiceNodeId } });
    dispatch({ type: 'ADD_XP', payload: { amount: earnedXp } });
    setPracticeNodeId(null);
  };

  const handleTierTestPass = (result: TierTestResult) => {
    if (!activeTierTestId) return;
    dispatch({ type: 'PASS_TIER_TEST', payload: { testId: activeTierTestId } });
    console.log('Tier test passed:', result);
  };

  return (
    <div className="skill-tree-view">
      <div className="archetype-selector">
        <label htmlFor="archetype-select">Archetype</label>
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
      </div>

      {availableTierTest && !activeTierTestId && (
        <div className="tier-test-banner">
          <span>Tier {availableTierTest.tierId} complete!</span>
          <button
            className="tier-test-banner__btn"
            onClick={() => setActiveTierTestId(availableTierTest.id)}
          >
            Take Tier Test to Advance
          </button>
        </div>
      )}

      <SkillTreeCanvas
        tree={activeTree}
        nodeStatuses={nodeStatuses}
        selectedNodeId={selectedNodeId}
        onNodeClick={handleNodeClick}
      />
      {selectedNode && (
        <NodeDetailPanel
          key={selectedNode.id}
          node={selectedNode}
          status={nodeStatuses[selectedNode.id] ?? 'locked'}
          tree={activeTree}
          onBeginPractice={() => setPracticeNodeId(selectedNode.id)}
        />
      )}
      {practiceNode && (
        <PracticeSession
          node={practiceNode}
          tree={activeTree}
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
    </div>
  );
}
