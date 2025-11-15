/**
 * Minimal pattern/noise generator used for background noise overlay.
 * Returns an HTMLCanvasElement with a repeating noise pattern.
 */
export function generateNoiseCanvas(size = 256, intensity = 20): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;
  // Use a nonlinear mapping for more visible noise at low values
  const amount = Math.max(0, Math.min(100, Math.pow(intensity, 1.2)));

  for (let i = 0; i < data.length; i += 4) {
    // grayscale noise value biased by intensity
    const v = Math.floor((Math.random() * 255 * amount) / 100);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    // alpha - increase minimum for more visible noise
    data[i + 3] = Math.floor(50 + (amount / 100) * 180);
  }

  ctx.putImageData(imageData, 0, 0);

  // Soften only for very low intensity
  if (amount < 20) {
    const tmp = document.createElement('canvas');
    tmp.width = size;
    tmp.height = size;
    const tctx = tmp.getContext('2d');
    if (tctx) {
      tctx.globalAlpha = 0.8;
      tctx.drawImage(canvas, 0, 0);
      return tmp;
    }
  }

  return canvas;
}
