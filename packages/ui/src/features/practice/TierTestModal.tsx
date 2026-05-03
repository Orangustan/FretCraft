import { useState, useRef, useCallback } from 'react';
import type { TierTest, TierTestResult } from '@guitar-st/core';
import { evaluateTierTest } from '@guitar-st/core';
import { AudioInputManager, PitchDetector } from '@guitar-st/audio-lab';
import './TierTestModal.css';

interface TierTestModalProps {
  test: TierTest;
  onPass: (result: TierTestResult) => void;
  onFail: (result: TierTestResult) => void;
  onClose: () => void;
}

type Step = 'intro' | 'knowledge' | 'performance' | 'result';

export function TierTestModal({ test, onPass, onFail, onClose }: TierTestModalProps) {
  const [step, setStep] = useState<Step>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [result, setResult] = useState<TierTestResult | null>(null);
  const [audioConnected, setAudioConnected] = useState(false);
  const [measuring, setMeasuring] = useState(false);
  const audioMgrRef = useRef(new AudioInputManager());
  const pitchDetRef = useRef<PitchDetector | null>(null);

  const currentQ = test.questions[qIndex];
  const isLastQ = qIndex === test.questions.length - 1;
  const hasPerformance = !!test.performanceExercise;

  const finishTest = useCallback((knowledgeAnswers: number[], perfScore: number) => {
    const r = evaluateTierTest(knowledgeAnswers, perfScore, test);
    setResult(r);
    setStep('result');
    if (r.passed) onPass(r);
    else onFail(r);
  }, [test, onPass, onFail]);

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    const next = [...answers, selectedOption ?? 0];
    setSelectedOption(null);
    setShowExplanation(false);

    if (isLastQ) {
      if (hasPerformance) {
        setAnswers(next);
        setStep('performance');
      } else {
        finishTest(next, 0);
      }
    } else {
      setAnswers(next);
      setQIndex((i) => i + 1);
    }
  };

  const handleConnectAudio = async () => {
    try {
      const saved = audioMgrRef.current.getSavedDeviceId();
      const ctx = await audioMgrRef.current.connect(saved ?? undefined);
      const src = audioMgrRef.current.getSourceNode()!;
      pitchDetRef.current = new PitchDetector(src, ctx, () => {});
      pitchDetRef.current.start();
      setAudioConnected(true);
    } catch {
      // no device
    }
  };

  const handleMeasurePerformance = async () => {
    if (!test.performanceExercise || !audioMgrRef.current.getSourceNode() || !audioMgrRef.current.getContext()) return;
    setMeasuring(true);
    const duration = (test.performanceExercise.durationSeconds ?? 10) * 1000;
    const score = await PitchDetector.measureAccuracy(
      audioMgrRef.current.getSourceNode()!,
      audioMgrRef.current.getContext()!,
      test.performanceExercise.targetNote ?? 'E2',
      duration
    );
    pitchDetRef.current?.stop();
    audioMgrRef.current.disconnect();
    setMeasuring(false);
    finishTest(answers, score);
  };

  const handleSkipPerformance = () => {
    finishTest(answers, 1.0);
  };

  // ── Intro ─────────────────────────────────────────────────────────────────
  if (step === 'intro') {
    return (
      <div className="tier-test__overlay">
        <div className="tier-test__modal">
          <button className="tier-test__close" onClick={onClose}>✕</button>
          <div className="tier-test__intro">
            <p className="tier-test__kicker">Tier Gate Test</p>
            <h2 className="tier-test__title">{test.label}</h2>
            <div className="tier-test__overview">
              <div className="tier-test__stat">
                <span className="tier-test__stat-value">{test.questions.length}</span>
                <span className="tier-test__stat-label">Questions</span>
              </div>
              {hasPerformance && (
                <div className="tier-test__stat">
                  <span className="tier-test__stat-value">+1</span>
                  <span className="tier-test__stat-label">Performance</span>
                </div>
              )}
              <div className="tier-test__stat">
                <span className="tier-test__stat-value">{Math.round(test.passingScore * 100)}%</span>
                <span className="tier-test__stat-label">To Pass</span>
              </div>
            </div>
            <p className="tier-test__intro-note">Pass this test to unlock the next tier of skills.</p>
            <button className="tier-test__cta" onClick={() => setStep('knowledge')}>
              Begin Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Knowledge questions ───────────────────────────────────────────────────
  if (step === 'knowledge' && currentQ) {
    const isCorrect = selectedOption === currentQ.correctIndex;
    return (
      <div className="tier-test__overlay">
        <div className="tier-test__modal">
          <button className="tier-test__close" onClick={onClose}>✕</button>

          <div className="tier-test__progress-row">
            <span className="tier-test__progress-label">
              Question {qIndex + 1} / {test.questions.length}
            </span>
            <div className="tier-test__progress-bar">
              <div className="tier-test__progress-fill" style={{ width: `${((qIndex) / test.questions.length) * 100}%` }} />
            </div>
          </div>

          <p className="tier-test__question">{currentQ.prompt}</p>

          <div className="tier-test__options">
            {currentQ.options.map((opt, i) => {
              let cls = 'tier-test__option';
              if (showExplanation) {
                if (i === currentQ.correctIndex) cls += ' tier-test__option--correct';
                else if (i === selectedOption) cls += ' tier-test__option--wrong';
              } else if (i === selectedOption) {
                cls += ' tier-test__option--selected';
              }
              return (
                <button key={i} className={cls} onClick={() => handleSelectOption(i)}>
                  <span className="tier-test__option-letter">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={['tier-test__explanation', isCorrect ? 'tier-test__explanation--correct' : 'tier-test__explanation--wrong'].join(' ')}>
              <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong> {currentQ.explanation}
            </div>
          )}

          {showExplanation && (
            <button className="tier-test__cta" onClick={handleNextQuestion}>
              {isLastQ && !hasPerformance ? 'Finish Test' : isLastQ ? 'Performance Challenge' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Performance challenge ─────────────────────────────────────────────────
  if (step === 'performance' && test.performanceExercise) {
    return (
      <div className="tier-test__overlay">
        <div className="tier-test__modal">
          <button className="tier-test__close" onClick={onClose}>✕</button>
          <div className="tier-test__perf">
            <p className="tier-test__kicker">Performance Challenge</p>
            <h3 className="tier-test__title">{test.performanceExercise.prompt}</h3>
            {test.performanceExercise.bpm && (
              <p className="tier-test__bpm">{test.performanceExercise.bpm} BPM</p>
            )}
            {!audioConnected ? (
              <button className="tier-test__audio-btn" onClick={handleConnectAudio}>
                Connect Microphone
              </button>
            ) : (
              <p className="tier-test__audio-ready">Microphone connected — ready to measure.</p>
            )}
            <div className="tier-test__perf-actions">
              {audioConnected && !measuring && (
                <button className="tier-test__cta" onClick={handleMeasurePerformance}>
                  Start Recording ({test.performanceExercise.durationSeconds ?? 10}s)
                </button>
              )}
              {measuring && <p className="tier-test__measuring">Recording...</p>}
              <button className="tier-test__skip-btn" onClick={handleSkipPerformance}>
                Skip (no microphone)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Result ────────────────────────────────────────────────────────────────
  if (step === 'result' && result) {
    const pct = Math.round(result.overallScore * 100);
    return (
      <div className="tier-test__overlay">
        <div className="tier-test__modal">
          <div className={['tier-test__result', result.passed ? 'tier-test__result--pass' : 'tier-test__result--fail'].join(' ')}>
            <p className="tier-test__kicker">{result.passed ? 'Test Passed!' : 'Test Failed'}</p>
            <div className="tier-test__score-ring" style={{ '--score': `${pct}%` } as React.CSSProperties}>
              <span className="tier-test__score-pct">{pct}%</span>
            </div>
            <div className="tier-test__score-breakdown">
              <div className="tier-test__score-row">
                <span>Knowledge</span>
                <span>{Math.round(result.knowledgeScore * 100)}%</span>
              </div>
              {hasPerformance && (
                <div className="tier-test__score-row">
                  <span>Performance</span>
                  <span>{Math.round(result.performanceScore * 100)}%</span>
                </div>
              )}
            </div>
            {result.passed ? (
              <p className="tier-test__result-msg">Next tier unlocked!</p>
            ) : (
              <p className="tier-test__result-msg">Need {Math.round(test.passingScore * 100)}% to pass. Review the material and try again.</p>
            )}
            <button className="tier-test__cta" onClick={onClose}>
              {result.passed ? 'Continue' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
