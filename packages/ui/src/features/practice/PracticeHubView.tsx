import { useState } from 'react';
import type { SkillNode, SkillTree, BranchType } from '@guitar-st/core';
import { ProgressionEngine } from '@guitar-st/core';
import { usePlayer } from '../../store/playerStore';
import { PracticeSession } from './PracticeSession';
import './PracticeHubView.css';

function adaptPlayerForEngine(player: ReturnType<typeof usePlayer>['player'], activeArchetypeId: string) {
  const nodeProgress: Record<string, { nodeId: string; status: string; xpEarned: number; completedExercises: string[] }> = {};
  for (const [nodeId, rawStatus] of Object.entries(player.nodeProgress)) {
    const status = rawStatus === 'complete' ? 'completed' : rawStatus;
    nodeProgress[nodeId] = { nodeId, status, xpEarned: 0, completedExercises: [] };
  }
  return {
    id: 'local',
    name: player.name,
    activeArchetypeId,
    xpTotal: player.xp,
    level: player.level,
    nodeProgress,
    passedTierTests: player.passedTierTests ?? [],
    unlockedAchievements: player.unlockedAchievements ?? [],
  };
}

const STATUS_ORDER = ['available', 'in-progress', 'completed', 'locked'] as const;

const PRACTICE_BRANCHES: { id: BranchType; label: string; color: string }[] = [
  { id: 'technique',         label: 'Technique',          color: '#f87171' },
  { id: 'rhythm-timing',     label: 'Rhythm & Timing',    color: '#fb923c' },
  { id: 'fretboard-theory',  label: 'Fretboard & Theory', color: '#facc15' },
  { id: 'harmony-chords',    label: 'Harmony & Chords',   color: '#4ade80' },
  { id: 'lead-improvisation',label: 'Lead & Improv',      color: '#60a5fa' },
  { id: 'music-theory',      label: 'Music Theory',       color: '#c084fc' },
  { id: 'ear-training',      label: 'Ear Training',       color: '#f472b6' },
];

export default function PracticeHubView() {
  const { player, activeTree, dispatch } = usePlayer();
  const [practiceNode, setPracticeNode] = useState<{ node: SkillNode; tree: SkillTree } | null>(null);
  const [activeBranch, setActiveBranch] = useState<BranchType | 'all'>('all');

  const corePlayer = adaptPlayerForEngine(player, activeTree.archetypeId);
  const statuses = ProgressionEngine.getTreeStatus(activeTree, corePlayer as Parameters<typeof ProgressionEngine.getTreeStatus>[1]);
  const allNodes = activeTree.nodes
    .map((n) => ({ node: n, status: statuses[n.id] ?? 'locked' }))
    .filter((x) => x.status !== 'locked')
    .sort((a, b) => STATUS_ORDER.indexOf(a.status as typeof STATUS_ORDER[number]) - STATUS_ORDER.indexOf(b.status as typeof STATUS_ORDER[number]));
  const nodes = activeBranch === 'all'
    ? allNodes
    : allNodes.filter((x) => x.node.branch === activeBranch);

  const handleComplete = (earnedXp: number) => {
    if (!practiceNode) return;
    dispatch({ type: 'COMPLETE_NODE', payload: { nodeId: practiceNode.node.id } });
    dispatch({ type: 'ADD_XP', payload: { amount: earnedXp } });
    setPracticeNode(null);
  };

  const statusLabel: Record<string, string> = {
    available: 'Available',
    'in-progress': 'In Progress',
    completed: 'Complete',
  };

  const statusClass: Record<string, string> = {
    available: 'practice-hub__status--available',
    'in-progress': 'practice-hub__status--progress',
    completed: 'practice-hub__status--complete',
  };

  return (
    <div className="practice-hub">
      <div className="practice-hub__branch-tabs">
        <button
          className={`practice-hub__branch-tab${activeBranch === 'all' ? ' practice-hub__branch-tab--active' : ''}`}
          onClick={() => setActiveBranch('all')}
        >
          All
        </button>
        {PRACTICE_BRANCHES.map((b) => (
          <button
            key={b.id}
            className={`practice-hub__branch-tab${activeBranch === b.id ? ' practice-hub__branch-tab--active' : ''}`}
            style={{ '--branch-color': b.color } as React.CSSProperties}
            onClick={() => setActiveBranch(activeBranch === b.id ? 'all' : b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      {nodes.length === 0 ? (
        <div className="practice-hub__empty">
          <p>No nodes available yet. Start by selecting an archetype in the Skill Tree.</p>
        </div>
      ) : (
        <section className="practice-hub__group">
          <h2 className="practice-hub__group-title">{activeTree.name}</h2>
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
                  onClick={() => setPracticeNode({ node, tree: activeTree })}
                >
                  {status === 'completed' ? 'Revisit' : 'Practice'}
                </button>
              </div>
            ))}
          </div>
        </section>
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
