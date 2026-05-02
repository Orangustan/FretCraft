import { useState, useCallback } from 'react';
import type { SkillTree, SkillNode } from '@guitar-st/core';
import { Button } from '../../shared/components/Button';
import './TreeConfigurator.css';

interface EditableNode {
  id: string;
  label: string;
  tier: number;
  xpReward: number;
  prerequisites: string[];
}

function toEditable(node: SkillNode): EditableNode {
  return {
    id: node.id,
    label: node.label,
    tier: node.tier,
    xpReward: node.xpReward,
    prerequisites: node.prerequisites,
  };
}

interface TreeConfiguratorProps {
  tree: SkillTree;
  onSave: (tree: SkillTree) => void;
}

export function TreeConfigurator({ tree, onSave }: TreeConfiguratorProps) {
  const [nodes, setNodes] = useState<EditableNode[]>(() => tree.nodes.map(toEditable));

  const updateLabel = useCallback((id: string, label: string) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, label } : n));
  }, []);

  const updateXp = useCallback((id: string, raw: string) => {
    const xpReward = Math.max(0, parseInt(raw, 10) || 0);
    setNodes(ns => ns.map(n => n.id === id ? { ...n, xpReward } : n));
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes(ns => {
      const remaining = ns.filter(n => n.id !== id);
      // Remove deleted id from any prerequisites
      return remaining.map(n => ({
        ...n,
        prerequisites: n.prerequisites.filter(p => p !== id),
      }));
    });
  }, []);

  const handleSave = useCallback(() => {
    const nodeMap = new Map(tree.nodes.map(n => [n.id, n]));
    const updatedNodes: SkillNode[] = nodes.map(e => ({
      ...nodeMap.get(e.id)!,
      label: e.label,
      xpReward: e.xpReward,
      prerequisites: e.prerequisites,
    }));
    onSave({
      ...tree,
      nodes: updatedNodes,
      rootNodeId: updatedNodes[0]?.id ?? tree.rootNodeId,
    });
  }, [nodes, tree, onSave]);

  const getPrereqLabels = (prereqs: string[]) => {
    const labelMap = new Map(nodes.map(n => [n.id, n.label]));
    return prereqs.map(id => labelMap.get(id) ?? id);
  };

  return (
    <div className="tree-configurator">
      <div className="tree-configurator__header">
        <h2 className="tree-configurator__title">{tree.name}</h2>
        <p className="tree-configurator__subtitle">
          Edit node names and XP rewards, or remove nodes you don't want to practice.
        </p>
      </div>

      <div className="tree-configurator__table-wrap">
        {nodes.length === 0 ? (
          <p className="tree-configurator__empty">All nodes removed. Save to create an empty tree.</p>
        ) : (
          <table className="tree-configurator__table">
            <thead>
              <tr>
                <th>Node</th>
                <th>Tier</th>
                <th style={{ textAlign: 'right' }}>XP</th>
                <th>Prerequisites</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {nodes.map(node => (
                <tr key={node.id} className="tree-configurator__row">
                  <td className="tree-configurator__cell" style={{ minWidth: 160 }}>
                    <input
                      className="tree-configurator__name-input"
                      value={node.label}
                      onChange={e => updateLabel(node.id, e.target.value)}
                    />
                  </td>

                  <td className="tree-configurator__cell">
                    <span className="tree-configurator__tier-badge">{node.tier}</span>
                  </td>

                  <td className="tree-configurator__cell" style={{ textAlign: 'right' }}>
                    <input
                      className="tree-configurator__xp-input"
                      type="number"
                      min={0}
                      value={node.xpReward}
                      onChange={e => updateXp(node.id, e.target.value)}
                    />
                  </td>

                  <td className="tree-configurator__cell" style={{ minWidth: 160 }}>
                    <div className="tree-configurator__prereqs">
                      {node.prerequisites.length === 0 ? (
                        <span className="tree-configurator__prereq-tag tree-configurator__prereq-tag--none">
                          none
                        </span>
                      ) : (
                        getPrereqLabels(node.prerequisites).map((label, i) => (
                          <span key={i} className="tree-configurator__prereq-tag" title={label}>
                            {label}
                          </span>
                        ))
                      )}
                    </div>
                  </td>

                  <td className="tree-configurator__cell">
                    <button
                      className="tree-configurator__delete-btn"
                      onClick={() => deleteNode(node.id)}
                      aria-label={`Delete ${node.label}`}
                    >
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <polyline points="3,3 4,12 10,12 11,3" />
                        <line x1="1.5" y1="3" x2="12.5" y2="3" />
                        <line x1="5.5" y1="3" x2="5.5" y2="1.5" />
                        <line x1="8.5" y1="3" x2="8.5" y2="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="tree-configurator__footer">
        <span className="tree-configurator__node-count">
          {nodes.length} node{nodes.length !== 1 ? 's' : ''}
        </span>
        <Button variant="primary" size="md" onClick={handleSave}>
          Save &amp; Open Tree
        </Button>
      </div>
    </div>
  );
}
