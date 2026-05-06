export type FocusLevel = 'Casual' | 'Focused' | 'Intense';
export type SessionDuration = 5 | 10 | 15 | 20 | 30;

export interface SessionConfig {
  durationMinutes: SessionDuration;
  focusLevel: FocusLevel;
  targetBpm?: number;
}

export const FOCUS_XP_MULTIPLIER: Record<FocusLevel, number> = {
  Casual: 0.75,
  Focused: 1.0,
  Intense: 1.25,
};

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  durationMinutes: 15,
  focusLevel: 'Focused',
};
