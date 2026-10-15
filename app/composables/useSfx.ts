import type { Ref } from 'vue'

export type SfxName = 'tick' | 'chime' | 'chimeSoft' | 'boop' | 'splash' | 'thud' | 'whoosh' | 'win' | 'squeak' | 'pop'

interface Tone {
  frequency: number
  endFrequency?: number
  duration: number
  type?: OscillatorType
  gain?: number
  delay?: number
  /** Seconds to fade in; a slow attack is what makes a chime feel soft. */
  attack?: number
}

const TONES: Record<SfxName, readonly Tone[]> = {
  tick: [{ frequency: 1500, endFrequency: 900, duration: 0.04, type: 'square', gain: 0.05 }],
  // End of a focus turn: three rising notes of a pentatonic scale, long and quiet
  chime: [
    { frequency: 523.25, duration: 1.6, type: 'sine', gain: 0.05, attack: 0.03 },
    { frequency: 659.25, duration: 1.6, type: 'sine', gain: 0.05, delay: 0.22, attack: 0.03 },
    { frequency: 783.99, duration: 2.2, type: 'sine', gain: 0.05, delay: 0.44, attack: 0.03 },
    { frequency: 1046.5, duration: 2.4, type: 'sine', gain: 0.02, delay: 0.44, attack: 0.05 },
  ],
  // End of a break: two falling notes, even softer
  chimeSoft: [
    { frequency: 783.99, duration: 1.4, type: 'sine', gain: 0.035, attack: 0.04 },
    { frequency: 587.33, duration: 1.8, type: 'sine', gain: 0.035, delay: 0.3, attack: 0.04 },
  ],
  boop: [{ frequency: 360, endFrequency: 520, duration: 0.12, type: 'sine', gain: 0.18 }],
  squeak: [{ frequency: 900, endFrequency: 1500, duration: 0.14, type: 'triangle', gain: 0.12 }],
  splash: [
    { frequency: 500, endFrequency: 200, duration: 0.2, type: 'sine', gain: 0.1 },
    { frequency: 700, endFrequency: 300, duration: 0.18, type: 'sine', gain: 0.07, delay: 0.07 },
  ],
  thud: [{ frequency: 120, endFrequency: 40, duration: 0.25, type: 'sine', gain: 0.3 }],
  whoosh: [{ frequency: 220, endFrequency: 700, duration: 0.35, type: 'sawtooth', gain: 0.03 }],
  pop: [{ frequency: 600, endFrequency: 1200, duration: 0.08, type: 'sine', gain: 0.12 }],
  win: [
    { frequency: 523, duration: 0.25, type: 'triangle', gain: 0.14 },
    { frequency: 659, duration: 0.25, type: 'triangle', gain: 0.14, delay: 0.12 },
    { frequency: 784, duration: 0.25, type: 'triangle', gain: 0.14, delay: 0.24 },
    { frequency: 1047, duration: 0.6, type: 'triangle', gain: 0.14, delay: 0.36 },
  ],
}

/** Tiny synthesised sound effects: no audio files to load, nothing to host. */
export function useSfx(enabled: Ref<boolean>) {
  function play(name: SfxName): void {
    if (!enabled.value) return
    const ctx = getAudioContext()
    if (!ctx) return
    for (const tone of TONES[name]) {
      const start = ctx.currentTime + (tone.delay ?? 0)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = tone.type ?? 'sine'
      osc.frequency.setValueAtTime(tone.frequency, start)
      if (tone.endFrequency) osc.frequency.exponentialRampToValueAtTime(tone.endFrequency, start + tone.duration)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(tone.gain ?? 0.1, start + (tone.attack ?? 0.01))
      gain.gain.exponentialRampToValueAtTime(0.0001, start + tone.duration)
      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + tone.duration + 0.05)
    }
  }
  return { play }
}
