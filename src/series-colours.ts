/**
 * The pie hues (`viz-series-1..8`) and the label drawn on a slice
 * (`viz-series-ink`), from each theme's own palette rather than written out
 * eight times per mode.
 *
 * prifly's own order is blue, orange, green, red, purple, cyan, pink, olive.
 * Each slot takes the first of its candidate tokens that reads against both
 * the card and the background (3:1), carries the label at 4.5:1 (stepped away
 * from the ink where it does not) and is far enough in OKLab from every
 * earlier slot. A slot none of its candidates fits takes its first readable
 * candidate mixed toward the foreground (else black, else white) until it is
 * apart. The label is the mode's `primary-foreground`.
 *
 * The contrast and OKLab maths are copied from prifly's `theme-check.ts`:
 * `src/` imports nothing from prifly.
 */

import { mix } from "./model-colours";
import type { Theme, Tokens } from "./types";

const SLOTS: readonly (readonly string[])[] = [
  ["viz-running", "ink-running", "kind-windows"],
  ["viz-warning", "ink-warning", "kind-ssh", "favourite"],
  ["viz-good", "ink-good", "kind-wsl"],
  ["viz-critical", "ink-critical", "destructive"],
  ["viz-merged", "ink-merged", "kind-cloud"],
  ["ink-agent", "ink-repeat", "mode-plan"],
  ["ink-wakeup", "ink-shell", "mode-danger"],
  ["ink-shell-local", "mode-auto", "ink-muted", "viz-muted"],
];

/** The least contrast a slice has against the card and the background. */
export const SERIES_CONTRAST = 3;
/** The least contrast the label has against a slice. */
export const SERIES_INK_CONTRAST = 4.5;
/** The least OKLab distance between two slices. */
export const SERIES_APART = 0.08;

/** `#rrggbb` as linear-light sRGB channels, 0-1. */
function linear(hex: string): [number, number, number] {
  const channel = (at: number) => {
    const v = Number.parseInt(hex.slice(at, at + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return [channel(1), channel(3), channel(5)];
}

/** WCAG 2's contrast ratio of two `#rrggbb` colours, 1 to 21. */
export function contrastOf(a: string, b: string): number {
  const luminance = (hex: string) => {
    const [r, g, bl] = linear(hex);
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
}

function oklab(hex: string): [number, number, number] {
  const [r, g, b] = linear(hex);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

/** How different two colours look: Euclidean distance in OKLab. */
export function distanceOf(a: string, b: string): number {
  const [l1, a1, b1] = oklab(a);
  const [l2, a2, b2] = oklab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
}

/** The eight slice colours of one mode, in prifly's order. */
function slices(t: Tokens): string[] {
  const need = (name: string) => {
    const value = t[name];
    if (value === undefined) throw new Error(`the palette has no ${name}`);
    return value;
  };
  const card = need("card");
  const background = need("background");
  const foreground = need("foreground");
  const readable = (c: string) =>
    contrastOf(c, card) >= SERIES_CONTRAST && contrastOf(c, background) >= SERIES_CONTRAST;
  const ink = need("primary-foreground");
  const edge = contrastOf(ink, "#000000") > contrastOf(ink, "#ffffff") ? "#000000" : "#ffffff";
  const picked: string[] = [];
  const apart = (c: string) => picked.every((p) => distanceOf(p, c) >= SERIES_APART);
  // A slice the label reads on (4.5:1): stepped away from the ink, keeping its
  // hue, while it stays readable on the surfaces and apart from earlier slices.
  const settle = (c: string): string | undefined => {
    for (let step = 0; step <= 40; step++) {
      const candidate = step === 0 ? c : mix(c, edge, step / 40);
      if (contrastOf(candidate, ink) >= SERIES_INK_CONTRAST) {
        return readable(candidate) && apart(candidate) ? candidate : undefined;
      }
    }
    return undefined;
  };

  for (const slot of SLOTS) {
    const options = slot.flatMap((name) => (t[name] === undefined ? [] : [need(name)]));
    const first = options.map(settle).find((c) => c !== undefined);
    if (first !== undefined) {
      picked.push(first);
      continue;
    }
    // None fits: nudge a readable candidate toward the foreground (then toward
    // black, then white, for a palette whose foreground is itself taken), a
    // twentieth at a time, until it is apart and still readable.
    const bases = options.filter(readable);
    if (options.length === 0) throw new Error(`the palette has none of ${slot.join(", ")}`);
    let chosen: string | undefined;
    search: for (const toward of [foreground, "#000000", "#ffffff"]) {
      for (const base of bases) {
        for (let step = 1; step <= 20; step++) {
          const candidate = mix(base, toward, step / 20);
          const settled = settle(candidate);
          if (settled !== undefined) {
            chosen = settled;
            break search;
          }
        }
      }
    }
    if (chosen === undefined) {
      throw new Error(`no colour for slot ${picked.length + 1} (${slot.join(", ")}) fits the palette`);
    }
    picked.push(chosen);
  }
  return picked;
}

/** The nine series tokens for one mode of a theme, from its own palette. */
export function seriesTokens(tokens: Tokens): Record<string, string> {
  const out: Record<string, string> = {};
  slices(tokens).forEach((colour, i) => {
    out[`viz-series-${i + 1}`] = colour;
  });
  const ink = tokens["primary-foreground"];
  if (ink === undefined) throw new Error("the palette has no primary-foreground");
  out["viz-series-ink"] = ink;
  return out;
}

/** A theme with its series colours added to every mode it has. */
export function withSeriesColours(theme: Theme): Theme {
  return {
    ...theme,
    ...(theme.light === undefined ? {} : { light: { ...theme.light, ...seriesTokens(theme.light) } }),
    ...(theme.dark === undefined ? {} : { dark: { ...theme.dark, ...seriesTokens(theme.dark) } }),
  };
}
