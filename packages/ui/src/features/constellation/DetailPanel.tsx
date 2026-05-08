import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SkillNode, SongNode, NodeStatus } from '../../data/types';
import { BRANCH_LABELS, BRANCH_HEX, isSongNode } from '../../data/types';
import { useProgressStore } from '../../store/progressStore';
import { useUIStore } from '../../store/uiStore';
import { nodeMap } from '../../data/index';
import './DetailPanel.css';

const STATUS_LABELS: Record<NodeStatus, string> = {
  locked:      'Locked',
  available:   'Available',
  in_progress: 'In Progress',
  learned:     'Learned',
  mastered:    'Mastered',
};

const STATUS_ORDER: NodeStatus[] = ['available', 'in_progress', 'learned', 'mastered'];

export function DetailPanel({ node }: { node: SkillNode | SongNode }) {
  const { notes, timestamps, setStatus, setNote, nodeStatuses } = useProgressStore();
  const { closePanel } = useUIStore();

  const branchColor = BRANCH_HEX[node.branch].primary;
  const branchGlow  = BRANCH_HEX[node.branch].glow;
  const currentStatus: NodeStatus = nodeStatuses[node.id] ?? 'available';
  const note = notes[node.id] ?? '';
  const ts = timestamps[node.id];
  const song = isSongNode(node);

  const noteRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const onNoteChange = (value: string) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setNote(node.id, value), 400);
    // Update textarea value directly without re-render delay
    if (noteRef.current) noteRef.current.value = value;
  };

  // Nodes unlocked by this one
  const dependents = [...nodeMap.values()].filter(n =>
    n.prerequisites.includes(node.id)
  );

  // Prerequisite nodes with their statuses
  const prereqs = node.prerequisites.map(id => ({
    id,
    node: nodeMap.get(id),
    status: (nodeStatuses[id] ?? 'locked') as NodeStatus,
  }));

  return (
    <motion.div
      className="detail-panel"
      style={{ '--branch-color': branchColor, '--branch-glow': branchGlow } as React.CSSProperties}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.25, 0, 0.1, 1] }}
    >
      {/* Header */}
      <div className="detail-panel__header">
        <div className="detail-panel__meta">
          <span className="detail-panel__branch">{BRANCH_LABELS[node.branch]}</span>
          <span className="detail-panel__tier">Tier {node.tier}</span>
          {song && <span className="detail-panel__artist">{(node as SongNode).artist}</span>}
        </div>
        <button className="detail-panel__close" onClick={closePanel} aria-label="Close">×</button>
      </div>

      <h2 className="detail-panel__title">{node.title}</h2>

      {node.estimatedHours && (
        <div className="detail-panel__hours">~{node.estimatedHours}h to learn</div>
      )}

      {/* Status selector */}
      <div className="detail-panel__status-row">
        {STATUS_ORDER.map(s => (
          <button
            key={s}
            className={`detail-panel__status-btn ${currentStatus === s ? 'detail-panel__status-btn--active' : ''}`}
            onClick={() => setStatus(node.id, s)}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="detail-panel__scroll">
        {/* Description */}
        <p className="detail-panel__description">{node.description}</p>

        {/* Prerequisites */}
        {prereqs.length > 0 && (
          <section className="detail-panel__section">
            <h3 className="detail-panel__section-title">Prerequisites</h3>
            <ul className="detail-panel__prereq-list">
              {prereqs.map(p => (
                <li key={p.id} className={`detail-panel__prereq detail-panel__prereq--${p.status}`}>
                  <span className="detail-panel__prereq-dot" />
                  {p.node?.title ?? p.id}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Practice prompts */}
        {node.practice.length > 0 && (
          <section className="detail-panel__section">
            <h3 className="detail-panel__section-title">Practice</h3>
            <ol className="detail-panel__practice-list">
              {node.practice.map((prompt, i) => (
                <li key={i} className="detail-panel__practice-item">{prompt}</li>
              ))}
            </ol>
          </section>
        )}

        {/* Key techniques (song nodes) */}
        {song && (node as SongNode).keyTechniques.length > 0 && (
          <section className="detail-panel__section">
            <h3 className="detail-panel__section-title">Key Techniques</h3>
            <ul className="detail-panel__tag-list">
              {(node as SongNode).keyTechniques.map(t => (
                <li key={t} className="detail-panel__tag">{t}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Resources */}
        {node.resources.length > 0 && (
          <section className="detail-panel__section">
            <h3 className="detail-panel__section-title">Resources</h3>
            <ul className="detail-panel__resource-list">
              {node.resources.map((r, i) => (
                <li key={i} className="detail-panel__resource">
                  <span className="detail-panel__resource-kind">{r.kind}</span>
                  {r.url && r.url !== 'TODO' ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
                  ) : (
                    <span>{r.title}</span>
                  )}
                  {r.source && <span className="detail-panel__resource-source">{r.source}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* What this unlocks */}
        {dependents.length > 0 && (
          <section className="detail-panel__section">
            <h3 className="detail-panel__section-title">Unlocks</h3>
            <ul className="detail-panel__prereq-list">
              {dependents.map(d => (
                <li key={d.id} className={`detail-panel__prereq detail-panel__prereq--${nodeStatuses[d.id] ?? 'locked'}`}>
                  <span className="detail-panel__prereq-dot" />
                  {d.title}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Notes */}
        <section className="detail-panel__section">
          <h3 className="detail-panel__section-title">Notes</h3>
          <textarea
            ref={noteRef}
            className="detail-panel__notes"
            defaultValue={note}
            onChange={e => onNoteChange(e.target.value)}
            placeholder="Write your practice notes here…"
          />
        </section>

        {/* Timestamps */}
        {ts?.learnedAt && (
          <div className="detail-panel__timestamp">
            Learned {new Date(ts.learnedAt).toLocaleDateString()}
          </div>
        )}
        {ts?.masteredAt && (
          <div className="detail-panel__timestamp">
            Mastered {new Date(ts.masteredAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </motion.div>
  );
}
