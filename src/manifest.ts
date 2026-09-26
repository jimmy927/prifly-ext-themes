/** The manifest prifly reads, made from the palettes (`scripts/build.ts` writes it). */
import { fonts, themes } from "./index";
import type { Font, Theme, Tokens } from "./types";

export const MANIFEST_ID = "themes";

function declared(tokens: Tokens): Record<string, string> {
  return Object.fromEntries(Object.entries(tokens).map(([name, value]) => [`--${name}`, value]));
}

function themeEntry(theme: Theme) {
  return {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    ...(theme.font === undefined ? {} : { font: theme.font }),
    ...(theme.light === undefined ? {} : { light: declared(theme.light) }),
    ...(theme.dark === undefined ? {} : { dark: declared(theme.dark) }),
  };
}

function fontEntry(font: Font) {
  return {
    id: font.id,
    name: font.name,
    description: font.description,
    ...(font.family === undefined
      ? {}
      : { family: font.family, fallback: font.fallback, files: font.files ?? [] }),
    ...(font.mono === undefined ? {} : { mono: font.mono }),
  };
}

export function manifest(version: string) {
  return {
    id: MANIFEST_ID,
    name: "Themes",
    description:
      "Colour themes for prifly: High Contrast, Daylight, Calm, Solarized, Terminal, Game Boy, Brutalist, IDE Classic and Code Modern — with the fonts Terminal and Game Boy suggest, and Brutalist's frames and shadows.",
    version,
    skin: { folder: "skin", styles: ["brutalist.css"] },
    fonts: fonts.map(fontEntry),
    themes: themes.map(themeEntry),
  };
}
