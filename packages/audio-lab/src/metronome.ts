export type TimeSignature = '4/4' | '3/4' | '6/8';

// Future sound types: 'drum-machine' | 'band-in-a-box'
export type SoundType = 'click' | 'woodblock' | 'cowbell' | 'rimshot';

export interface MetronomeOptions {
  bpm: number;
  timeSignature: TimeSignature;
  onBeat: (beat: number, isDownbeat: boolean) => void;
  soundType?: SoundType;
}

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_SEC = 0.1;
const CLICK_FREQ_DOWNBEAT = 1000;
const CLICK_FREQ_BEAT = 600;
const CLICK_DURATION = 0.04;

function beatsPerBar(sig: TimeSignature): number {
  if (sig === '3/4') return 3;
  if (sig === '6/8') return 6;
  return 4;
}

export class Metronome {
  private ctx: AudioContext | null = null;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;
  private nextBeatTime = 0;
  private currentBeat = 0;
  private options: Required<MetronomeOptions>;

  constructor(options: MetronomeOptions) {
    this.options = { soundType: 'click', ...options };
  }

  get isRunning(): boolean {
    return this.schedulerTimer !== null;
  }

  start(): void {
    if (this.isRunning) return;
    this.ctx = new AudioContext();
    this.currentBeat = 0;
    this.nextBeatTime = this.ctx.currentTime + 0.05;
    this.schedulerTimer = setInterval(() => this.schedule(), LOOKAHEAD_MS);
  }

  stop(): void {
    if (this.schedulerTimer !== null) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.ctx?.close();
    this.ctx = null;
  }

  setBpm(bpm: number): void {
    this.options.bpm = bpm;
  }

  setTimeSignature(sig: TimeSignature): void {
    this.options.timeSignature = sig;
    this.currentBeat = 0;
  }

  setSoundType(sound: SoundType): void {
    this.options.soundType = sound;
  }

  private schedule(): void {
    if (!this.ctx) return;
    const secondsPerBeat = 60 / this.options.bpm;
    const bars = beatsPerBar(this.options.timeSignature);

    while (this.nextBeatTime < this.ctx.currentTime + SCHEDULE_AHEAD_SEC) {
      const beat = this.currentBeat;
      const isDownbeat = beat === 0;
      this.scheduleClick(this.nextBeatTime, isDownbeat);

      const scheduledTime = this.nextBeatTime;
      const delay = Math.max(0, (scheduledTime - this.ctx.currentTime) * 1000);
      setTimeout(() => this.options.onBeat(beat, isDownbeat), delay);

      this.currentBeat = (this.currentBeat + 1) % bars;
      this.nextBeatTime += secondsPerBeat;
    }
  }

  private scheduleClick(time: number, isDownbeat: boolean): void {
    switch (this.options.soundType) {
      case 'woodblock': return this.scheduleWoodblock(time, isDownbeat);
      case 'cowbell':   return this.scheduleCowbell(time, isDownbeat);
      case 'rimshot':   return this.scheduleRimshot(time, isDownbeat);
      default:          return this.scheduleOscillatorClick(time, isDownbeat);
    }
  }

  private scheduleOscillatorClick(time: number, isDownbeat: boolean): void {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.value = isDownbeat ? CLICK_FREQ_DOWNBEAT : CLICK_FREQ_BEAT;
    gain.gain.setValueAtTime(isDownbeat ? 0.8 : 0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + CLICK_DURATION);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + CLICK_DURATION);
  }

  private scheduleWoodblock(time: number, isDownbeat: boolean): void {
    if (!this.ctx) return;
    const dur = 0.03;
    const vol = isDownbeat ? 0.9 : 0.6;
    for (const freq of [800, 1200]) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.value = freq + (isDownbeat ? 0 : -80);
      osc.type = 'sine';
      gain.gain.setValueAtTime(vol * 0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + dur);
    }
  }

  private scheduleCowbell(time: number, isDownbeat: boolean): void {
    if (!this.ctx) return;
    const dur = isDownbeat ? 0.1 : 0.07;
    const vol = isDownbeat ? 0.7 : 0.5;
    for (const freq of [587, 845]) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol * 0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + dur);
    }
  }

  private scheduleRimshot(time: number, isDownbeat: boolean): void {
    if (!this.ctx) return;
    const dur = 0.05;
    const vol = isDownbeat ? 0.9 : 0.6;

    // Noise burst
    const bufSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(vol * 0.6, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + dur);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(time);
    noise.stop(time + dur);

    // Sine body
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.frequency.value = 200;
    oscGain.gain.setValueAtTime(vol * 0.4, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.6);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + dur);
  }
}
