import { useState, useEffect, useRef, useCallback } from 'react';
import type { RankTest, Exercise, PlayerRank } from '@guitar-st/core';
import { Metronome } from '@guitar-st/audio-lab';
import './RankTestSession.css';

interface RankTestSessionProps {
  test: RankTest;
  onPass: (newRank: PlayerRank) => void;
  onFail: () => void;
  onClose: () => void;
}

type Phase = 'intro' | 'exercise' | 'result';

const RANK_LABELS: Record<PlayerRank, string> = {
  beginner: 'Beginner',
  novice: 'Novice',
  intermediate: 'Intermediate',
  expert: 'Expert',
  pro: 'Pro',
};

const BRANCH_LABELS: Record<string, string> = {
  technique: 'Technique',
  'rhythm-timing': 'Rhythm & Timing',
  'fretboard-theory': 'Fretboard Theory',
  'harmony-chords': 'Harmony & Chords',
  'lead-improvisation': 'Lead & Improv',
  'music-theory': 'Music Theory',
  'ear-training': 'Ear Training',
};

const BRANCH_COLORS: Record<string, string> = {
  technique: '#f87171',
  'rhythm-timing': '#fb923c',
  'fretboard-theory': '#facc15',
  'harmony-chords': '#4ade80',
  'lead-improvisation': '#60a5fa',
  'music-theory': '#c084fc',
  'ear-training': '#f472b6',
};

function formatTime(s: number): string {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function RankTestSession({ test, onPass, onFail, onClose }: RankTestSessionProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [bpmGoalHit, setBpmGoalHit] = useState(false);

  const currentExercise: Exercise | undefined = test.exercises[exerciseIdx];
  const hasBpmChallenge = !!(currentExercise?.bpmStart && currentExercise?.bpmGoal);
  const [currentBpm, setCurrentBpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const metronomeRef = useRef<Metronome | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopMetronome = useCallback(() => {
    metronomeRef.current?.stop();
    metronomeRef.current = null;
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopMetronome();
      stopTimer();
    };
  }, [stopMetronome, stopTimer]);

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
    }

    if (currentExercise.durationSeconds) {
      setTimeLeft(currentExercise.durationSeconds);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) { stopTimer(); return 0; }
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
    if (next >= currentExercise.bpmGoal && !bpmGoalHit) setBpmGoalHit(true);
  };

  const markComplete = (score: number) => {
    const next = [...scores, score];
    setScores(next);
    stopMetronome();
    stopTimer();

    if (exerciseIdx + 1 < test.exercises.length) {
      setExerciseIdx((i) => i + 1);
    } else {
      setPhase('result');
    }
  };

  const overallScore = scores.length > 0 ? scores.reduce((s, x) => s + x, 0) / scores.length : 0;
  const passed = overallScore >= test.passingScore;

  // ── Intro ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="rank-test__overlay">
        <div className="rank-test__modal">
          <button className="rank-test__close" onClick={onClose}>✕</button>
          <div className="rank-test__intro">
            <p className="rank-test__kicker">Rank Gate Test</p>
            <h2 className="rank-test__title">{test.label}</h2>
            {test.songTitle && (
              <p className="rank-test__song">{test.songTitle}</p>
            )}
            <p className="rank-test__description">{test.description}</p>

            <div className="rank-test__rank-badge">
              <span className="rank-test__rank rank-test__rank--from">{RANK_LABELS[test.fromRank]}</span>
              <span className="rank-test__rank-arrow">→</span>
              <span className="rank-test__rank rank-test__rank--to">{RANK_LABELS[test.toRank]}</span>
            </div>

            <div className="rank-test__techniques">
              <p className="rank-test__techniques-label">Techniques tested:</p>
              <div className="rank-test__technique-tags">
                {test.techniques.map((t) => (
                  <span
                    key={t.name}
                    className="rank-test__technique-tag"
                    style={{ '--branch-color': BRANCH_COLORS[t.branch] ?? '#888' } as React.CSSProperties}
                  >
                    <span className="rank-test__technique-branch">{BRANCH_LABELS[t.branch] ?? t.branch}</span>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rank-test__meta">
              <span>{test.exercises.length} exercises</span>
              <span>Pass: {Math.round(test.passingScore * 100)}%+</span>
            </div>

            <button className="rank-test__cta" onClick={() => setPhase('exercise')}>
              Begin Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Result ───────────────────────────────────────────────────────────────
  if (phase === 'result') {
    const pct = Math.round(overallScore * 100);
    return (
      <div className="rank-test__overlay">
        <div className="rank-test__modal">
          <div className="rank-test__result">
            <p className="rank-test__kicker">{passed ? 'Test Passed!' : 'Not Yet'}</p>
            <div className={`rank-test__result-icon ${passed ? 'rank-test__result-icon--pass' : 'rank-test__result-icon--fail'}`}>
              {passed ? '🏆' : '🎯'}
            </div>
            <h2 className="rank-test__title">{passed ? `You're now ${RANK_LABELS[test.toRank]}!` : 'Keep Practicing'}</h2>

            <div className="rank-test__score-ring" style={{ '--score': `${pct}%`, '--pass': `${Math.round(test.passingScore * 100)}%` } as React.CSSProperties}>
              <span className="rank-test__score-pct">{pct}%</span>
              <span className="rank-test__score-label">Score</span>
            </div>

            {passed ? (
              <>
                <p className="rank-test__result-desc">
                  You've unlocked <strong>{RANK_LABELS[test.toRank]}</strong> tier nodes in this archetype.
                  {bpmGoalHit && ' Speed Demon achievement earned!'}
                </p>
                <button className="rank-test__cta" onClick={() => onPass(test.toRank)}>
                  Claim Rank
                </button>
              </>
            ) : (
              <>
                <p className="rank-test__result-desc">
                  You scored {pct}% but need {Math.round(test.passingScore * 100)}% to advance.
                  Review the focus points and try again when you're ready.
                </p>
                <div className="rank-test__result-actions">
                  <button className="rank-test__cta-secondary" onClick={onClose}>
                    Keep Practicing
                  </button>
                  <button className="rank-test__cta" onClick={() => {
                    setPhase('exercise');
                    setExerciseIdx(0);
                    setScores([]);
                  }}>
                    Try Again
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Exercise ─────────────────────────────────────────────────────────────
  return (
    <div className="rank-test__overlay">
      <div className="rank-test__modal">
        <button className="rank-test__close" onClick={onClose}>✕</button>

        <div className="rank-test__progress">
          {test.exercises.map((_, i) => (
            <div
              key={i}
              className={[
                'rank-test__pip',
                i < exerciseIdx ? 'rank-test__pip--done' : '',
                i === exerciseIdx ? 'rank-test__pip--active' : '',
              ].filter(Boolean).join(' ')}
            />
          ))}
        </div>

        <p className="rank-test__step">Exercise {exerciseIdx + 1} of {test.exercises.length}</p>

        {currentExercise && (
          <div className="rank-test__exercise">
            <div className="rank-test__exercise-header">
              {hasBpmChallenge ? (
                <div className="rank-test__bpm-challenge">
                  <span className={['rank-test__bpm', bpmGoalHit ? 'rank-test__bpm--goal' : ''].filter(Boolean).join(' ')}>
                    {currentBpm} BPM
                  </span>
                  <span className="rank-test__bpm-goal-label">→ Goal: {currentExercise.bpmGoal}</span>
                  {!bpmGoalHit && currentBpm < (currentExercise.bpmGoal ?? 0) && (
                    <button className="rank-test__bpm-up" onClick={handleIncreaseBpm}>+5 BPM</button>
                  )}
                  {bpmGoalHit && <span className="rank-test__bpm-hit">Goal reached!</span>}
                </div>
              ) : currentExercise.bpm ? (
                <span className="rank-test__bpm rank-test__bpm--active">{currentExercise.bpm} BPM</span>
              ) : null}

              {timeLeft !== null && (
                <span className={['rank-test__timer', timeLeft <= 10 ? 'rank-test__timer--urgent' : ''].filter(Boolean).join(' ')}>
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>

            <p className="rank-test__exercise-prompt">{currentExercise.prompt}</p>

            {currentExercise.focusPoints && currentExercise.focusPoints.length > 0 && (
              <div className="rank-test__focus-panel">
                <p className="rank-test__focus-label">Focus on:</p>
                <ul className="rank-test__focus-list">
                  {currentExercise.focusPoints.map((point, i) => (
                    <li key={i} className="rank-test__focus-item">{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="rank-test__self-assess">
          <p className="rank-test__self-assess-label">How did that go?</p>
          <div className="rank-test__self-assess-buttons">
            <button className="rank-test__assess-btn rank-test__assess-btn--struggled" onClick={() => markComplete(0.5)}>
              Struggled
            </button>
            <button className="rank-test__assess-btn rank-test__assess-btn--getting-there" onClick={() => markComplete(0.75)}>
              Getting There
            </button>
            <button className="rank-test__assess-btn rank-test__assess-btn--nailed-it" onClick={() => markComplete(1.0)}>
              Nailed It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
