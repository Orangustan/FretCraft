import type { SkillTree, SkillNode, NodeStatus, MediaRef } from '@guitar-st/core';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import './NodeDetailPanel.css';

function youtubeEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/);
  if (!ytMatch) return null;
  return `https://www.youtube.com/embed/${ytMatch[1]}`;
}

function isPlaceholderUrl(url: string): boolean {
  return url === '#placeholder' || url.startsWith('#placeholder');
}

function HandBadge({ hand }: { hand: 'left' | 'right' }) {
  return (
    <span className={`node-detail-panel__hand-badge node-detail-panel__hand-badge--${hand}`}>
      {hand === 'left' ? 'LEFT HAND' : 'RIGHT HAND'}
    </span>
  );
}

function VideoPlaceholder({ label, hand }: { label: string; hand?: 'left' | 'right' }) {
  return (
    <div className="node-detail-panel__media-item">
      <div className="node-detail-panel__media-label-row">
        <p className="node-detail-panel__media-label">{label}</p>
        {hand && <HandBadge hand={hand} />}
      </div>
      <div className="node-detail-panel__video-placeholder">
        <svg viewBox="0 0 48 48" fill="none" className="node-detail-panel__video-placeholder-icon">
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 17l12 7-12 7V17z" fill="currentColor" opacity="0.6" />
        </svg>
        <span className="node-detail-panel__placeholder-text">Video coming soon</span>
      </div>
    </div>
  );
}

function PdfPlaceholder({ label }: { label: string }) {
  return (
    <div className="node-detail-panel__media-item">
      <p className="node-detail-panel__media-label">{label}</p>
      <div className="node-detail-panel__pdf-placeholder">
        <svg viewBox="0 0 48 48" fill="none" className="node-detail-panel__pdf-placeholder-icon">
          <rect x="10" y="4" width="28" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 14h16M16 20h16M16 26h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M28 32h8v8l-4-2-4 2V32z" fill="currentColor" opacity="0.5" />
        </svg>
        <div className="node-detail-panel__pdf-placeholder-text">
          <span className="node-detail-panel__placeholder-title">Sheet Music</span>
          <span className="node-detail-panel__placeholder-text">PDF notation coming soon</span>
        </div>
      </div>
    </div>
  );
}

function MediaSection({ refs }: { refs: MediaRef[] }) {
  if (!refs || refs.length === 0) return null;
  return (
    <section>
      <p className="node-detail-panel__section-title">Resources</p>
      <div className="node-detail-panel__media">
        {refs.map((ref, i) => {
          if (ref.type === 'video') {
            if (isPlaceholderUrl(ref.url)) {
              return <VideoPlaceholder key={i} label={ref.label} hand={ref.hand} />;
            }
            const embedUrl = youtubeEmbedUrl(ref.url);
            if (embedUrl) {
              return (
                <div key={i} className="node-detail-panel__media-item">
                  <div className="node-detail-panel__media-label-row">
                    <p className="node-detail-panel__media-label">{ref.label}</p>
                    {ref.hand && <HandBadge hand={ref.hand} />}
                  </div>
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
          if (ref.type === 'pdf-excerpt') {
            if (isPlaceholderUrl(ref.url)) {
              return <PdfPlaceholder key={i} label={ref.label} />;
            }
            return (
              <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer" className="node-detail-panel__media-link node-detail-panel__media-link--pdf">
                <svg viewBox="0 0 16 16" fill="currentColor" className="node-detail-panel__pdf-icon">
                  <path d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/>
                </svg>
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
