import type { Theme } from "../types";

/**
 * Terminal: a P1-phosphor green screen — green on near-black, drawn in
 * JetBrains Mono for text and code alike. Dark only.
 *
 * The chrome is all green, but the states cannot be: done, failed, warning
 * and running must stay apart, so they borrow the rest of an old terminal's
 * palette — amber (the other phosphor), red, cyan — leaving green for done.
 */
export const terminal: Theme = {
  id: "terminal",
  name: "Terminal",
  description: "Phosphor green on near-black, set in a monospace font. Dark only.",
  font: "jetbrains-mono",
  dark: {
    background: "#050a06",
    foreground: "#4dff7a",
    card: "#08110a",
    "card-foreground": "#4dff7a",
    popover: "#0b170e",
    "popover-foreground": "#4dff7a",
    primary: "#33e066",
    "primary-foreground": "#031006",
    secondary: "#0f2214",
    "secondary-foreground": "#7dffa0",
    muted: "#0e1f12",
    "muted-foreground": "#2fc257",
    accent: "#133019",
    "accent-foreground": "#8cffae",
    destructive: "#ff5c4d",
    "destructive-foreground": "#050a06",
    border: "#16361d",
    input: "#1f4a28",
    ring: "#7dffa0",
    favourite: "#ffb000",
    "favourite-surface": "#ffc233",
    backdrop: "#000000",
    "badge-foreground": "#031006",
    "terminal-background": "#050a06",
    "terminal-foreground": "#4dff7a",
    "terminal-bar": "#0b170e",
    "terminal-bar-foreground": "#33e066",
    "viz-grid": "#12291a",

    "viz-muted": "#2a7a40",
    "viz-good": "#33e066",
    "viz-warning": "#ffb000",
    "viz-critical": "#ff4d4d",
    "viz-running": "#33c7ff",
    "viz-merged": "#c28cff",
    "ink-good": "#4dff7a",
    "ink-warning": "#ffb000",
    "ink-critical": "#ff6b5c",
    "ink-running": "#5cd6ff",
    "ink-merged": "#cfa3ff",
    "ink-agent": "#66ffe0",
    "ink-muted": "#2fb052",
    "ink-repeat": "#66ffe0",
    "ink-wakeup": "#ff8ce0",
    "mode-manual": "#2fb052",
    "mode-plan": "#66ffe0",
    "mode-accept": "#cfa3ff",
    "mode-danger": "#ff6b5c",
    "mode-auto": "#ffb000",
    "kind-wsl": "#4dff7a",
    "kind-windows": "#5cd6ff",
    "kind-cloud": "#cfa3ff",
    "kind-ssh": "#ffb000",
  },
};
