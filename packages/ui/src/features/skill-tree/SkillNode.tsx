import type { SkillNode as SkillNodeType, NodeStatus, BranchType } from '@guitar-st/core';
import './SkillNode.css';

const BRANCH_COLORS: Partial<Record<BranchType, string>> = {
  'technique':          '#f87171',
  'rhythm-timing':      '#fb923c',
  'fretboard-theory':   '#facc15',
  'harmony-chords':     '#4ade80',
  'lead-improvisation': '#60a5fa',
  'music-theory':       '#c084fc',
  'ear-training':       '#f472b6',
};

interface SkillNodeProps {
  node: SkillNodeType;
  status: NodeStatus;
  isSelected: boolean;
  onClick: () => void;
  dimmed?: boolean;
  isChild?: boolean;
  childrenCompleted?: number;
}

function LockIcon() {
  return (
    <svg className="skill-node__lock-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="9" width="12" height="9" rx="2" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" />
    </svg>
  );
}

export function SkillNode({ node, status, isSelected, onClick, dimmed = false, isChild = false, childrenCompleted }: SkillNodeProps) {
  const pos = node.position ?? { x: 0, y: 0 };
  const isLocked = status === 'locked';
  const isParent = !!node.childNodeIds?.length;
  const branchColor = node.branch ? (BRANCH_COLORS[node.branch] ?? 'var(--color-accent-gold-deep)') : 'var(--color-accent-gold-deep)';
  const childrenTotal = node.childNodeIds?.length ?? 0;

  const classNames = [
    'skill-node',
    `skill-node--${status}`,
    isSelected ? 'skill-node--selected' : '',
    dimmed ? 'skill-node--dimmed' : '',
    isParent ? 'skill-node--parent' : '',
    isChild ? 'skill-node--child' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{ left: pos.x, top: pos.y, '--branch-color': branchColor } as React.CSSProperties}
      onClick={isLocked ? undefined : onClick}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={(e) => { if (!isLocked && (e.key === 'Enter' || e.key === ' ')) onClick(); }}
    >
      <div className="skill-node__accent" />

      <div className="skill-node__header">
        <span className="skill-node__label">{node.label}</span>
        <span className="skill-node__tier">{node.tier}</span>
      </div>

      <div className="skill-node__footer">
        {node.branch && (
          <span className="skill-node__branch-dot" />
        )}
        {isParent && childrenCompleted !== undefined ? (
          <span className="skill-node__children-badge">
            {childrenCompleted}/{childrenTotal}
          </span>
        ) : (
          <span className="skill-node__xp">+{node.xpReward} XP</span>
        )}
      </div>

      {isLocked && (
        <div className="skill-node__lock-overlay">
          <LockIcon />
        </div>
      )}
    </div>
  );
}
