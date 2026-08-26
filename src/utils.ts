/**
 * Regex matching safe CSS scale values:
 * Single float/int: "1", "1.333", ".75"
 * 2D scale: ".75,1", "1,.75", "1.333,1", "1,1.333"
 */
const SAFE_SCALE_REGEX = /^\s*([0-9]+(?:\.[0-9]+)?|\.[0-9]+)(\s*,\s*([0-9]+(?:\.[0-9]+)?|\.[0-9]+))?\s*$/;

/**
 * Validates and sanitizes scale values to prevent CSS injection attacks.
 * Defaults to "1" (original AR) if input contains invalid or unsafe characters.
 * @param scaleValue - Scale string to validate
 * @returns Sanitized scale string
 */
export function sanitizeScaleValue(scaleValue: string): string {
  if (typeof scaleValue !== "string") {
    return "1";
  }
  const trimmed = scaleValue.trim();
  if (!SAFE_SCALE_REGEX.test(trimmed)) {
    return "1";
  }
  return trimmed;
}

/**
 * Calculates the top margin offset percentage for vertically scaled video containers.
 * @param scaleValue - Scale string such as "1", "1.333", ".75,1", or "1,.75"
 * @returns Top percentage offset (e.g., 0, -16.65, 12.5)
 */
export function calculateMarginTop(scaleValue: string): number {
  const safeScale = sanitizeScaleValue(scaleValue);
  const parts = safeScale.split(",");
  const verticalScaleStr = (parts[parts.length - 1] ?? "1").trim();
  const verticalScale = parseFloat(verticalScaleStr);
  if (isNaN(verticalScale) || !Number.isFinite(verticalScale)) {
    return 0;
  }
  const margin = -(verticalScale - 1) * 50;
  // Convert -0 to 0
  return Object.is(margin, -0) ? 0 : Math.round(margin * 1000) / 1000;
}

/**
 * Formats the transform CSS style for the video containers with sanitized inputs.
 * @param scaleValue - CSS scale argument (e.g. "1.333", "1.333,1", "1,1.333")
 * @returns CSS transform declaration
 */
export function generateTransformCss(scaleValue: string): string {
  const safeScale = sanitizeScaleValue(scaleValue);
  const topOffset = calculateMarginTop(safeScale);
  return `
    .html5-video-container, .video-annotations {
      transform: scale(${safeScale}) !important;
      top: ${topOffset}% !important;
    }
  `;
}
