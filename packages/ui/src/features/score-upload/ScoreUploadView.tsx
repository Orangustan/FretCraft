import { useScoreAnalysis } from './useScoreAnalysis';
import { ScoreUploader } from './ScoreUploader';
import { AnalysisProgress } from './AnalysisProgress';
import { AnalysisPreview } from './AnalysisPreview';
import { TreeConfigurator } from './TreeConfigurator';

export default function ScoreUploadView() {
  const {
    step,
    file,
    analysisResult,
    generatedTree,
    progressStep,
    error,
    handlers,
  } = useScoreAnalysis();

  return (
    <>
      {step === 1 && (
        <ScoreUploader
          file={file}
          error={error}
          onFileSelect={handlers.selectFile}
          onAnalyze={handlers.analyze}
        />
      )}

      {step === 2 && (
        <AnalysisProgress progressStep={progressStep} />
      )}

      {step === 3 && analysisResult && (
        <AnalysisPreview
          result={analysisResult}
          onRegenerate={handlers.regenerate}
          onBuildTree={handlers.buildTree}
        />
      )}

      {step === 4 && generatedTree && (
        <TreeConfigurator
          tree={generatedTree}
          onSave={handlers.saveTree}
        />
      )}
    </>
  );
}
