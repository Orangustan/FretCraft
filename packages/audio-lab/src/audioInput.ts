export interface AudioDevice {
  deviceId: string;
  label: string;
}

const STORAGE_KEY = 'fretcraft_audio_device';

export class AudioInputManager {
  private stream: MediaStream | null = null;
  private ctx: AudioContext | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;

  async listDevices(): Promise<AudioDevice[]> {
    // Trigger permission prompt so labels are populated
    try {
      const temp = await navigator.mediaDevices.getUserMedia({ audio: true });
      temp.getTracks().forEach((t) => t.stop());
    } catch {
      // Permission denied — return empty
      return [];
    }

    const all = await navigator.mediaDevices.enumerateDevices();
    return all
      .filter((d) => d.kind === 'audioinput')
      .map((d) => ({
        deviceId: d.deviceId,
        label: d.label || `Microphone (${d.deviceId.slice(0, 8)})`,
      }));
  }

  getSavedDeviceId(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }

  saveDeviceId(deviceId: string): void {
    localStorage.setItem(STORAGE_KEY, deviceId);
  }

  async connect(deviceId?: string): Promise<AudioContext> {
    await this.disconnect();

    const constraints: MediaStreamConstraints = {
      audio: deviceId ? { deviceId: { exact: deviceId } } : true,
    };

    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.ctx = new AudioContext();
    this.sourceNode = this.ctx.createMediaStreamSource(this.stream);
    return this.ctx;
  }

  getSourceNode(): MediaStreamAudioSourceNode | null {
    return this.sourceNode;
  }

  getContext(): AudioContext | null {
    return this.ctx;
  }

  async disconnect(): Promise<void> {
    this.sourceNode?.disconnect();
    this.sourceNode = null;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    await this.ctx?.close();
    this.ctx = null;
  }
}
