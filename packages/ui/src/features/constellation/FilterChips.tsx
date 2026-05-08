import { BRANCHES, BRANCH_LABELS, BRANCH_HEX, type Branch, type NodeStatus } from '../../data/types';
import { useUIStore } from '../../store/uiStore';
import './FilterChips.css';

const STATUS_OPTIONS: { value: NodeStatus; label: string }[] = [
  { value: 'available',   label: 'Available' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'learned',     label: 'Learned' },
  { value: 'mastered',    label: 'Mastered' },
];

const TIER_OPTIONS = [1, 2, 3, 4, 5] as const;

export function FilterChips() {
  const { filterBranch, filterStatus, filterTier, setFilterBranch, setFilterStatus, setFilterTier, clearFilters } = useUIStore();

  const hasFilters = filterBranch !== null || filterStatus !== null || filterTier !== null;

  return (
    <div className="filter-chips">
      <div className="filter-chips__row">
        {BRANCHES.map(branch => {
          const active = filterBranch === branch;
          const color = BRANCH_HEX[branch].primary;
          return (
            <button
              key={branch}
              className={`filter-chip filter-chip--branch ${active ? 'filter-chip--active' : ''}`}
              style={{ '--chip-color': color } as React.CSSProperties}
              onClick={() => setFilterBranch(active ? null : branch)}
              title={BRANCH_LABELS[branch]}
            >
              <span className="filter-chip__dot" />
              <span className="filter-chip__label">{BRANCH_LABELS[branch]}</span>
            </button>
          );
        })}
      </div>

      <div className="filter-chips__row">
        {STATUS_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`filter-chip ${filterStatus === opt.value ? 'filter-chip--active' : ''}`}
            onClick={() => setFilterStatus(filterStatus === opt.value ? null : opt.value)}
          >
            {opt.label}
          </button>
        ))}

        {TIER_OPTIONS.map(tier => (
          <button
            key={tier}
            className={`filter-chip ${filterTier === tier ? 'filter-chip--active' : ''}`}
            onClick={() => setFilterTier(filterTier === tier ? null : tier)}
          >
            T{tier}
          </button>
        ))}

        {hasFilters && (
          <button className="filter-chip filter-chip--clear" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
