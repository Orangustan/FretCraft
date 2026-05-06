import { useState } from 'react';
import type { SkillTree, SkillNode, NodeStatus, MediaRef } from '@guitar-st/core';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import type { SessionConfig, FocusLevel, SessionDuration } from '../practice/sessionConfig';
import { DEFAULT_SESSION_CONFIG, FOCUS_XP_MULTIPLIER } from '../practice/sessionConfig';
import './NodeDetailPanel.css';

// ─── helpers ────────────────────────────────────────────────────────────────

function youtubeEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/);
  if (!ytMatch) return null;
  return `https://www.youtube.com/embed/${ytMatch[1]}`;
}

function isPlaceholderUrl(url: string): boolean {
  return url === '#placeholder' || url.startsWith('#placeholder');
}

const TIER_RANK_LABEL: Record<number, string> = {
  1: 'Beginner', 2: 'Novice', 3: 'Intermediate', 4: 'Expert', 5: 'Pro',
};

const EXERCISE_TYPE_LABELS: Record<string, string> = {
  technique: 'Technique',
  theory: 'Theory',
  'ear-training': 'Ear Training',
  performance: 'Performance',
};

const DURATION_OPTIONS: SessionDuration[] = [5, 10, 15, 20, 30];
const FOCUS_OPTIONS: { id: FocusLevel; hint?: string }[] = [
  { id: 'Casual' },
  { id: 'Focused' },
  { id: 'Intense', hint: '+25% XP' },
];

// ─── sub-components ──────────────────────────────────────────────────────────

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
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
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
                  <path d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z" />
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

// ─── status badge helpers ────────────────────────────────────────────────────

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

// ─── main component ──────────────────────────────────────────────────────────

type PanelTab = 'about' | 'practice' | 'progress';

interface NodeDetailPanelProps {
  node: SkillNode;
  status: NodeStatus;
  tree: SkillTree;
  onBeginPractice: (config: SessionConfig) => void;
}

export function NodeDetailPanel({ node, status, onBeginPractice }: NodeDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>('about');
  const [duration, setDuration] = useState<SessionDuration>(DEFAULT_SESSION_CONFIG.durationMinutes);
  const [focus, setFocus] = useState<FocusLevel>(DEFAULT_SESSION_CONFIG.focusLevel);
  const [targetBpm, setTargetBpm] = useState<number | undefined>(undefined);

  const hasBpmExercises = node.exercises?.some((ex) => ex.bpm || ex.bpmStart);
  const maxXp = Math.round((node.xpReward || 0) * FOCUS_XP_MULTIPLIER[focus]);
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const rankLabel = TIER_RANK_LABEL[node.tier] ?? `Tier ${node.tier}`;

  function handleBegin() {
    onBeginPractice({ durationMinutes: duration, focusLevel: focus, targetBpm });
  }

  return (
    <aside className="node-detail-panel">
      {/* Header */}
      <div className="node-detail-panel__header">
        <span className="node-detail-panel__label">{node.label}</span>
        <div className="node-detail-panel__meta">
          <Badge label={STATUS_LABEL[status]} variant={STATUS_BADGE_VARIANT[status]} />
          <span className="node-detail-panel__rank-label">{rankLabel}</span>
          <span className="node-detail-panel__xp">+{node.xpReward} XP</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="node-detail-panel__tabs">
        {(['about', 'practice', 'progress'] as PanelTab[]).map((tab) => (
          <button
            key={tab}
            className={['node-detail-panel__tab', activeTab === tab ? 'node-detail-panel__tab--active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab: About */}
      {activeTab === 'about' && (
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
        </div>
      )}

      {/* Tab: Practice */}
      {activeTab === 'practice' && (
        <div className="node-detail-panel__body">
          {isLocked ? (
            <div className="node-detail-panel__locked-msg">
              <svg className="node-detail-panel__locked-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="9" width="12" height="9" rx="2" />
                <path d="M7 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" />
              </svg>
              <p>Complete prerequisite nodes to unlock this practice session.</p>
            </div>
          ) : (
            <div className="node-detail-panel__session-setup">
              <div className="node-detail-panel__setup-row">
                <p className="node-detail-panel__section-title">Session Duration</p>
                <div className="node-detail-panel__pill-row">
                  {DURATION_OPTIONS.map((d) => (
                    <button
                      key={d}
                      className={['node-detail-panel__pill', duration === d ? 'node-detail-panel__pill--active' : ''].filter(Boolean).join(' ')}
                      onClick={() => setDuration(d)}
                    >
                      {d}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="node-detail-panel__setup-row">
                <p className="node-detail-panel__section-title">Focus Level</p>
                <div className="node-detail-panel__pill-row">
                  {FOCUS_OPTIONS.map(({ id, hint }) => (
                    <button
                      key={id}
                      className={['node-detail-panel__pill', focus === id ? 'node-detail-panel__pill--active' : ''].filter(Boolean).join(' ')}
                      onClick={() => setFocus(id)}
                      title={hint}
                    >
                      {id}{hint ? <span className="node-detail-panel__pill-hint"> {hint}</span> : null}
                    </button>
                  ))}
                </div>
              </div>

              {hasBpmExercises && (
                <div className="node-detail-panel__setup-row">
                  <p className="node-detail-panel__section-title">Target BPM <span className="node-detail-panel__optional">(optional)</span></p>
                  <input
                    type="number"
                    className="node-detail-panel__bpm-input"
                    min={40}
                    max={240}
                    placeholder="e.g. 120"
                    value={targetBpm ?? ''}
                    onChange={(e) => setTargetBpm(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              )}

              <div className="node-detail-panel__xp-preview">
                Up to <strong>+{maxXp} XP</strong> · {node.exercises?.length ?? 0} exercises · {duration} min
              </div>

              {/* Exercise preview list */}
              {node.exercises && node.exercises.length > 0 && (
                <section className="node-detail-panel__exercise-preview">
                  <p className="node-detail-panel__section-title">Exercises</p>
                  {node.exercises.map((ex) => (
                    <div key={ex.id} className="node-detail-panel__exercise">
                      <div className="node-detail-panel__exercise-meta">
                        <span className="node-detail-panel__exercise-type">{EXERCISE_TYPE_LABELS[ex.type] ?? ex.type}</span>
                        {(ex.bpm || ex.bpmStart) && (
                          <span className="node-detail-panel__exercise-bpm">
                            {ex.bpmStart ? `${ex.bpmStart}→${ex.bpmGoal}` : ex.bpm} BPM
                          </span>
                        )}
                        <span className="node-detail-panel__exercise-xp">+{ex.xpValue} XP</span>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              <div className="node-detail-panel__begin-row">
                <Button variant="primary" size="md" onClick={handleBegin}>
                  {isCompleted ? 'Revisit Practice' : 'Begin Session'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Progress */}
      {activeTab === 'progress' && (
        <div className="node-detail-panel__body">
          <div className="node-detail-panel__progress-stats">
            <div className="node-detail-panel__stat">
              <span className="node-detail-panel__stat-label">Status</span>
              <Badge label={STATUS_LABEL[status]} variant={STATUS_BADGE_VARIANT[status]} />
            </div>
            <div className="node-detail-panel__stat">
              <span className="node-detail-panel__stat-label">Max XP</span>
              <span className="node-detail-panel__stat-value">+{node.xpReward}</span>
            </div>
            <div className="node-detail-panel__stat">
              <span className="node-detail-panel__stat-label">Exercises</span>
              <span className="node-detail-panel__stat-value">{node.exercises?.length ?? 0}</span>
            </div>
            <div className="node-detail-panel__stat">
              <span className="node-detail-panel__stat-label">Level</span>
              <span className="node-detail-panel__stat-value">{rankLabel}</span>
            </div>
          </div>
          {isCompleted && (
            <div className="node-detail-panel__completed-badge">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="node-detail-panel__check-icon">
                <circle cx="10" cy="10" r="8" />
                <path d="M6.5 10.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Completed · +{node.xpReward} XP earned
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
