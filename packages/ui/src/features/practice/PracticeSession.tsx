import { useState, useEffect, useRef, useCallback } from 'react';
import type { SkillNode, SkillTree, Exercise } from '@guitar-st/core';
import { AudioInputManager, PitchDetector, Metronome } from '@guitar-st/audio-lab';
import type { PitchResult } from '@guitar-st/audio-lab';
import './PracticeSession.css';

interface PracticeSessionProps {
  node: SkillNode;
  tree: SkillTree;
  onComplete: (earnedXp: number, accuracyScore: number) => void;
  onClose: () => void;
}

type Phase = 'intro' | 'exercise' | 'summary';

const EXERCISE_TYPE_LABELS: Record<string, string> = {
  technique: 'Technique',
  theory: 'Theory',
  'ear-training': 'Ear Training',
  performance: 'Performance',
};

function xpMultiplier(accuracy: number): number {
  if (accuracy >= 0.9) return 1.0;
  if (accuracy >= 0.7) return 0.75;
  if (accuracy >= 0.5) return 0.5;
  return 0.25;
}

export function PracticeSession({ node, onComplete, onClose }: PracticeSessionProps) {
  const exercises = node.exercises ?? [];
  const [phase, setPhase] = useState<Phase>('intro');
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [accuracies, setAccuracies] = useState<number[]>([]);

  // Audio / pitch state
  const [audioConnected, setAudioConnected] = useState(false);
  const [pitchResult, setPitchResult] = useState<PitchResult | null>(null);
  const [metronomeRunning, setMetronomeRunning] = useState(false);
  const audioMgrRef = useRef(new AudioInputManager());
  const pitchDetRef = useRef<PitchDetector | null>(null);
  const metronomeRef = useRef<Metronome | null>(null);

  const currentExercise: Exercise | undefined = exercises[exerciseIdx];

  const stopAudio = useCallback(() => {
    pitchDetRef.current?.stop();
    pitchDetRef.current = null;
    audioMgrRef.current.disconnect();
    setAudioConnected(false);
    setPitchResult(null);
  }, []);

  const stopMetronome = useCallback(() => {
    metronomeRef.current?.stop();
    metronomeRef.current = null;
    setMetronomeRunning(false);
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
      stopMetronome();
    };
  }, [stopAudio, stopMetronome]);

  // Auto-start metronome when entering an exercise that has BPM
  useEffect(() => {
    if (phase !== 'exercise' || !currentExercise) return;
    stopMetronome();
    if (currentExercise.bpm) {
      const m = new Metronome({ bpm: currentExercise.bpm, timeSignature: '4/4', onBeat: () => {} });
      m.start();
      metronomeRef.current = m;
      setMetronomeRunning(true);
    }
  }, [phase, exerciseIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConnectAudio = async () => {
    try {
      const saved = audioMgrRef.current.getSavedDeviceId();
      const ctx = await audioMgrRef.current.connect(saved ?? undefined);
      const src = audioMgrRef.current.getSourceNode()!;
      pitchDetRef.current = new PitchDetector(src, ctx, (r) => setPitchResult(r));
      pitchDetRef.current.start();
      setAudioConnected(true);
    } catch {
      // Permission denied or no device
    }
  };

  const markExerciseComplete = (accuracy: number) => {
    const next = [...accuracies, accuracy];
    setAccuracies(next);
    stopMetronome();

    if (exerciseIdx + 1 < exercises.length) {
      setExerciseIdx((i) => i + 1);
    } else {
      stopAudio();
      setPhase('summary');
    }
  };

  const handleFinish = () => {
    const avg = accuracies.length > 0 ? accuracies.reduce((s, a) => s + a, 0) / accuracies.length : 1;
    const totalMaxXp = exercises.reduce((s, ex) => s + ex.xpValue, 0) + (node.xpReward - exercises.reduce((s, ex) => s + ex.xpValue, 0));
    const earned = Math.round(totalMaxXp * xpMultiplier(avg));
    onComplete(earned, avg);
  };

  const usesAudio = currentExercise?.type === 'technique' || currentExercise?.type === 'performance';

  const pitchAccentColor = pitchResult
    ? (Math.abs(pitchResult.cents) <= 15 ? '#50c878' : Math.abs(pitchResult.cents) <= 30 ? '#f5a623' : '#e05c5c')
    : undefined;

  // ── Intro screen ─────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="practice-session__overlay">
        <div className="practice-session__modal">
          <button className="practice-session__close" onClick={onClose}>✕</button>
          <div className="practice-session__intro">
            <p className="practice-session__kicker">Practice Session</p>
            <h2 className="practice-session__title">{node.label}</h2>
            <p className="practice-session__intro-desc">{node.content.description}</p>
            <div className="practice-session__stats">
              <div className="practice-session__stat">
                <span className="practice-session__stat-value">{exercises.length}</span>
                <span className="practice-session__stat-label">Exercises</span>
              </div>
              <div className="practice-session__stat">
                <span className="practice-session__stat-value">+{node.xpReward}</span>
                <span className="practice-session__stat-label">XP Max</span>
              </div>
            </div>
            <button className="practice-session__cta" onClick={() => setPhase('exercise')}>
              Start Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Summary screen ────────────────────────────────────────────────────────
  if (phase === 'summary') {
    const avg = accuracies.length > 0 ? accuracies.reduce((s, a) => s + a, 0) / accuracies.length : 1;
    const earned = Math.round(node.xpReward * xpMultiplier(avg));
    const pct = Math.round(avg * 100);
    return (
      <div className="practice-session__overlay">
        <div className="practice-session__modal">
          <div className="practice-session__summary">
            <p className="practice-session__kicker">Session Complete</p>
            <h2 className="practice-session__title">{node.label}</h2>
            <div className="practice-session__accuracy-ring" style={{ '--acc': `${pct}%` } as React.CSSProperties}>
              <span className="practice-session__accuracy-pct">{pct}%</span>
              <span className="practice-session__accuracy-label">Accuracy</span>
            </div>
            <p className="practice-session__xp-earned">+{earned} XP earned</p>
            {pct < 70 && (
              <p className="practice-session__retry-hint">Practice more to earn full XP next time</p>
            )}
            <button className="practice-session__cta" onClick={handleFinish}>
              Collect XP
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Exercise screen ───────────────────────────────────────────────────────
  return (
    <div className="practice-session__overlay">
      <div className="practice-session__modal">
        <button className="practice-session__close" onClick={onClose}>✕</button>

        <div className="practice-session__progress">
          {exercises.map((_, i) => (
            <div
              key={i}
              className={[
                'practice-session__pip',
                i < exerciseIdx ? 'practice-session__pip--done' : '',
                i === exerciseIdx ? 'practice-session__pip--active' : '',
              ].filter(Boolean).join(' ')}
            />
          ))}
        </div>

        <p className="practice-session__step">
          Exercise {exerciseIdx + 1} of {exercises.length}
        </p>

        {currentExercise && (
          <div className="practice-session__exercise">
            <div className="practice-session__exercise-header">
              <span className="practice-session__type-badge practice-session__type-badge--{currentExercise.type}">
                {EXERCISE_TYPE_LABELS[currentExercise.type] ?? currentExercise.type}
              </span>
              {currentExercise.bpm && (
                <span className={['practice-session__bpm', metronomeRunning ? 'practice-session__bpm--active' : ''].filter(Boolean).join(' ')}>
                  {currentExercise.bpm} BPM
                </span>
              )}
              <span className="practice-session__exercise-xp">+{currentExercise.xpValue} XP</span>
            </div>

            <p className="practice-session__exercise-prompt">{currentExercise.prompt}</p>

            {usesAudio && (
              <div className="practice-session__audio-panel">
                {!audioConnected ? (
                  <button className="practice-session__audio-btn" onClick={handleConnectAudio}>
                    Connect Microphone for Pitch Feedback
                  </button>
                ) : (
                  <div className="practice-session__pitch-display">
                    {pitchResult ? (
                      <>
                        <span className="practice-session__note" style={{ color: pitchAccentColor }}>
                          {pitchResult.note}
                        </span>
                        <span className="practice-session__cents" style={{ color: pitchAccentColor }}>
                          {pitchResult.cents > 0 ? `+${pitchResult.cents}` : pitchResult.cents}¢
                        </span>
                        <div className="practice-session__tuning-bar">
                          <div
                            className="practice-session__tuning-needle"
                            style={{ left: `${50 + Math.max(-50, Math.min(50, pitchResult.cents))}%`, background: pitchAccentColor }}
                          />
                        </div>
                      </>
                    ) : (
                      <span className="practice-session__no-signal">Listening...</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="practice-session__actions">
          <button className="practice-session__cta" onClick={() => markExerciseComplete(1.0)}>
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
}
