import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { findNextUp } from '../../graph/pathfinding';
import { useUIStore } from '../../store/uiStore';
import { BRANCH_LABELS, BRANCH_HEX } from '../../data/types';
import type { ConstellationNode } from './coreAdapter';
import type { NodeStatus } from '../../data/types';
import './NextUpPanel.css';

interface Props {
  nodes: ConstellationNode[];
  nodeMap: Map<string, ConstellationNode>;
  nodeStatuses: Record<string, NodeStatus>;
}

export function NextUpPanel({ nodes: _nodes, nodeMap, nodeStatuses }: Props) {
  const { nextUpPanelOpen, toggleNextUpPanel, selectNode } = useUIStore();

  const nextUpIds = useMemo(
    () => findNextUp(nodeMap, nodeStatuses, 3),
    [nodeMap, nodeStatuses]
  );

  const nextUpNodes = nextUpIds
    .map(id => nodeMap.get(id))
    .filter(Boolean) as ConstellationNode[];

  return (
    <div className="next-up">
      <button className="next-up__toggle" onClick={toggleNextUpPanel}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="next-up__icon">
          <path d="M8 2L14 13H2L8 2Z" />
        </svg>
        What's Next?
      </button>

      <AnimatePresence>
        {nextUpPanelOpen && (
          <motion.div
            className="next-up__panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
          >
            <h3 className="next-up__title">Recommended Next Steps</h3>
            {nextUpNodes.length === 0 ? (
              <p className="next-up__empty">No available nodes — keep going!</p>
            ) : (
              <ul className="next-up__list">
                {nextUpNodes.map(node => {
                  const color = BRANCH_HEX[node.branch].primary;
                  return (
                    <li
                      key={node.id}
                      className="next-up__item"
                      style={{ '--item-color': color } as React.CSSProperties}
                      onClick={() => selectNode(node.id)}
                    >
                      <span className="next-up__item-dot" />
                      <div className="next-up__item-body">
                        <span className="next-up__item-title">{node.title}</span>
                        <span className="next-up__item-branch">{BRANCH_LABELS[node.branch]}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
