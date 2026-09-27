import type { Theme } from "../types";

/**
 * The two values the Brutalist skin (`skin/brutalist.css`) looks for, with a
 * CSS style query, to know this theme is the one drawn. A theme is colours
 * only; the thick black frames, the hard offset shadows and the square
 * corners are the skin's — and a skin is on for as long as the extension is,
 * so it must switch itself on for this theme and stay out of the others'.
 * Two values, so another theme matching one by chance is not enough.
 */
export const BRUTALIST_SIGNATURE = { backdrop: "#010101", "viz-grid": "#000000" } as const;

/**
 * Brutalist, after neo-brutalist web design: flat, loud colour blocks — a
 * lemon yellow, a sky blue, a bubblegum pink — on off-white, all inked in
 * pure black. Light only: pure black ink is the point.
 *
 * The primary is an electric blue, not the lemon: prifly draws links in the
 * primary, and yellow words vanish on off-white. The lemon stays as the
 * header block (the skin paints it from `favourite-surface`) and the
 * terminal bar.
 */
export const brutalist: Theme = {
  id: "brutalist",
  name: "Brutalist",
  description:
    "Neo-brutalism: flat bright colour blocks, pure black ink, thick black frames and hard shadows. Light only.",
  light: {
    background: "#fff4e0",
    foreground: "#000000",
    card: "#ffffff",
    "card-foreground": "#000000",
    popover: "#ffffff",
    "popover-foreground": "#000000",
    primary: "#2450ff",
    "primary-foreground": "#ffffff",
    secondary: "#a6e1ff",
    "secondary-foreground": "#000000",
    muted: "#fff4e0",
    "muted-foreground": "#2b2b2b",
    accent: "#ff90e8",
    "accent-foreground": "#000000",
    destructive: "#ff5c5c",
    "destructive-foreground": "#000000",
    border: "#000000",
    input: "#000000",
    ring: "#2450ff",
    favourite: "#ffb800",
    "favourite-surface": "#ffd400",
    backdrop: BRUTALIST_SIGNATURE.backdrop,
    "badge-foreground": "#000000",
    "terminal-background": "#000000",
    "terminal-foreground": "#ffffff",
    "terminal-bar": "#ffd400",
    "terminal-bar-foreground": "#000000",
    "viz-grid": BRUTALIST_SIGNATURE["viz-grid"],

    "viz-muted": "#737373",
    "viz-good": "#00a244",
    "viz-warning": "#e0a800",
    "viz-critical": "#ff3b30",
    "viz-running": "#3d7bff",
    "viz-merged": "#a76ffc",
    "ink-good": "#006b2b",
    "ink-warning": "#804d00",
    "ink-critical": "#c20e00",
    "ink-running": "#1a4fd6",
    "ink-merged": "#6a1fd1",
    "ink-agent": "#006a80",
    "ink-muted": "#4d4d4d",
    "ink-repeat": "#006666",
    "ink-wakeup": "#a3007a",
    "mode-manual": "#4d4d4d",
    "mode-plan": "#006666",
    "mode-accept": "#6a1fd1",
    "mode-danger": "#b3002d",
    "mode-auto": "#804d00",
    "kind-wsl": "#006b2b",
    "kind-windows": "#1a4fd6",
    "kind-cloud": "#6a1fd1",
    "kind-ssh": "#9a4d00",
  },
};
