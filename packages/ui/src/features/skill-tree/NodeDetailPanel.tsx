import type { SkillTree, SkillNode, NodeStatus, MediaRef } from '@guitar-st/core';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import './NodeDetailPanel.css';

function youtubeEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/);
  if (!ytMatch) return null;
  return `https://www.youtube.com/embed/${ytMatch[1]}`;
}

function MediaSection({ refs }: { refs: MediaRef[] }) {
  if (!refs || refs.length === 0) return null;
  return (
    <section>
      <p className="node-detail-panel__section-title">Resources</p>
      <div className="node-detail-panel__media">
        {refs.map((ref, i) => {
          if (ref.type === 'video') {
            const embedUrl = youtubeEmbedUrl(ref.url);
            if (embedUrl) {
              return (
                <div key={i} className="node-detail-panel__media-item">
                  <p className="node-detail-panel__media-label">{ref.label}</p>
                  <div className="node-detail-panel__video-wrap">
                    <iframe
                      src={embedUrl}
                      title={ref.label}
                      frameBorder="0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            }
            return (
              <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer" className="node-detail-panel__media-link">
                {ref.label}
              </a>
            );
          }
          if (ref.type === 'audio') {
            return (
              <div key={i} className="node-detail-panel__media-item">
                <p className="node-detail-panel__media-label">{ref.label}</p>
                <audio controls src={ref.url} className="node-detail-panel__audio" />
              </div>
            );
          }
          return (
            <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer" className="node-detail-panel__media-link">
              {ref.label}
            </a>
          );
        })}
      </div>
    </section>
  );
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
  onBeginPractice: () => void;
}

export function NodeDetailPanel({ node, status, onBeginPractice }: NodeDetailPanelProps) {
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

        {node.content.mediaRefs && node.content.mediaRefs.length > 0 && (
          <MediaSection refs={node.content.mediaRefs} />
        )}

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
          <Button variant="primary" size="md" onClick={onBeginPractice}>
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
