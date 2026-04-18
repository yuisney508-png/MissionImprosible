/**
 * Converts a 0-100 volume value to a 0-1 perceptual scale.
 * Uses square root for a more natural perceived loudness curve.
 */
export function normalizeVolume(volume: number): number {
  return Math.sqrt(volume / 100)
}

/**
 * Plays an audio URL at the given 0-100 volume.
 * Returns the HTMLAudioElement for further control if needed.
 */
export function playAudio(url: string, volume: number): HTMLAudioElement {
  const audio = new Audio(url)
  audio.volume = normalizeVolume(volume)
  audio.play()
  return audio
}

/**
 * Plays an audio URL and calls onDuration(ms) once the duration is known.
 * Useful for timing UI animations to match audio length.
 */
export function playAudioTimed(
  url: string,
  volume: number,
  onDuration: (durationMs: number) => void
): HTMLAudioElement {
  const audio = new Audio(url)
  audio.volume = normalizeVolume(volume)
  audio.addEventListener('loadedmetadata', () => onDuration(audio.duration * 1000))
  audio.play()
  return audio
}

/**
 * Loads an audio URL and calls onDuration(ms) once the duration is known,
 * without playing it. Used to pre-fetch duration for UI blocking.
 */
export function getAudioDuration(
  url: string,
  onDuration: (durationMs: number) => void
): void {
  const audio = new Audio(url)
  audio.addEventListener('loadedmetadata', () => onDuration(audio.duration * 1000))
  audio.load()
}
