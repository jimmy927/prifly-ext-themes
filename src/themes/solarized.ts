import type { Theme } from "../types";

/**
 * Solarized, Ethan Schoonover's palette (https://ethanschoonover.com/solarized/):
 *
 *   base03 #002b36  base02 #073642  base01 #586e75  base00 #657b83
 *   base0  #839496  base1  #93a1a1  base2  #eee8d5  base3  #fdf6e3
 *   yellow #b58900  orange #cb4b16  red    #dc322f  magenta #d33682
 *   violet #6c71c4  blue   #268bd2  cyan   #2aa198  green  #859900
 *
 * Surfaces, hairlines and fills are the published values. Two deliberate
 * departures, both for contrast:
 *
 * - Body text is one step stronger than Solarized's own (base02 on base3,
 *   base1 on base03): base00 on base3 is 4.1:1, under the 4.5:1 prifly asks.
 * - The coloured WORDS (inks) are the accents darkened (light) or lifted
 *   (dark) in the same hue until they read at 4.5:1 — the published accents
 *   sit at 2.5–4:1 as text.
 * - Bars, dots and buttons keep the published accents where they reach 3:1
 *   (4.5:1 under a word); the rest are nudged a step: the light blue and
 *   green fills, the dark red, violet and grey fills, and the dark primary
 *   and destructive buttons. The primary is lifted to 4.5:1 on the card too,
 *   since prifly draws links in it.
 */
export const solarized: Theme = {
  id: "solarized",
  name: "Solarized",
  description:
    "Ethan Schoonover's Solarized, light and dark, with the coloured words stepped to readable contrast.",
  light: {
    background: "#fdf6e3",
    foreground: "#073642",
    card: "#fdf6e3",
    "card-foreground": "#073642",
    popover: "#fdf6e3",
    "popover-foreground": "#073642",
    primary: "#1d6aa1",
    "primary-foreground": "#fdf6e3",
    secondary: "#eee8d5",
    "secondary-foreground": "#073642",
    muted: "#eee8d5",
    "muted-foreground": "#4d6168",
    accent: "#e4ddc8",
    "accent-foreground": "#073642",
    destructive: "#c12c29",
    "destructive-foreground": "#fdf6e3",
    border: "#e0d9c3",
    input: "#d3cbb2",
    ring: "#268bd2",
    favourite: "#b58900",
    "favourite-surface": "#e8c547",
    backdrop: "#002b36",
    "badge-foreground": "#fdf6e3",
    "terminal-background": "#002b36",
    "terminal-foreground": "#93a1a1",
    "terminal-bar": "#073642",
    "terminal-bar-foreground": "#93a1a1",
    "viz-grid": "#eee8d5",

    "viz-muted": "#586e75",
    "viz-good": "#849700",
    "viz-warning": "#b58900",
    "viz-critical": "#dc322f",
    "viz-running": "#227cbb",
    "viz-merged": "#6c71c4",
    "ink-good": "#5c6a00",
    "ink-warning": "#8a5f00",
    "ink-critical": "#b8231f",
    "ink-running": "#1a669c",
    "ink-merged": "#5157a8",
    "ink-agent": "#17756e",
    "ink-muted": "#586e75",
    "ink-repeat": "#17756e",
    "ink-wakeup": "#b0266a",
    "mode-manual": "#586e75",
    "mode-plan": "#17756e",
    "mode-accept": "#5157a8",
    "mode-danger": "#b8231f",
    "mode-auto": "#8a5f00",
    "kind-wsl": "#5c6a00",
    "kind-windows": "#1a669c",
    "kind-cloud": "#5157a8",
    "kind-ssh": "#a83c0d",
  },
  dark: {
    background: "#002b36",
    foreground: "#93a1a1",
    card: "#073642",
    "card-foreground": "#93a1a1",
    popover: "#073642",
    "popover-foreground": "#93a1a1",
    primary: "#56a8e2",
    "primary-foreground": "#002b36",
    secondary: "#073642",
    "secondary-foreground": "#93a1a1",
    muted: "#073642",
    "muted-foreground": "#93a1a1",
    accent: "#0d4250",
    "accent-foreground": "#eee8d5",
    destructive: "#d3302d",
    "destructive-foreground": "#fdf6e3",
    border: "#0d4250",
    input: "#1a5261",
    ring: "#268bd2",
    favourite: "#b58900",
    "favourite-surface": "#d9a90d",
    backdrop: "#00141a",
    "badge-foreground": "#002b36",
    "terminal-background": "#002b36",
    "terminal-foreground": "#93a1a1",
    "terminal-bar": "#073642",
    "terminal-bar-foreground": "#93a1a1",
    "viz-grid": "#0d4250",

    "viz-muted": "#839496",
    "viz-good": "#859900",
    "viz-warning": "#b58900",
    "viz-critical": "#de403e",
    "viz-running": "#268bd2",
    "viz-merged": "#6f74c5",
    "ink-good": "#a1b82e",
    "ink-warning": "#d6a520",
    "ink-critical": "#f37265",
    "ink-running": "#58a8e6",
    "ink-merged": "#9ea2e6",
    "ink-agent": "#3fc2b6",
    "ink-muted": "#93a1a1",
    "ink-repeat": "#3fc2b6",
    "ink-wakeup": "#ee6ba6",
    "mode-manual": "#93a1a1",
    "mode-plan": "#3fc2b6",
    "mode-accept": "#9ea2e6",
    "mode-danger": "#f37265",
    "mode-auto": "#d6a520",
    "kind-wsl": "#a1b82e",
    "kind-windows": "#58a8e6",
    "kind-cloud": "#9ea2e6",
    "kind-ssh": "#e97b45",
  },
};
