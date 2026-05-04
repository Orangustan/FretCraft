import type { SkillTree, NodeStatus, BranchType } from '@guitar-st/core';
import { SkillNode } from './SkillNode';
import './SkillTreeCanvas.css';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 80;
const CHILD_NODE_WIDTH = 140;
const CHILD_NODE_HEIGHT = 72;

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
  activeBranch?: BranchType | 'all';
}

export function SkillTreeCanvas({ tree, nodeStatuses, selectedNodeId, onNodeClick, activeBranch = 'all' }: SkillTreeCanvasProps) {
  const nodeMap = new Map(tree.nodes.map((n) => [n.id, n]));

  // Separate child nodes from main tree nodes
  const allChildIds = new Set(tree.nodes.flatMap((n) => n.childNodeIds ?? []));
  const mainNodes = tree.nodes.filter((n) => !allChildIds.has(n.id));
  const childNodes = tree.nodes.filter((n) => n.parentNodeId !== undefined);

  // Child nodes are only visible when their parent is not locked
  const visibleChildIds = new Set(
    childNodes
      .filter((n) => {
        const parentStatus = n.parentNodeId ? (nodeStatuses[n.parentNodeId] ?? 'locked') : 'locked';
        return parentStatus !== 'locked';
      })
      .map((n) => n.id)
  );

  // Compute completed child count per parent node
  const childrenCompletedByParent: Record<string, number> = {};
  for (const node of mainNodes) {
    if (node.childNodeIds?.length) {
      childrenCompletedByParent[node.id] = node.childNodeIds.filter(
        (childId) => nodeStatuses[childId] === 'completed'
      ).length;
    }
  }

  function renderEdge(key: string, from: { cx: number; cy: number }, to: { cx: number; cy: number }, isUnlocked: boolean, isCluster = false) {
    const d = elbowPath(from, to);
    if (isUnlocked) {
      const strokeColor = isCluster ? 'rgba(74, 222, 128, 0.8)' : 'rgba(200, 118, 42, 0.85)';
      const glowColor = isCluster ? 'rgba(74, 222, 128, 0.2)' : 'rgba(200, 118, 42, 0.25)';
      return (
        <g key={key}>
          <path d={d} fill="none" stroke={glowColor} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" filter="url(#edge-glow)" />
          <path d={d} fill="none" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    }
    return (
      <path
        key={key}
        d={d}
        fill="none"
        stroke={isCluster ? 'rgba(74, 222, 128, 0.2)' : 'rgba(61, 45, 28, 0.6)'}
        strokeWidth={1.5}
        strokeDasharray="4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }

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

          {/* Main tree prerequisite edges */}
          {mainNodes.map((node) =>
            node.prerequisites.map((prereqId) => {
              const prereq = nodeMap.get(prereqId);
              if (!prereq || !node.position || !prereq.position) return null;
              const isUnlocked = (nodeStatuses[prereqId] ?? 'locked') !== 'locked' && (nodeStatuses[node.id] ?? 'locked') !== 'locked';
              return renderEdge(
                `${prereqId}-${node.id}`,
                { cx: prereq.position.x + NODE_WIDTH / 2, cy: prereq.position.y },
                { cx: node.position.x + NODE_WIDTH / 2, cy: node.position.y + NODE_HEIGHT },
                isUnlocked
              );
            })
          )}

          {/* Parent → root child edges (children with no intra-cluster prerequisites) */}
          {mainNodes.map((parent) =>
            (parent.childNodeIds ?? [])
              .filter((childId) => {
                const child = nodeMap.get(childId);
                return child && child.prerequisites.length === 0 && visibleChildIds.has(childId);
              })
              .map((childId) => {
                const child = nodeMap.get(childId);
                if (!parent.position || !child?.position) return null;
                const isUnlocked = (nodeStatuses[parent.id] ?? 'locked') !== 'locked';
                return renderEdge(
                  `parent-${parent.id}-${childId}`,
                  { cx: parent.position.x + NODE_WIDTH / 2, cy: parent.position.y },
                  { cx: child.position.x + CHILD_NODE_WIDTH / 2, cy: child.position.y + CHILD_NODE_HEIGHT },
                  isUnlocked,
                  true
                );
              })
          )}

          {/* Intra-cluster prerequisite edges */}
          {childNodes
            .filter((node) => visibleChildIds.has(node.id))
            .map((node) =>
              node.prerequisites.map((prereqId) => {
                const prereq = nodeMap.get(prereqId);
                if (!prereq || !node.position || !prereq.position) return null;
                const prereqVisible = visibleChildIds.has(prereqId);
                if (!prereqVisible) return null;
                const isUnlocked = (nodeStatuses[prereqId] ?? 'locked') !== 'locked' && (nodeStatuses[node.id] ?? 'locked') !== 'locked';
                return renderEdge(
                  `cluster-${prereqId}-${node.id}`,
                  { cx: prereq.position.x + CHILD_NODE_WIDTH / 2, cy: prereq.position.y + CHILD_NODE_HEIGHT },
                  { cx: node.position.x + CHILD_NODE_WIDTH / 2, cy: node.position.y },
                  isUnlocked,
                  true
                );
              })
            )}
        </svg>

        {/* Main tree nodes */}
        {mainNodes.map((node) => {
          const dimmed = activeBranch !== 'all' && node.branch !== activeBranch;
          return (
            <SkillNode
              key={node.id}
              node={node}
              status={nodeStatuses[node.id] ?? 'locked'}
              isSelected={selectedNodeId === node.id}
              onClick={() => onNodeClick(node.id)}
              dimmed={dimmed}
              childrenCompleted={childrenCompletedByParent[node.id]}
            />
          );
        })}

        {/* Child cluster nodes — only rendered when parent is unlocked */}
        {childNodes
          .filter((node) => visibleChildIds.has(node.id))
          .map((node) => {
            const dimmed = activeBranch !== 'all' && node.branch !== activeBranch;
            return (
              <SkillNode
                key={node.id}
                node={node}
                status={nodeStatuses[node.id] ?? 'locked'}
                isSelected={selectedNodeId === node.id}
                onClick={() => onNodeClick(node.id)}
                dimmed={dimmed}
                isChild
              />
            );
          })}
      </div>
    </div>
  );
}
