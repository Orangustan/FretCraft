import type { Player } from "../schema/Player";

// XP threshold to reach a given level (1-indexed). Uses geometric series: 500*(1.2^(n-1)-1).
function thresholdForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.round(500 * (Math.pow(1.2, level - 1) - 1));
}

export function calculateLevel(totalXp: number): number {
  for (let level = 50; level >= 2; level--) {
    if (totalXp >= thresholdForLevel(level)) return level;
  }
  return 1;
}

export function xpToNextLevel(currentLevel: number): number {
  return thresholdForLevel(currentLevel + 1) - thresholdForLevel(currentLevel);
}

export function xpProgressInLevel(
  totalXp: number
): { current: number; required: number; percent: number } {
  const level = calculateLevel(totalXp);
  const current = totalXp - thresholdForLevel(level);
  const required = xpToNextLevel(level);
  const percent = required > 0 ? current / required : 1;
  return { current, required, percent };
}

export function addXp(
  player: Player,
  amount: number
): Pick<Player, "xpTotal" | "level"> {
  const xpTotal = player.xpTotal + amount;
  return { xpTotal, level: calculateLevel(xpTotal) };
}
