/**
 * Every theme through prifly's own check, and the manifest through prifly's
 * own reader — imported from a prifly checkout (`scripts/prifly-wire.ts`), so
 * the test asks exactly what the installed prifly will ask.
 */
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  contrast,
  fontInfos,
  Manifest,
  THEME_TOKENS,
  themeInfos,
  validateTheme,
} from "./scripts/prifly-wire";
import { themes } from "./src/index";
import { manifest } from "./src/manifest";
import { mix } from "./src/model-colours";
import { contrastOf, distanceOf, SERIES_APART, SERIES_CONTRAST, SERIES_INK_CONTRAST } from "./src/series-colours";
import { BRUTALIST_SIGNATURE } from "./src/themes/brutalist";
import type { Tokens } from "./src/types";

const root = import.meta.dir;
const raw: { version: string } = JSON.parse(
  readFileSync(join(root, "prifly-extension.json"), "utf8"),
);
const parsed = Manifest.parse(raw);
const installed = [{ manifest: parsed, folder: root, source: "", prompt: "", plugin: null }];

const MODES: Record<string, string[]> = {
  "high-contrast": ["light", "dark"],
  daylight: ["light"],
  calm: ["light", "dark"],
  solarized: ["light", "dark"],
  terminal: ["dark"],
  "game-boy": ["light"],
  brutalist: ["light"],
  "ide-classic": ["light", "dark"],
  "code-modern": ["light", "dark"],
  studio: ["light", "dark"],
};

const modesOf = (theme: { light?: Tokens; dark?: Tokens }) =>
  (["light", "dark"] as const).flatMap((mode) => {
    const tokens = theme[mode];
    return tokens === undefined ? [] : [{ mode, tokens }];
  });

describe("the manifest", () => {
  test("is what the palettes build (run `bun run build` after a change)", () => {
    expect(raw).toEqual(JSON.parse(JSON.stringify(manifest(raw.version))));
  });

  test("prifly reads every theme, font and the skin", () => {
    expect(parsed.id).toBe("themes");
    expect(parsed.themes.map((theme) => theme.id)).toEqual(Object.keys(MODES));
    expect(parsed.fonts.map((font) => font.id)).toEqual(["jetbrains-mono", "pixelify-sans"]);
    expect(parsed.skin).toEqual({
      folder: "skin",
      styles: ["brutalist.css"],
      with: ["brutalist"],
    });
    expect(existsSync(join(root, "skin", "brutalist.css"))).toBe(true);
  });

  test("each theme has the modes it promises", () => {
    for (const theme of themes) {
      expect([theme.id, modesOf(theme).map(({ mode }) => mode)]).toEqual([
        theme.id,
        MODES[theme.id] ?? [],
      ]);
    }
  });

  test("prifly's host finds nothing to warn about", () => {
    for (const info of themeInfos(installed))
      expect([info.id, info.warnings]).toEqual([info.id, []]);
  });

  test("a theme's font is one this extension offers", () => {
    const offered = new Set(fontInfos(installed).map((font) => font.id));
    for (const info of themeInfos(installed)) {
      if (info.font !== "") expect(offered.has(info.font)).toBe(true);
    }
  });

  test("every font file is there, with its licence beside it", () => {
    for (const font of parsed.fonts) {
      const files = [...font.files, ...(font.mono?.files ?? [])];
      expect(files.length).toBeGreaterThan(0);
      for (const { src } of files) {
        expect(existsSync(join(root, src))).toBe(true);
        expect(readFileSync(join(root, dirname(src), "OFL.txt"), "utf8")).toContain(
          "SIL Open Font License, Version 1.1",
        );
      }
    }
  });
});

describe("every theme", () => {
  for (const theme of themes) {
    for (const { mode, tokens } of modesOf(theme)) {
      test(`${theme.name} (${mode}) passes prifly's check untouched`, () => {
        const declared = Object.fromEntries(
          Object.entries(tokens).map(([name, value]) => [`--${name}`, value]),
        );
        const { notes, tokens: kept } = validateTheme(declared, mode);
        expect(notes).toEqual([]);
        expect(Object.keys(kept).length).toBe(Object.keys(tokens).length);
      });

      // prifly draws links and commit hashes in the primary, also inside an
      // inline-code chip (muted); its own check only pairs it with its foreground.
      test(`${theme.name} (${mode}) primary reads as link text`, () => {
        for (const surface of ["background", "card", "muted"]) {
          const ratio = contrast(tokens["primary"] ?? "", tokens[surface] ?? "");
          expect([surface, ratio >= 4.5]).toEqual([surface, true]);
        }
      });

      // The favourite star, on a plain row and on a favourite's row, which
      // prifly tints with favourite-surface (15% light, 25% dark; session-row.tsx).
      // prifly's own check leaves the star out.
      test(`${theme.name} (${mode}) favourite star stands out as an icon`, () => {
        const tint = mode === "light" ? 0.15 : 0.25;
        for (const surface of ["background", "card"]) {
          const plain = tokens[surface] ?? "";
          const tinted = mix(plain, tokens["favourite-surface"] ?? "", tint);
          for (const under of [plain, tinted]) {
            const ratio = contrast(tokens["favourite"] ?? "", under);
            expect([surface, under, ratio >= 3]).toEqual([surface, under, true]);
          }
        }
      });

      // The pie: eight slices, each readable on the card and background and
      // apart from the others, with one label colour readable on all of them.
      test(`${theme.name} (${mode}) pie colours are readable and apart, with a readable label`, () => {
        const slices = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => tokens[`viz-series-${n}`] ?? "");
        const ink = tokens["viz-series-ink"] ?? "";
        expect(ink).toBe(tokens["primary-foreground"] ?? "");
        slices.forEach((slice, i) => {
          for (const surface of ["card", "background"]) {
            const ratio = contrastOf(slice, tokens[surface] ?? "");
            expect([i + 1, surface, ratio >= SERIES_CONTRAST]).toEqual([i + 1, surface, true]);
          }
          expect([i + 1, contrastOf(ink, slice) >= SERIES_INK_CONTRAST]).toEqual([i + 1, true]);
          slices.slice(i + 1).forEach((other, j) => {
            const gap = distanceOf(slice, other);
            expect([i + 1, i + j + 2, gap >= SERIES_APART]).toEqual([i + 1, i + j + 2, true]);
          });
        });
      });

      test(`${theme.name} (${mode}) sets every token, leaning on none of prifly's`, () => {
        expect(Object.keys(tokens).sort()).toEqual(Object.keys(THEME_TOKENS).sort());
      });
    }
  }
});

describe("High Contrast", () => {
  const highContrast = themes.find((theme) => theme.id === "high-contrast");
  const TEXT = [
    ["foreground", "background"],
    ["card-foreground", "card"],
    ["popover-foreground", "popover"],
    ["muted-foreground", "muted"],
    ["muted-foreground", "card"],
    ["secondary-foreground", "secondary"],
    ["accent-foreground", "accent"],
    ["primary-foreground", "primary"],
    ["destructive-foreground", "destructive"],
    ["terminal-foreground", "terminal-background"],
    ["terminal-bar-foreground", "terminal-bar"],
  ];
  for (const { mode, tokens } of modesOf(highContrast ?? {})) {
    const at = (name: string) => tokens[name] ?? "";
    test(`${mode}: every word at 7:1 or better`, () => {
      const inks = Object.keys(tokens).filter((name) => /^(ink|mode|kind)-/.test(name));
      const pairs = [
        ...TEXT,
        ...inks.flatMap((ink) => [
          [ink, "card"],
          [ink, "background"],
        ]),
      ];
      for (const [fg = "", bg = ""] of pairs) {
        expect([fg, bg, contrast(at(fg), at(bg)) >= 7]).toEqual([fg, bg, true]);
      }
    });

    test(`${mode}: the focus ring stands out from every surface`, () => {
      for (const surface of ["background", "card", "popover", "muted"]) {
        expect(contrast(at("ring"), at(surface))).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
});

describe("the Brutalist skin", () => {
  const css = readFileSync(join(root, "skin", "brutalist.css"), "utf8").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
  );

  test("switches on for the Brutalist theme's signature and nothing else", () => {
    const query = Object.entries(BRUTALIST_SIGNATURE)
      .map(([name, value]) => `style(--${name}: ${value})`)
      .join(" and ");
    expect(css).toContain(`@container ${query} {`);
    // Every rule is inside that one query: it opens first and closes last.
    expect(css.trim().startsWith("@container")).toBe(true);
    expect(css.match(/@container/g)?.length).toBe(1);
  });

  test("no other theme carries the signature", () => {
    for (const theme of themes.filter((entry) => entry.id !== "brutalist")) {
      for (const { tokens } of modesOf(theme)) {
        const all = Object.entries(BRUTALIST_SIGNATURE).every(
          ([name, value]) => tokens[name] === value,
        );
        expect([theme.id, all]).toEqual([theme.id, false]);
      }
    }
  });

  test("stays stackable: regions only, tokens read never set, no !important, no literals", () => {
    const inner = css.slice(css.indexOf("{") + 1, css.lastIndexOf("}"));
    const selectors = [...inner.matchAll(/([^{}]+)\{/g)].flatMap((match) =>
      (match[1] ?? "").split(",").map((part) => part.trim()),
    );
    expect(selectors.length).toBeGreaterThan(0);
    for (const selector of selectors) expect(selector).toStartWith('[data-part="');
    expect(inner).not.toMatch(/--[a-z-]+\s*:/);
    expect(inner).not.toContain("!important");
    expect(inner).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
  });
});
