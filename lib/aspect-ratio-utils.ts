import aspectRatios from './constants/aspect-ratios';

export function calculateFitDimensions(
  width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  const ratio = width / height;
  let displayWidth = width;
  let displayHeight = height;

  if (maxWidth && displayWidth > maxWidth) {
    displayWidth = maxWidth;
    displayHeight = Math.round(displayWidth / ratio);
  }

  if (maxHeight && displayHeight > maxHeight) {
    displayHeight = maxHeight;
    displayWidth = Math.round(displayHeight * ratio);
  }

  return { width: Math.round(displayWidth), height: Math.round(displayHeight) };
}

export function getAspectRatioCSS(width: number, height: number): string {
  return `${width} / ${height}`;
}

export function getStandardDimensions(width: number, height: number): { width: number; height: number } {
  const ratio = width / height;
  if (ratio >= 1) {
    const w = 1600;
    return { width: w, height: Math.round(w / ratio) };
  }
  const h = 1000;
  return { width: Math.round(h * ratio), height: h };
}

export function getAspectRatioPreset(id: string) {
  const found = aspectRatios.find((r) => r.id === id);
  if (found) return { id: found.id, width: found.width, height: found.height, label: found.label };
  return null;
}
