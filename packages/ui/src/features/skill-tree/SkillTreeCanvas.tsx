import type { SkillTree, NodeStatus } from '@guitar-st/core';
import { SkillNode } from './SkillNode';
import './SkillTreeCanvas.css';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 80;

function nodeCenter(x: number, y: number) {
  return { cx: x + NODE_WIDTH / 2, cy: y + NODE_HEIGHT / 2 };
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
          {tree.nodes.map((node) =>
            node.prerequisites.map((prereqId) => {
              const prereq = nodeMap.get(prereqId);
              if (!prereq || !node.position || !prereq.position) return null;

              const from = nodeCenter(prereq.position.x, prereq.position.y);
              const to = nodeCenter(node.position.x, node.position.y);

              const prereqStatus = nodeStatuses[prereqId] ?? 'locked';
              const nodeStatus = nodeStatuses[node.id] ?? 'locked';
              const isUnlocked = prereqStatus !== 'locked' && nodeStatus !== 'locked';

              return (
                <line
                  key={`${prereqId}-${node.id}`}
                  x1={from.cx}
                  y1={from.cy}
                  x2={to.cx}
                  y2={to.cy}
                  stroke={isUnlocked ? 'rgba(245, 166, 35, 0.55)' : '#3a3a48'}
                  strokeWidth={isUnlocked ? 2 : 1.5}
                  strokeDasharray={isUnlocked ? undefined : '4 4'}
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
