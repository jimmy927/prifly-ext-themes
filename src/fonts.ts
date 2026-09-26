import type { Font } from "./types";

/**
 * The fonts the themes suggest, shipped in `fonts/` with their licences
 * (SIL Open Font License 1.1, `fonts/<font>/OFL.txt`). Variable TTFs from
 * Google Fonts' repository: one file covers every weight.
 */
export const fonts: Font[] = [
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    description: "A monospace for text and code alike, as a terminal draws everything. Terminal's font.",
    family: "JetBrains Mono",
    fallback: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
    files: [{ src: "fonts/jetbrains-mono/JetBrainsMono-wght.ttf", weight: "100 800" }],
    mono: {
      family: "JetBrains Mono",
      fallback: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
      files: [{ src: "fonts/jetbrains-mono/JetBrainsMono-wght.ttf", weight: "100 800" }],
    },
  },
  {
    id: "pixelify-sans",
    name: "Pixelify Sans",
    description:
      "A pixel font drawn to stay readable at text sizes; code keeps prifly's monospace. Game Boy's font.",
    family: "Pixelify Sans",
    fallback: "system-ui, sans-serif",
    files: [{ src: "fonts/pixelify-sans/PixelifySans-wght.ttf", weight: "400 700" }],
  },
];
