export type Branch =
  | 'music-theory'
  | 'fretboard-theory'
  | 'technique'
  | 'rhythm-timing'
  | 'harmony-chords'
  | 'ear-training'
  | 'lead-improv'
  | 'song';

export type NodeStatus = 'locked' | 'available' | 'in_progress' | 'learned' | 'mastered';

export interface Resource {
  kind: 'book' | 'video' | 'tab' | 'article' | 'audio' | 'other';
  title: string;
  source?: string;
  url?: string;
}

export interface SkillNode {
  id: string;
  title: string;
  branch: Branch;
  tier: 1 | 2 | 3 | 4 | 5;
  isAnchor: boolean;
  prerequisites: string[];
  description: string;
  practice: string[];
  resources: Resource[];
  estimatedHours?: number;
  position?: { x: number; y: number };
}

export interface SongNode extends SkillNode {
  branch: 'song';
  artist: string;
  requiredSkills: string[];
  keyTechniques: string[];
  videoUrl?: string;
  tabUrl?: string;
}

export function isSongNode(node: SkillNode): node is SongNode {
  return node.branch === 'song';
}

export const BRANCHES: Exclude<Branch, 'song'>[] = [
  'music-theory',
  'fretboard-theory',
  'technique',
  'rhythm-timing',
  'harmony-chords',
  'ear-training',
  'lead-improv',
];

export const BRANCH_LABELS: Record<Branch, string> = {
  'music-theory':    'Music Theory',
  'fretboard-theory':'Fretboard Logic',
  'technique':       'Technique',
  'rhythm-timing':   'Rhythm & Timing',
  'harmony-chords':  'Harmony & Chords',
  'ear-training':    'Ear Training',
  'lead-improv':     'Lead & Improv',
  'song':            'Songs',
};

// X-axis sector center for each branch in 3D world units.
// Technique and Rhythm are the foundation at center (±4).
// Branches fan outward as they unlock at higher tiers.
export const BRANCH_SECTORS: Record<Branch, number> = {
  'technique':       -4,
  'rhythm-timing':    4,
  'fretboard-theory':-8,
  'harmony-chords':   8,
  'ear-training':   -12,
  'music-theory':    12,
  'lead-improv':      0,
  'song':             0,
};

// CSS variable names for each branch
export const BRANCH_CSS: Record<Branch, { primary: string; glow: string; shadow: string }> = {
  'music-theory':    { primary: '--theory-primary',    glow: '--theory-glow',    shadow: '--theory-shadow' },
  'fretboard-theory':{ primary: '--fretboard-primary', glow: '--fretboard-glow', shadow: '--fretboard-shadow' },
  'technique':       { primary: '--technique-primary', glow: '--technique-glow', shadow: '--technique-shadow' },
  'rhythm-timing':   { primary: '--rhythm-primary',    glow: '--rhythm-glow',    shadow: '--rhythm-shadow' },
  'harmony-chords':  { primary: '--harmony-primary',   glow: '--harmony-glow',   shadow: '--harmony-shadow' },
  'ear-training':    { primary: '--ear-primary',       glow: '--ear-glow',       shadow: '--ear-shadow' },
  'lead-improv':     { primary: '--lead-primary',      glow: '--lead-glow',      shadow: '--lead-shadow' },
  'song':            { primary: '--song-primary',      glow: '--song-glow',      shadow: '--song-shadow' },
};

// Hex values mirroring the CSS variables, for use in Three.js materials
export const BRANCH_HEX: Record<Branch, { primary: string; glow: string; shadow: string }> = {
  'music-theory':    { primary: '#6FB5D8', glow: '#A8DAF2', shadow: '#2E5C7A' },
  'fretboard-theory':{ primary: '#E0A458', glow: '#F4CC8A', shadow: '#8A5A1F' },
  'technique':       { primary: '#C97B5C', glow: '#E8A586', shadow: '#6B3220' },
  'rhythm-timing':   { primary: '#C23E54', glow: '#E87088', shadow: '#5C1A2A' },
  'harmony-chords':  { primary: '#7E5AA8', glow: '#B68FDC', shadow: '#3F2A5C' },
  'ear-training':    { primary: '#B8C7D3', glow: '#E0EAF2', shadow: '#3A4754' },
  'lead-improv':     { primary: '#E6633D', glow: '#FF9670', shadow: '#6B2818' },
  'song':            { primary: '#D4AF37', glow: '#F5DC7A', shadow: '#6B5318' },
};

// Tier Y positions in 3D world units.
// Tier 1 is at the bottom (foundation), tree grows upward toward tier 5.
export const TIER_Y: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: -5,
  2: -2.5,
  3:  0,
  4:  2.5,
  5:  5,
};

export const SONG_BAND_Y = -6;
