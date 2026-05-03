import type { PracticeSessionRecord } from '../../store/playerStore';
import './SessionHeatmap.css';

interface SessionHeatmapProps {
  sessions: PracticeSessionRecord[];
}

const WEEKS = 12;
const DAYS = 7;

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function xpColor(xp: number): string {
  if (xp === 0) return 'var(--heatmap-empty)';
  if (xp < 100) return 'var(--heatmap-low)';
  if (xp < 300) return 'var(--heatmap-mid)';
  if (xp < 600) return 'var(--heatmap-high)';
  return 'var(--heatmap-max)';
}

function formatTooltip(date: string, xp: number, nodes: string[]): string {
  if (xp === 0) return date;
  return `${date} · +${xp} XP · ${nodes.length} node${nodes.length !== 1 ? 's' : ''}`;
}

export function SessionHeatmap({ sessions }: SessionHeatmapProps) {
  // Build a map of date → aggregate XP + nodes
  const byDate = new Map<string, { xp: number; nodes: string[] }>();
  for (const s of sessions) {
    const day = s.date.slice(0, 10);
    const existing = byDate.get(day) ?? { xp: 0, nodes: [] };
    byDate.set(day, {
      xp: existing.xp + s.xpEarned,
      nodes: [...new Set([...existing.nodes, ...s.nodesWorked])],
    });
  }

  // Build grid: 12 weeks × 7 days, ending today
  const today = new Date();
  // Align to Monday of the current week
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - today.getDay()));

  const cells: Array<{ date: string; xp: number; nodes: string[] }> = [];
  for (let w = WEEKS - 1; w >= 0; w--) {
    for (let d = 0; d < DAYS; d++) {
      const cell = new Date(endDate);
      cell.setDate(endDate.getDate() - w * 7 - (DAYS - 1 - d));
      const dateStr = isoDate(cell);
      const data = byDate.get(dateStr) ?? { xp: 0, nodes: [] };
      cells.push({ date: dateStr, ...data });
    }
  }

  const totalXp = sessions.reduce((s, r) => s + r.xpEarned, 0);
  const activeDays = byDate.size;

  return (
    <div className="session-heatmap">
      <div className="session-heatmap__stats">
        <span className="session-heatmap__stat">+{totalXp} XP in 12 weeks</span>
        <span className="session-heatmap__stat">{activeDays} active day{activeDays !== 1 ? 's' : ''}</span>
      </div>
      <div className="session-heatmap__grid">
        {cells.map((cell) => (
          <div
            key={cell.date}
            className="session-heatmap__cell"
            style={{ background: xpColor(cell.xp) }}
            title={formatTooltip(cell.date, cell.xp, cell.nodes)}
          />
        ))}
      </div>
    </div>
  );
}
