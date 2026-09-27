import type { Theme } from "../types";

/**
 * Studio: inspired by Adobe's Spectrum 2 design system, the look of its
 * creative apps. The name is Adobe's, so the theme has its own; the colours
 * are Spectrum's own tokens (`@adobe/spectrum-tokens` 15.4, Apache-2.0),
 * resolved for light and dark:
 *
 * - surfaces: layer 1 (#f8f8f8 / #1b1b1b) for the window, layer 2 and the
 *   elevated colour (#ffffff / #222222) for cards and popovers, the gray-75
 *   and gray-100 steps for chips and quiet buttons, and the body and subdued
 *   content greys for text;
 * - the accent: prifly draws links in the primary, so it takes the accent's
 *   pressed blue-1000 (#274dea) by day and blue-1100 by night — the #3b63fb
 *   default sits under 4.5:1 on the chip grey; the #3b63fb blue colours the
 *   running bars, and the focus-indicator blue the ring;
 * - states: the "visual" colours (positive green, negative red) for bars and
 *   dots, and the scales' 1000 (light) or 1100 (dark) steps for words —
 *   green, red, blue, purple, cyan, seafoam, magenta and cinnamon. Warning
 *   is the yellow scale, not Spectrum's notice orange, which prifly's check
 *   finds too close to the negative red.
 */
export const studio: Theme = {
  id: "studio",
  name: "Studio",
  description:
    "Inspired by Adobe's Spectrum 2: neutral greys, the bright accent blue and the creative apps' state colours.",
  light: {
    background: "#f8f8f8",
    foreground: "#292929",
    card: "#ffffff",
    "card-foreground": "#292929",
    popover: "#ffffff",
    "popover-foreground": "#292929",
    primary: "#274dea",
    "primary-foreground": "#ffffff",
    secondary: "#e9e9e9",
    "secondary-foreground": "#292929",
    muted: "#f3f3f3",
    "muted-foreground": "#505050",
    accent: "#e5f0fe",
    "accent-foreground": "#131313",
    destructive: "#d73220",
    "destructive-foreground": "#ffffff",
    border: "#e1e1e1",
    input: "#c6c6c6",
    ring: "#4b75ff",
    favourite: "#af7400",
    "favourite-surface": "#f5c700",
    backdrop: "#000000",
    "badge-foreground": "#ffffff",
    "terminal-background": "#ffffff",
    "terminal-foreground": "#292929",
    "terminal-bar": "#f3f3f3",
    "terminal-bar-foreground": "#292929",
    "viz-grid": "#e1e1e1",

    "viz-muted": "#8f8f8f",
    "viz-good": "#079355",
    "viz-warning": "#d29500",
    "viz-critical": "#f03823",
    "viz-running": "#3b63fb",
    "viz-merged": "#a65ce7",
    "ink-good": "#036e45",
    "ink-warning": "#865500",
    "ink-critical": "#b72818",
    "ink-running": "#274dea",
    "ink-merged": "#8628d9",
    "ink-agent": "#046691",
    "ink-muted": "#505050",
    "ink-repeat": "#056c5c",
    "ink-wakeup": "#ba1650",
    "mode-manual": "#505050",
    "mode-plan": "#056c5c",
    "mode-accept": "#8628d9",
    "mode-danger": "#b72818",
    "mode-auto": "#865500",
    "kind-wsl": "#036e45",
    "kind-windows": "#274dea",
    "kind-cloud": "#8628d9",
    "kind-ssh": "#934d2b",
  },
  dark: {
    background: "#1b1b1b",
    foreground: "#dbdbdb",
    card: "#222222",
    "card-foreground": "#dbdbdb",
    popover: "#222222",
    "popover-foreground": "#dbdbdb",
    primary: "#7ca9fc",
    "primary-foreground": "#111111",
    secondary: "#2c2c2c",
    "secondary-foreground": "#dbdbdb",
    muted: "#2c2c2c",
    "muted-foreground": "#afafaf",
    accent: "#323232",
    "accent-foreground": "#f2f2f2",
    destructive: "#fc432e",
    "destructive-foreground": "#111111",
    border: "#393939",
    input: "#444444",
    ring: "#5681ff",
    favourite: "#cb8d00",
    "favourite-surface": "#da9f00",
    backdrop: "#000000",
    "badge-foreground": "#111111",
    "terminal-background": "#111111",
    "terminal-foreground": "#dbdbdb",
    "terminal-bar": "#222222",
    "terminal-bar-foreground": "#dbdbdb",
    "viz-grid": "#323232",

    "viz-muted": "#6d6d6d",
    "viz-good": "#099d59",
    "viz-warning": "#cb8d00",
    "viz-critical": "#fc432e",
    "viz-running": "#5681ff",
    "viz-merged": "#ad69e9",
    "ink-good": "#18c16e",
    "ink-warning": "#da9f00",
    "ink-critical": "#ff8678",
    "ink-running": "#7ca9fc",
    "ink-merged": "#c595f0",
    "ink-agent": "#3fb1ff",
    "ink-muted": "#afafaf",
    "ink-repeat": "#0ebe9c",
    "ink-wakeup": "#ff80ab",
    "mode-manual": "#afafaf",
    "mode-plan": "#0ebe9c",
    "mode-accept": "#c595f0",
    "mode-danger": "#ff8678",
    "mode-auto": "#da9f00",
    "kind-wsl": "#18c16e",
    "kind-windows": "#7ca9fc",
    "kind-cloud": "#c595f0",
    "kind-ssh": "#dc9a76",
  },
};
