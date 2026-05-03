import { useState } from 'react';
import { ARCHETYPE_REGISTRY } from '@guitar-st/core';
import type { SkillNode, SkillTree } from '@guitar-st/core';
import { ProgressionEngine } from '@guitar-st/core';
import { usePlayer } from '../../store/playerStore';
import { PracticeSession } from './PracticeSession';
import './PracticeHubView.css';

function adaptPlayerForEngine(player: ReturnType<typeof usePlayer>['player']) {
  const nodeProgress: Record<string, { nodeId: string; status: string; xpEarned: number; completedExercises: string[] }> = {};
  for (const [nodeId, rawStatus] of Object.entries(player.nodeProgress)) {
    const status = rawStatus === 'complete' ? 'completed' : rawStatus;
    nodeProgress[nodeId] = { nodeId, status, xpEarned: 0, completedExercises: [] };
  }
  return {
    id: 'local',
    name: player.name,
    activeArchetypeId: 'rocker',
    xpTotal: player.xp,
    level: player.level,
    nodeProgress,
    passedTierTests: player.passedTierTests ?? [],
    unlockedAchievements: player.unlockedAchievements ?? [],
  };
}

const STATUS_ORDER = ['available', 'in-progress', 'complete', 'locked'] as const;

export default function PracticeHubView() {
  const { player, dispatch } = usePlayer();
  const [practiceNode, setPracticeNode] = useState<{ node: SkillNode; tree: SkillTree } | null>(null);

  const corePlayer = adaptPlayerForEngine(player);

  const allTrees = Object.values(ARCHETYPE_REGISTRY);
  const groups = allTrees.map((tree) => {
    const statuses = ProgressionEngine.getTreeStatus(tree, corePlayer as Parameters<typeof ProgressionEngine.getTreeStatus>[1]);
    const nodes = tree.nodes
      .map((n) => ({ node: n, status: statuses[n.id] ?? 'locked', tree }))
      .filter((x) => x.status !== 'locked')
      .sort((a, b) => STATUS_ORDER.indexOf(a.status as typeof STATUS_ORDER[number]) - STATUS_ORDER.indexOf(b.status as typeof STATUS_ORDER[number]));
    return { tree, nodes };
  }).filter((g) => g.nodes.length > 0);

  const handleComplete = (earnedXp: number) => {
    if (!practiceNode) return;
    dispatch({ type: 'COMPLETE_NODE', payload: { nodeId: practiceNode.node.id } });
    dispatch({ type: 'ADD_XP', payload: { amount: earnedXp } });
    setPracticeNode(null);
  };

  const statusLabel: Record<string, string> = {
    available: 'Available',
    'in-progress': 'In Progress',
    complete: 'Complete',
  };

  const statusClass: Record<string, string> = {
    available: 'practice-hub__status--available',
    'in-progress': 'practice-hub__status--progress',
    complete: 'practice-hub__status--complete',
  };

  return (
    <div className="practice-hub">
      {allTrees.length === 0 || groups.length === 0 ? (
        <div className="practice-hub__empty">
          <p>No nodes available yet. Start by selecting an archetype in the Skill Tree.</p>
        </div>
      ) : (
        groups.map(({ tree, nodes }) => (
          <section key={tree.id} className="practice-hub__group">
            <h2 className="practice-hub__group-title">{tree.name}</h2>
            <div className="practice-hub__nodes">
              {nodes.map(({ node, status }) => (
                <div key={node.id} className="practice-hub__node">
                  <div className="practice-hub__node-info">
                    <div className="practice-hub__node-top">
                      <span className="practice-hub__node-label">{node.label}</span>
                      <span className={['practice-hub__status', statusClass[status] ?? ''].filter(Boolean).join(' ')}>
                        {statusLabel[status] ?? status}
                      </span>
                    </div>
                    <p className="practice-hub__node-desc">{node.content.description.slice(0, 120)}…</p>
                    <div className="practice-hub__node-meta">
                      <span className="practice-hub__xp">+{node.xpReward} XP</span>
                      <span className="practice-hub__exercises">{node.exercises?.length ?? 0} exercises</span>
                      <span className="practice-hub__tier">Tier {node.tier}</span>
                    </div>
                  </div>
                  <button
                    className="practice-hub__btn"
                    onClick={() => setPracticeNode({ node, tree })}
                  >
                    {status === 'complete' ? 'Revisit' : 'Practice'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      {practiceNode && (
        <PracticeSession
          node={practiceNode.node}
          tree={practiceNode.tree}
          onComplete={handleComplete}
          onClose={() => setPracticeNode(null)}
        />
      )}
    </div>
  );
}
