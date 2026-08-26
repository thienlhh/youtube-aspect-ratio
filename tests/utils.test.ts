import { describe, it, expect } from "vitest";
import { calculateMarginTop, generateTransformCss } from "../src/utils";
import { ASPECT_RATIO_OPTIONS, DEFAULT_OPTION } from "../src/constants";

describe("Aspect Ratio Utilities", () => {
  it("calculates 0 margin for default scale (1)", () => {
    expect(calculateMarginTop("1")).toBe(0);
  });

  it("calculates margin for horizontal scale (.75,1)", () => {
    expect(calculateMarginTop(".75,1")).toBe(0);
  });

  it("calculates positive margin for vertical squeeze (1,.75)", () => {
    expect(calculateMarginTop("1,.75")).toBe(12.5);
  });

  it("calculates negative margin for proportional zoom (1.333)", () => {
    expect(calculateMarginTop("1.333")).toBe(-16.65);
  });

  it("calculates negative margin for vertical stretch (1,1.333)", () => {
    expect(calculateMarginTop("1,1.333")).toBe(-16.65);
  });

  it("handles invalid scale gracefully", () => {
    expect(calculateMarginTop("invalid")).toBe(0);
  });

  it("generates transform CSS with scale and top position", () => {
    const css = generateTransformCss("1.333");
    expect(css).toContain("transform: scale(1.333) !important;");
    expect(css).toContain("top: -16.65% !important;");
  });

  it("has a valid DEFAULT_OPTION with scale '1'", () => {
    expect(DEFAULT_OPTION).toBeDefined();
    expect(DEFAULT_OPTION.scale).toBe("1");
    expect(DEFAULT_OPTION.label).toBe("100%");
  });

  it("all presets have valid non-empty labels and scales", () => {
    for (const opt of ASPECT_RATIO_OPTIONS) {
      expect(opt.label.length).toBeGreaterThan(0);
      expect(opt.scale.length).toBeGreaterThan(0);
      expect(Number.isFinite(calculateMarginTop(opt.scale))).toBe(true);
    }
  });
});
