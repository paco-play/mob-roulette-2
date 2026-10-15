let context: AudioContext | null = null

/** One shared AudioContext. Browsers only allow it to start after a user gesture, hence the lazy creation. */
export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  context ??= new AudioContext()
  if (context.state === 'suspended') void context.resume()
  return context
}
