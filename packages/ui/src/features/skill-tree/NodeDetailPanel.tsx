import { ProgressionEngine } from '@guitar-st/core';
import type { SkillTree, SkillNode, NodeStatus, Player as CorePlayer, NodeProgress as CoreNodeProgress } from '@guitar-st/core';
import { usePlayer, type Player as StorePlayer } from '../../store/playerStore';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import './NodeDetailPanel.css';

function adaptPlayer(storePlayer: StorePlayer): CorePlayer {
  const nodeProgress: Record<string, CoreNodeProgress> = {};
  for (const [nodeId, rawStatus] of Object.entries(storePlayer.nodeProgress)) {
    const status: NodeStatus = rawStatus === 'complete' ? 'completed' : (rawStatus as NodeStatus);
    nodeProgress[nodeId] = { nodeId, status, xpEarned: 0, completedExercises: [] };
  }
  return {
    id: 'local',
    name: storePlayer.name,
    activeArchetypeId: 'rocker',
    xpTotal: storePlayer.xp,
    level: storePlayer.level,
    nodeProgress,
  };
}

const STATUS_BADGE_VARIANT: Record<NodeStatus, 'locked' | 'available' | 'complete' | 'in-progress'> = {
  locked: 'locked',
  available: 'available',
  'in-progress': 'in-progress',
  completed: 'complete',
};

const STATUS_LABEL: Record<NodeStatus, string> = {
  locked: 'Locked',
  available: 'Available',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

interface NodeDetailPanelProps {
  node: SkillNode;
  status: NodeStatus;
  tree: SkillTree;
}

export function NodeDetailPanel({ node, status, tree }: NodeDetailPanelProps) {
  const { player, dispatch } = usePlayer();

  const handleBeginPractice = () => {
    const corePlayer = adaptPlayer(player);
    ProgressionEngine.applyNodeCompletion(node.id, tree, corePlayer);
    dispatch({ type: 'COMPLETE_NODE', payload: { nodeId: node.id } });
    dispatch({ type: 'ADD_XP', payload: { amount: node.xpReward } });
  };

  return (
    <aside className="node-detail-panel">
      <div className="node-detail-panel__header">
        <span className="node-detail-panel__label">{node.label}</span>
        <div className="node-detail-panel__meta">
          <Badge label={STATUS_LABEL[status]} variant={STATUS_BADGE_VARIANT[status]} />
          <span className="node-detail-panel__xp">+{node.xpReward} XP</span>
        </div>
      </div>

      <div className="node-detail-panel__body">
        <section>
          <p className="node-detail-panel__section-title">About</p>
          <p className="node-detail-panel__description">{node.content.description}</p>
        </section>

        <section>
          <p className="node-detail-panel__section-title">Objectives</p>
          <ul className="node-detail-panel__list">
            {node.content.objectives.map((obj, i) => (
              <li key={i} className="node-detail-panel__list-item">{obj}</li>
            ))}
          </ul>
        </section>

        {node.exercises && node.exercises.length > 0 && (
          <section>
            <p className="node-detail-panel__section-title">Exercises</p>
            {node.exercises.map((ex) => (
              <div key={ex.id} className="node-detail-panel__exercise">
                <div className="node-detail-panel__exercise-meta">
                  <span className="node-detail-panel__exercise-type">{ex.type}</span>
                  {ex.bpm && (
                    <span className="node-detail-panel__exercise-bpm">{ex.bpm} bpm</span>
                  )}
                  <span className="node-detail-panel__exercise-xp">+{ex.xpValue} XP</span>
                </div>
                <p className="node-detail-panel__exercise-prompt">{ex.prompt}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className="node-detail-panel__footer">
        {status === 'available' && (
          <Button variant="primary" size="md" onClick={handleBeginPractice}>
            Begin Practice
          </Button>
        )}
        {status === 'completed' && (
          <div className="node-detail-panel__completed-info">
            <div className="node-detail-panel__completed-dot" />
            Completed · +{node.xpReward} XP earned
          </div>
        )}
      </div>
    </aside>
  );
}
