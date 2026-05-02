import type { SkillNode as SkillNodeType, NodeStatus } from '@guitar-st/core';
import './SkillNode.css';

interface SkillNodeProps {
  node: SkillNodeType;
  status: NodeStatus;
  isSelected: boolean;
  onClick: () => void;
}

function LockIcon() {
  return (
    <svg className="skill-node__lock-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="9" width="12" height="9" rx="2" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" />
    </svg>
  );
}

export function SkillNode({ node, status, isSelected, onClick }: SkillNodeProps) {
  const pos = node.position ?? { x: 0, y: 0 };
  const isLocked = status === 'locked';

  const classNames = [
    'skill-node',
    `skill-node--${status}`,
    isSelected ? 'skill-node--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{ left: pos.x, top: pos.y }}
      onClick={isLocked ? undefined : onClick}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={(e) => { if (!isLocked && (e.key === 'Enter' || e.key === ' ')) onClick(); }}
    >
      <div className="skill-node__header">
        <span className="skill-node__label">{node.label}</span>
        <span className="skill-node__tier">{node.tier}</span>
      </div>

      <div className="skill-node__footer">
        <span className="skill-node__xp">+{node.xpReward} XP</span>
      </div>

      {isLocked && (
        <div className="skill-node__lock-overlay">
          <LockIcon />
        </div>
      )}
    </div>
  );
}
