/**
 * Calculates the top margin offset percentage for vertically scaled video containers.
 * @param scaleValue - Scale string such as "1", "1.333", ".75,1", or "1,.75"
 * @returns Top percentage offset (e.g., 0, -16.65, 12.5)
 */
export function calculateMarginTop(scaleValue: string): number {
  const parts = scaleValue.split(",");
  const verticalScaleStr = parts[parts.length - 1].trim();
  const verticalScale = parseFloat(verticalScaleStr);
  if (isNaN(verticalScale)) {
    return 0;
  }
  const margin = -(verticalScale - 1) * 50;
  // Convert -0 to 0
  return Object.is(margin, -0) ? 0 : Math.round(margin * 1000) / 1000;
}

/**
 * Formats the transform CSS style for the video containers.
 * @param scaleValue - CSS scale argument (e.g. "1.333", "1.333,1", "1,1.333")
 * @returns CSS transform declaration
 */
export function generateTransformCss(scaleValue: string): string {
  const topOffset = calculateMarginTop(scaleValue);
  return `
    .html5-video-container, .video-annotations {
      transform: scale(${scaleValue}) !important;
      top: ${topOffset}% !important;
    }
  `;
}
