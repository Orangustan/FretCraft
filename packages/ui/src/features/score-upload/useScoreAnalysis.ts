import { useState, useCallback } from 'react';
import type { SkillTree } from '@guitar-st/core';
import type { AnalysisResult } from './analyzerBridge';

export type WizardStep = 1 | 2 | 3 | 4;
export type ProgressStep = 1 | 2 | 3 | 4;

interface State {
  step: WizardStep;
  file: File | null;
  analysisResult: AnalysisResult | null;
  generatedTree: SkillTree | null;
  progressStep: ProgressStep;
  error: string | null;
}

function delay(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

export function useScoreAnalysis() {
  const [state, setState] = useState<State>({
    step: 1,
    file: null,
    analysisResult: null,
    generatedTree: null,
    progressStep: 1,
    error: null,
  });

  const runAnalysis = useCallback(async (file: File) => {
    const apiKey = (import.meta.env.VITE_ANTHROPIC_API_KEY ?? '') as string;
    if (!apiKey) {
      setState(s => ({
        ...s,
        error: 'VITE_ANTHROPIC_API_KEY is not set. Add it to your .env file.',
      }));
      return;
    }

    setState(s => ({ ...s, step: 2, progressStep: 1, error: null }));

    try {
      // Dynamic import triggers code split — loads Anthropic call + tree generator
      const { runAnalysis: bridge } = await import('./analyzerBridge');

      setState(s => ({ ...s, progressStep: 2 }));

      // Run API call; enforce minimum display time for each progress step
      const [result] = await Promise.all([bridge(file, apiKey), delay(1800)]);

      setState(s => ({ ...s, progressStep: 3 }));
      await delay(500);

      setState(s => ({ ...s, progressStep: 4 }));
      await delay(400);

      setState(s => ({
        ...s,
        step: 3,
        analysisResult: result.analysisResult,
        generatedTree: result.generatedTree,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setState(s => ({ ...s, step: 1, error: message }));
    }
  }, []);

  const selectFile = useCallback((file: File) => {
    setState(s => ({ ...s, file, error: null }));
  }, []);

  const handleAnalyze = useCallback(() => {
    if (state.file) runAnalysis(state.file);
  }, [state.file, runAnalysis]);

  const handleRegenerate = useCallback(() => {
    if (state.file) runAnalysis(state.file);
  }, [state.file, runAnalysis]);

  const handleBuildTree = useCallback(() => {
    setState(s => ({ ...s, step: 4 }));
  }, []);

  const handleSaveTree = useCallback((tree: SkillTree) => {
    setState(s => ({ ...s, generatedTree: tree }));
  }, []);

  return {
    step: state.step,
    file: state.file,
    analysisResult: state.analysisResult,
    generatedTree: state.generatedTree,
    progressStep: state.progressStep,
    error: state.error,
    handlers: {
      selectFile,
      analyze: handleAnalyze,
      regenerate: handleRegenerate,
      buildTree: handleBuildTree,
      saveTree: handleSaveTree,
    },
  };
}
