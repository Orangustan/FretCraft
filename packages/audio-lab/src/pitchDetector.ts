import { PitchDetector as PitchyDetector } from 'pitchy';

export interface PitchResult {
  note: string;        // e.g. "A4"
  frequency: number;
  cents: number;       // deviation from perfect pitch, -50 to +50
  clarity: number;     // 0–1 confidence
  midi: number;        // MIDI note number
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const BUFFER_SIZE = 2048;
const MIN_CLARITY = 0.85;

function freqToMidi(freq: number): number {
  return Math.round(12 * Math.log2(freq / 440) + 69);
}

function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[midi % 12];
  return `${name}${octave}`;
}

function centDeviation(freq: number, midi: number): number {
  const idealFreq = 440 * Math.pow(2, (midi - 69) / 12);
  return Math.round(1200 * Math.log2(freq / idealFreq));
}

export class PitchDetector {
  private analyser: AnalyserNode;
  private detector: ReturnType<typeof PitchyDetector.forFloat32Array>;
  private buffer: Float32Array<ArrayBuffer>;
  private rafId = 0;
  private onResult: (result: PitchResult | null) => void;

  constructor(sourceNode: AudioNode, ctx: AudioContext, onResult: (r: PitchResult | null) => void) {
    this.onResult = onResult;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = BUFFER_SIZE;
    sourceNode.connect(this.analyser);
    this.detector = PitchyDetector.forFloat32Array(BUFFER_SIZE);
    this.buffer = new Float32Array(BUFFER_SIZE) as Float32Array<ArrayBuffer>;
  }

  start(): void {
    const tick = () => {
      this.analyser.getFloatTimeDomainData(this.buffer);
      const [frequency, clarity] = this.detector.findPitch(this.buffer, this.analyser.context.sampleRate);

      if (clarity >= MIN_CLARITY && frequency > 50) {
        const midi = freqToMidi(frequency);
        this.onResult({
          note: midiToNoteName(midi),
          frequency,
          cents: centDeviation(frequency, midi),
          clarity,
          midi,
        });
      } else {
        this.onResult(null);
      }

      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop(): void {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
  }

  /** Measure accuracy against a target note over a duration. Returns 0–1. */
  static async measureAccuracy(
    sourceNode: AudioNode,
    ctx: AudioContext,
    targetNote: string,
    durationMs: number
  ): Promise<number> {
    return new Promise((resolve) => {
      const targetMidi = noteNameToMidi(targetNote);
      let samples = 0;
      let hits = 0;
      const detector = new PitchDetector(sourceNode, ctx, (result) => {
        if (result === null) { samples++; return; }
        samples++;
        if (Math.abs(result.midi - targetMidi) <= 0 && Math.abs(result.cents) <= 25) hits++;
      });
      detector.start();
      setTimeout(() => {
        detector.stop();
        resolve(samples > 0 ? hits / samples : 0);
      }, durationMs);
    });
  }
}

function noteNameToMidi(note: string): number {
  const match = note.match(/^([A-G]#?)(-?\d+)$/);
  if (!match) return 69; // default A4
  const semitone = NOTE_NAMES.indexOf(match[1]);
  const octave = parseInt(match[2], 10);
  return (octave + 1) * 12 + semitone;
}
