import { ExpressionType } from '../types/tuber';

const HAPPY_CHIME_FREQS = [523.25, 659.25, 783.99, 1046.5];

export class SFXEngine {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private initCtx() {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(osc: OscillatorNode, gain: GainNode, startTime: number, stopTime: number) {
    if (!this.ctx) return;
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch (_) {}
    };
    osc.start(startTime);
    osc.stop(stopTime);
  }

  public playExpressionSFX(expr: ExpressionType) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    switch (expr) {
      case 'happy': {
        // Cute ascending pentatonic chime (C5 -> E5 -> G5 -> C6)
        HAPPY_CHIME_FREQS.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);

          gain.gain.setValueAtTime(0.15, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);

          this.playTone(osc, gain, now + idx * 0.06, now + idx * 0.06 + 0.3);
        });
        break;
      }
      case 'blush':
      case 'heart_eyes': {
        // Heart Bubble Pop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        this.playTone(osc, gain, now, now + 0.15);
        break;
      }
      case 'angry': {
        // Low Anger Rumble Spark
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        this.playTone(osc, gain, now, now + 0.25);
        break;
      }
      case 'shocked': {
        // High Electro Zap
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.setValueAtTime(400, now + 0.05);
        osc.frequency.setValueAtTime(1500, now + 0.1);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        this.playTone(osc, gain, now, now + 0.2);
        break;
      }
      case 'star_eyes': {
        // Star Twinkle Sweep
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.25);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        this.playTone(osc, gain, now, now + 0.3);
        break;
      }
      case 'tears': {
        // Soft Tear Water Drop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.18);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        this.playTone(osc, gain, now, now + 0.2);
        break;
      }
      default:
        break;
    }
  }

  public dispose() {
    if (this.ctx) {
      try { this.ctx.close(); } catch (_) {}
      this.ctx = null;
    }
  }
}
