import type { SkillTree, NodeStatus } from '@guitar-st/core';
import { SkillNode } from './SkillNode';
import './SkillTreeCanvas.css';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 80;

function elbowPath(
  from: { cx: number; cy: number },
  to: { cx: number; cy: number }
): string {
  if (Math.abs(from.cx - to.cx) < 2) {
    return `M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`;
  }
  const midY = (from.cy + to.cy) / 2;
  return `M ${from.cx} ${from.cy} L ${from.cx} ${midY} L ${to.cx} ${midY} L ${to.cx} ${to.cy}`;
}

interface SkillTreeCanvasProps {
  tree: SkillTree;
  nodeStatuses: Record<string, NodeStatus>;
  selectedNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
}

export function SkillTreeCanvas({ tree, nodeStatuses, selectedNodeId, onNodeClick }: SkillTreeCanvasProps) {
  const nodeMap = new Map(tree.nodes.map((n) => [n.id, n]));

  return (
    <div className="skill-tree-canvas-wrapper">
      <div className="skill-tree-canvas">
        <svg className="skill-tree-canvas__svg">
          <defs>
            <filter id="edge-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {tree.nodes.map((node) =>
            node.prerequisites.map((prereqId) => {
              const prereq = nodeMap.get(prereqId);
              if (!prereq || !node.position || !prereq.position) return null;

              const from = {
                cx: prereq.position.x + NODE_WIDTH / 2,
                cy: prereq.position.y + NODE_HEIGHT,
              };
              const to = {
                cx: node.position.x + NODE_WIDTH / 2,
                cy: node.position.y,
              };

              const prereqStatus = nodeStatuses[prereqId] ?? 'locked';
              const nodeStatus = nodeStatuses[node.id] ?? 'locked';
              const isUnlocked = prereqStatus !== 'locked' && nodeStatus !== 'locked';
              const d = elbowPath(from, to);

              if (isUnlocked) {
                return (
                  <g key={`${prereqId}-${node.id}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(200, 118, 42, 0.25)"
                      strokeWidth={6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#edge-glow)"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(200, 118, 42, 0.85)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                );
              }

              return (
                <path
                  key={`${prereqId}-${node.id}`}
                  d={d}
                  fill="none"
                  stroke="rgba(61, 45, 28, 0.6)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })
          )}
        </svg>

        {tree.nodes.map((node) => (
          <SkillNode
            key={node.id}
            node={node}
            status={nodeStatuses[node.id] ?? 'locked'}
            isSelected={selectedNodeId === node.id}
            onClick={() => onNodeClick(node.id)}
          />
        ))}
      </div>
    </div>
  );
}
