import type { Theme } from "../types";

/**
 * Studio: inspired by Adobe Photoshop. The name is Adobe's, so the theme has
 * its own. The greys are Photoshop's own, read off pixels: dark is its
 * default "Dark" interface, light its "Lightest".
 *
 * - greys: from the Photoshop 2025 window on Wikipedia and Adobe's UXP design
 *   guide (AdobeDocs/uxp-photoshop, design/ux-images: dark-themes.png,
 *   light-themes.png, photoshop-panel.png). Dark: #535353 panels, menu bar
 *   and toolbar; #424242 tab strips and panel headers; #6b6b6b the selected
 *   layer row; #282828 the canvas surround (here the terminal); #383838
 *   wells; #e3e3e3 text, #b9b9b9 labels. Light: #f0f0f0 panels, #d1d1d1 tab
 *   strips, #e1e1e1 the canvas surround, #bfbfbf rules, white fields with a
 *   #d3d3d3 edge, #4b4b4b text, #8b8b8b labels.
 * - colours: Spectrum's (`@adobe/spectrum-tokens` 15.4, Apache-2.0), the
 *   system Photoshop's panels are drawn in — the #3b63fb accent, the
 *   positive, negative and purple, cyan, seafoam, magenta and cinnamon
 *   scales. Warning is the yellow scale, since prifly's check finds the
 *   notice orange too close to the negative red.
 * - lifted: Photoshop's grey is a mid-grey, so on dark every coloured word,
 *   the link blue and the labels are Spectrum's hue stepped toward white
 *   until it reads at 4.5:1 on the panel greys (bars and dots at 3:1); on
 *   light the labels and the link blue a step darker for the #e1e1e1 wells.
 */
export const studio: Theme = {
  id: "studio",
  name: "Studio",
  description:
    "Inspired by Adobe Photoshop: its own interface greys, with the Spectrum accent blue and state colours.",
  light: {
    background: "#f0f0f0",
    foreground: "#4b4b4b",
    card: "#ffffff",
    "card-foreground": "#4b4b4b",
    popover: "#ffffff",
    "popover-foreground": "#4b4b4b",
    primary: "#274dea",
    "primary-foreground": "#ffffff",
    secondary: "#d1d1d1",
    "secondary-foreground": "#4b4b4b",
    muted: "#e1e1e1",
    "muted-foreground": "#616161",
    accent: "#d3d3d3",
    "accent-foreground": "#333333",
    destructive: "#d73220",
    "destructive-foreground": "#ffffff",
    border: "#bfbfbf",
    input: "#d3d3d3",
    ring: "#4b75ff",
    favourite: "#af7400",
    "favourite-surface": "#f5c700",
    backdrop: "#000000",
    "badge-foreground": "#ffffff",
    "terminal-background": "#ffffff",
    "terminal-foreground": "#4b4b4b",
    "terminal-bar": "#d1d1d1",
    "terminal-bar-foreground": "#4b4b4b",
    "viz-grid": "#d1d1d1",

    "viz-muted": "#7e7e7e",
    "viz-good": "#079053",
    "viz-warning": "#a47400",
    "viz-critical": "#eb3722",
    "viz-running": "#3b63fb",
    "viz-merged": "#a35ae2",
    "ink-good": "#036e45",
    "ink-warning": "#865500",
    "ink-critical": "#b72818",
    "ink-running": "#274dea",
    "ink-merged": "#8628d9",
    "ink-agent": "#046691",
    "ink-muted": "#616161",
    "ink-repeat": "#056c5c",
    "ink-wakeup": "#ba1650",
    "mode-manual": "#616161",
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
    background: "#535353",
    foreground: "#e3e3e3",
    card: "#424242",
    "card-foreground": "#e3e3e3",
    popover: "#424242",
    "popover-foreground": "#e3e3e3",
    primary: "#aecafd",
    "primary-foreground": "#111111",
    secondary: "#6b6b6b",
    "secondary-foreground": "#ffffff",
    muted: "#4a4a4a",
    "muted-foreground": "#cacaca",
    accent: "#6b6b6b",
    "accent-foreground": "#ffffff",
    destructive: "#fc432e",
    "destructive-foreground": "#111111",
    border: "#383838",
    input: "#6b6b6b",
    ring: "#5681ff",
    favourite: "#cb8d00",
    "favourite-surface": "#da9f00",
    backdrop: "#000000",
    "badge-foreground": "#111111",
    "terminal-background": "#282828",
    "terminal-foreground": "#e3e3e3",
    "terminal-bar": "#424242",
    "terminal-bar-foreground": "#e3e3e3",
    "viz-grid": "#5b5b5b",

    "viz-muted": "#a7a7a7",
    "viz-good": "#4eb887",
    "viz-warning": "#d29d24",
    "viz-critical": "#fd8375",
    "viz-running": "#82a2ff",
    "viz-merged": "#c290ef",
    "ink-good": "#7edcae",
    "ink-warning": "#e9c566",
    "ink-critical": "#ffb9b1",
    "ink-running": "#aecafd",
    "ink-merged": "#dbbdf6",
    "ink-agent": "#8cd0ff",
    "ink-muted": "#cacaca",
    "ink-repeat": "#78dbc8",
    "ink-wakeup": "#ffb3cd",
    "mode-manual": "#cacaca",
    "mode-plan": "#78dbc8",
    "mode-accept": "#dbbdf6",
    "mode-danger": "#ffb9b1",
    "mode-auto": "#e9c566",
    "kind-wsl": "#7edcae",
    "kind-windows": "#aecafd",
    "kind-cloud": "#dbbdf6",
    "kind-ssh": "#e9c0aa",
  },
};
