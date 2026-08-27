import { describe, it, expect } from "vitest";
import { calculateMarginTop, generateTransformCss, sanitizeScaleValue } from "../src/utils";
import { ASPECT_RATIO_OPTIONS, DEFAULT_OPTION } from "../src/constants";

describe("Aspect Ratio Security & Utility Tests", () => {
  describe("Input Sanitization & Injection Defense", () => {
    it("accepts valid 1D and 2D numeric scale strings", () => {
      expect(sanitizeScaleValue("1")).toBe("1");
      expect(sanitizeScaleValue("1.333")).toBe("1.333");
      expect(sanitizeScaleValue(".75")).toBe(".75");
      expect(sanitizeScaleValue(".75,1")).toBe(".75,1");
      expect(sanitizeScaleValue("1,.75")).toBe("1,.75");
      expect(sanitizeScaleValue("  1.25 , 1.25  ")).toBe("1.25 , 1.25");
    });

    it("sanitizes CSS injection strings to fallback '1'", () => {
      expect(sanitizeScaleValue("1) !important; body { display:none; }")).toBe("1");
      expect(sanitizeScaleValue("<script>alert(1)</script>")).toBe("1");
      expect(sanitizeScaleValue("url('javascript:evil()')")).toBe("1");
      expect(sanitizeScaleValue("1; color: red;")).toBe("1");
      expect(sanitizeScaleValue("")).toBe("1");
      expect(sanitizeScaleValue(null as unknown as string)).toBe("1");
      expect(sanitizeScaleValue(undefined as unknown as string)).toBe("1");
    });

    it("generates safe transform CSS even when attacked", () => {
      const malicious = "1) !important; } * { background: red; }";
      const css = generateTransformCss(malicious);
      expect(css).not.toContain("background: red");
      expect(css).toContain("transform: scale(1) !important;");
      expect(css).toContain("top: 0% !important;");
    });
  });

  describe("Margin & Transform Calculations", () => {
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

    it("handles invalid scale gracefully with fallback 0", () => {
      expect(calculateMarginTop("invalid")).toBe(0);
    });

    it("generates transform CSS with scale and top position", () => {
      const css = generateTransformCss("1.333");
      expect(css).toContain("transform: scale(1.333) !important;");
      expect(css).toContain("top: -16.65% !important;");
    });
  });

  describe("Immutability & Integrity", () => {
    it("has a valid DEFAULT_OPTION with scale '1'", () => {
      expect(DEFAULT_OPTION).toBeDefined();
      expect(DEFAULT_OPTION.scale).toBe("1");
      expect(DEFAULT_OPTION.label).toBe("100%");
      expect(DEFAULT_OPTION.title).toBe("Original (100%)");
    });

    it("all presets have valid non-empty labels, titles, and scales", () => {
      for (const opt of ASPECT_RATIO_OPTIONS) {
        expect(opt.label.length).toBeGreaterThan(0);
        expect(opt.title.length).toBeGreaterThan(0);
        expect(opt.scale.length).toBeGreaterThan(0);
        expect(Number.isFinite(calculateMarginTop(opt.scale))).toBe(true);
      }
    });

    it("ASPECT_RATIO_OPTIONS is deeply frozen", () => {
      expect(Object.isFrozen(ASPECT_RATIO_OPTIONS)).toBe(true);
      for (const opt of ASPECT_RATIO_OPTIONS) {
        expect(Object.isFrozen(opt)).toBe(true);
      }
    });
  });
});
