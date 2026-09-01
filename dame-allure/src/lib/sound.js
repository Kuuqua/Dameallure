// A soft two-note chime, synthesized on the fly with the Web Audio API.
// No audio file dependency, and it respects the OS's reduced-motion-style
// preferences by simply being quiet and brief.

export function playConfirmChime() {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    const notes = [523.25, 659.25]; // C5, E5 — a gentle, resolved-sounding pair

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;

      const start = ctx.currentTime + i * 0.12;
      const duration = 0.5;

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.08, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.05);
    });

    window.setTimeout(() => ctx.close(), 900);
  } catch {
    // Audio isn't essential to the flow — fail silently.
  }
}
