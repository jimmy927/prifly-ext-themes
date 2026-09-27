/**
 * The model swatches' colours (`model-<family>-<shade>`), from each theme's
 * own palette rather than written out fifteen times.
 *
 * prifly colours a model by family — Opus blue, Fable amber, Sonnet pink,
 * Haiku green — and shades older versions further from the surface: shade 0
 * is the newest, 1 and 2 darker on a light theme, lighter on a dark one. So
 * each family takes the theme's own colour of that hue — its running blue,
 * warning amber, wake-up pink and done green — and the shades are mixed from
 * it the way prifly's own are. A theme that recolours those states recolours
 * its models with them, and Game Boy's greens stay Game Boy's.
 */

import type { Theme, Tokens } from "./types";

const FAMILIES = {
  opus: "viz-running",
  fable: "viz-warning",
  sonnet: "ink-wakeup",
  haiku: "viz-good",
} as const;

/** How far each older shade moves toward black (light) or white (dark), as prifly's own do. */
const STEPS: Record<"light" | "dark", readonly number[]> = {
  light: [0, 0.23, 0.44],
  dark: [0, 0.3, 0.55],
};

function channels(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** `hex` moved `amount` of the way to `toward`, as `#rrggbb`. */
export function mix(hex: string, toward: string, amount: number): string {
  const [r, g, b] = channels(hex);
  const [tr, tg, tb] = channels(toward);
  const step = (from: number, to: number) => Math.round(from + (to - from) * amount);
  const out = [step(r, tr), step(g, tg), step(b, tb)];
  return `#${out.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

/** The twelve model tokens for one mode of a theme, from its own states. */
export function modelTokens(tokens: Tokens, mode: "light" | "dark"): Record<string, string> {
  const edge = mode === "light" ? "#000000" : "#ffffff";
  const out: Record<string, string> = {};
  for (const [family, source] of Object.entries(FAMILIES)) {
    const base = tokens[source];
    if (base === undefined) throw new Error(`the ${mode} palette has no ${source}`);
    STEPS[mode].forEach((amount, shade) => {
      out[`model-${family}-${shade}`] = mix(base, edge, amount);
    });
  }
  return out;
}

/** A theme with its model colours added to every mode it has. */
export function withModelColours(theme: Theme): Theme {
  return {
    ...theme,
    ...(theme.light === undefined
      ? {}
      : { light: { ...theme.light, ...modelTokens(theme.light, "light") } }),
    ...(theme.dark === undefined
      ? {}
      : { dark: { ...theme.dark, ...modelTokens(theme.dark, "dark") } }),
  };
}
