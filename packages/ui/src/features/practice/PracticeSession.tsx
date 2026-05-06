import { useState, useEffect, useRef, useCallback } from 'react';
import type { SkillNode, SkillTree, Exercise } from '@guitar-st/core';
import { AudioInputManager, PitchDetector, Metronome } from '@guitar-st/audio-lab';
import type { PitchResult } from '@guitar-st/audio-lab';
import type { SessionConfig } from './sessionConfig';
import { DEFAULT_SESSION_CONFIG, FOCUS_XP_MULTIPLIER } from './sessionConfig';
import './PracticeSession.css';

interface PracticeSessionProps {
  node: SkillNode;
  tree: SkillTree;
  sessionConfig?: SessionConfig;
  onComplete: (earnedXp: number, accuracyScore: number) => void;
  onClose: () => void;
  onBpmGoalHit?: () => void;
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

function accuracyToStars(accuracy: number): number {
  if (accuracy >= 0.9) return 3;
  if (accuracy >= 0.7) return 2;
  return 1;
}

export function PracticeSession({ node, sessionConfig = DEFAULT_SESSION_CONFIG, onComplete, onClose, onBpmGoalHit }: PracticeSessionProps) {
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

  // BPM challenge state
  const currentExercise: Exercise | undefined = exercises[exerciseIdx];
  const hasBpmChallenge = !!(currentExercise?.bpmStart && currentExercise?.bpmGoal);
  const [currentBpm, setCurrentBpm] = useState<number>(0);
  const [bpmGoalHit, setBpmGoalHit] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
      stopMetronome();
      stopTimer();
    };
  }, [stopAudio, stopMetronome, stopTimer]);

  // Reset BPM challenge and timer when exercise changes
  useEffect(() => {
    if (phase !== 'exercise' || !currentExercise) return;

    stopMetronome();
    stopTimer();
    setBpmGoalHit(false);

    const startBpm = currentExercise.bpmStart ?? currentExercise.bpm ?? 0;
    setCurrentBpm(startBpm);

    if (startBpm > 0) {
      const m = new Metronome({ bpm: startBpm, timeSignature: '4/4', onBeat: () => {} });
      m.start();
      metronomeRef.current = m;
      setMetronomeRunning(true);
    }

    if (currentExercise.durationSeconds) {
      setTimeLeft(currentExercise.durationSeconds);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            stopTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(null);
    }
  }, [phase, exerciseIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIncreaseBpm = () => {
    if (!currentExercise?.bpmGoal) return;
    const next = Math.min(currentBpm + 5, currentExercise.bpmGoal);
    setCurrentBpm(next);
    stopMetronome();
    const m = new Metronome({ bpm: next, timeSignature: '4/4', onBeat: () => {} });
    m.start();
    metronomeRef.current = m;
    setMetronomeRunning(true);
    if (next >= currentExercise.bpmGoal && !bpmGoalHit) {
      setBpmGoalHit(true);
      onBpmGoalHit?.();
    }
  };

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
    stopTimer();

    if (exerciseIdx + 1 < exercises.length) {
      setExerciseIdx((i) => i + 1);
    } else {
      stopAudio();
      setPhase('summary');
    }
  };

  const handleFinish = () => {
    const avg = accuracies.length > 0 ? accuracies.reduce((s, a) => s + a, 0) / accuracies.length : 1;
    const earned = Math.round(node.xpReward * xpMultiplier(avg) * FOCUS_XP_MULTIPLIER[sessionConfig.focusLevel]);
    onComplete(earned, avg);
  };

  const usesAudio = currentExercise?.type === 'technique' || currentExercise?.type === 'performance';
  const usesSelfAssessment = currentExercise?.selfAssessment || (!usesAudio && currentExercise?.type !== 'ear-training');

  const pitchAccentColor = pitchResult
    ? (Math.abs(pitchResult.cents) <= 15 ? '#50c878' : Math.abs(pitchResult.cents) <= 30 ? '#f5a623' : '#e05c5c')
    : undefined;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ── Intro screen ─────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const maxXp = Math.round(node.xpReward * FOCUS_XP_MULTIPLIER[sessionConfig.focusLevel]);
    return (
      <div className="practice-session__overlay">
        <div className="practice-session__modal">
          <button className="practice-session__close" onClick={onClose}>✕</button>
          <div className="practice-session__intro">
            <p className="practice-session__kicker">Practice Session</p>
            <h2 className="practice-session__title">{node.label}</h2>
            <p className="practice-session__intro-desc">{node.content.description}</p>
            <div className="practice-session__session-summary">
              <span className="practice-session__session-pill">{sessionConfig.durationMinutes} min</span>
              <span className="practice-session__session-pill practice-session__session-pill--focus">{sessionConfig.focusLevel}</span>
              {sessionConfig.targetBpm && (
                <span className="practice-session__session-pill">Target: {sessionConfig.targetBpm} BPM</span>
              )}
            </div>
            <div className="practice-session__stats">
              <div className="practice-session__stat">
                <span className="practice-session__stat-value">{exercises.length}</span>
                <span className="practice-session__stat-label">Exercises</span>
              </div>
              <div className="practice-session__stat">
                <span className="practice-session__stat-value">+{maxXp}</span>
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
    const earned = Math.round(node.xpReward * xpMultiplier(avg) * FOCUS_XP_MULTIPLIER[sessionConfig.focusLevel]);
    const pct = Math.round(avg * 100);
    const stars = accuracyToStars(avg);
    return (
      <div className="practice-session__overlay">
        <div className="practice-session__modal">
          <div className="practice-session__summary">
            <p className="practice-session__kicker">Session Complete</p>
            <h2 className="practice-session__title">{node.label}</h2>
            <div className="practice-session__stars">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`practice-session__star ${s <= stars ? 'practice-session__star--filled' : 'practice-session__star--empty'}`}>
                  ★
                </span>
              ))}
            </div>
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
              <span className={`practice-session__type-badge practice-session__type-badge--${currentExercise.type}`}>
                {EXERCISE_TYPE_LABELS[currentExercise.type] ?? currentExercise.type}
              </span>

              {/* BPM challenge or static BPM */}
              {hasBpmChallenge ? (
                <div className="practice-session__bpm-challenge">
                  <span className={['practice-session__bpm', metronomeRunning ? 'practice-session__bpm--active' : '', bpmGoalHit ? 'practice-session__bpm--goal' : ''].filter(Boolean).join(' ')}>
                    {currentBpm} BPM
                  </span>
                  <span className="practice-session__bpm-goal-label">→ Goal: {currentExercise.bpmGoal}</span>
                  {!bpmGoalHit && currentBpm < (currentExercise.bpmGoal ?? 0) && (
                    <button className="practice-session__bpm-up" onClick={handleIncreaseBpm}>
                      +5 BPM
                    </button>
                  )}
                  {bpmGoalHit && <span className="practice-session__bpm-hit">Goal reached!</span>}
                </div>
              ) : currentExercise.bpm ? (
                <span className={['practice-session__bpm', metronomeRunning ? 'practice-session__bpm--active' : ''].filter(Boolean).join(' ')}>
                  {currentExercise.bpm} BPM
                </span>
              ) : null}

              {/* Countdown timer */}
              {timeLeft !== null && (
                <span className={['practice-session__timer', timeLeft <= 10 ? 'practice-session__timer--urgent' : ''].filter(Boolean).join(' ')}>
                  {formatTime(timeLeft)}
                </span>
              )}

              <span className="practice-session__exercise-xp">+{currentExercise.xpValue} XP</span>
            </div>

            <p className="practice-session__exercise-prompt">{currentExercise.prompt}</p>

            {/* Focus points */}
            {currentExercise.focusPoints && currentExercise.focusPoints.length > 0 && (
              <div className="practice-session__focus-panel">
                <p className="practice-session__focus-label">Focus on:</p>
                <ul className="practice-session__focus-list">
                  {currentExercise.focusPoints.map((point, i) => (
                    <li key={i} className="practice-session__focus-item">{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Audio pitch panel */}
            {usesAudio && !usesSelfAssessment && (
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

        {/* Action buttons */}
        <div className="practice-session__actions">
          {usesSelfAssessment ? (
            <div className="practice-session__self-assess">
              <p className="practice-session__self-assess-label">How did that feel?</p>
              <div className="practice-session__self-assess-buttons">
                <button className="practice-session__assess-btn practice-session__assess-btn--struggled" onClick={() => markExerciseComplete(0.5)}>
                  Struggled
                </button>
                <button className="practice-session__assess-btn practice-session__assess-btn--getting-there" onClick={() => markExerciseComplete(0.75)}>
                  Getting There
                </button>
                <button className="practice-session__assess-btn practice-session__assess-btn--nailed-it" onClick={() => markExerciseComplete(1.0)}>
                  Nailed It
                </button>
              </div>
            </div>
          ) : (
            <button className="practice-session__cta" onClick={() => markExerciseComplete(1.0)}>
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
