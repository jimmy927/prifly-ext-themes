import type { Theme } from "../types";

/**
 * Game Boy: the original DMG screen's four greens and nothing else for the
 * chrome —
 *
 *   #0f380f darkest   #306230 dark   #8bac0f light   #9bbc0f lightest
 *
 * — and a pixel font, Pixelify Sans, for the text (code stays in prifly's
 * monospace). Light only: the screen was never dark.
 *
 * The state colours keep prifly's hues — red for failed, blue for running,
 * amber for waiting — rather than turning green, where done and failed would
 * be one colour — and so does the destructive button, so deleting never
 * looks like the default action. They are stepped much darker than prifly's, because the
 * greens are mid-tones: prifly's own inks read at 2–3:1 on #8bac0f.
 */
export const gameBoy: Theme = {
  id: "game-boy",
  name: "Game Boy",
  description: "The original handheld's four greens and a pixel font. Light only.",
  font: "pixelify-sans",
  light: {
    background: "#8bac0f",
    foreground: "#0f380f",
    card: "#9bbc0f",
    "card-foreground": "#0f380f",
    popover: "#9bbc0f",
    "popover-foreground": "#0f380f",
    primary: "#0f380f",
    "primary-foreground": "#9bbc0f",
    secondary: "#8bac0f",
    "secondary-foreground": "#0f380f",
    muted: "#8bac0f",
    "muted-foreground": "#0f380f",
    accent: "#8bac0f",
    "accent-foreground": "#0f380f",
    destructive: "#6b0000",
    "destructive-foreground": "#9bbc0f",
    border: "#306230",
    input: "#306230",
    ring: "#0f380f",
    favourite: "#0f380f",
    "favourite-surface": "#306230",
    backdrop: "#0f380f",
    "badge-foreground": "#9bbc0f",
    "terminal-background": "#0f380f",
    "terminal-foreground": "#9bbc0f",
    "terminal-bar": "#0f380f",
    "terminal-bar-foreground": "#9bbc0f",
    "viz-grid": "#306230",

    "viz-muted": "#1f4a1f",
    "viz-good": "#0f380f",
    "viz-warning": "#7a4500",
    "viz-critical": "#7a0f0f",
    "viz-running": "#15307a",
    "viz-merged": "#4a1a7a",
    "ink-good": "#0f380f",
    "ink-warning": "#4a2a00",
    "ink-critical": "#6b0000",
    "ink-running": "#00207a",
    "ink-merged": "#3d0f70",
    "ink-agent": "#003a45",
    "ink-muted": "#1f3d1f",
    "ink-repeat": "#003a3a",
    "ink-wakeup": "#5c0a4a",
    "mode-manual": "#1f3d1f",
    "mode-plan": "#003a3a",
    "mode-accept": "#3d0f70",
    "mode-danger": "#6b0020",
    "mode-auto": "#4a2a00",
    "kind-wsl": "#0f380f",
    "kind-windows": "#00207a",
    "kind-cloud": "#3d0f70",
    "kind-ssh": "#4a2a00",
  },
};
