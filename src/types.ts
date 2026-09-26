/**
 * The shape the palettes are written in, and turned into the manifest by
 * `scripts/build.ts`. Token names without the leading `--`; the build adds it.
 *
 * Which names exist, and which of them are STATE (a failing one reverts to
 * prifly's own) or CHROME (a failing one is kept, with a warning), is prifly's
 * `packages/wire/src/theme.ts` — the test checks every name against it.
 */

export type Tokens = Readonly<Record<string, string>>;

export type Theme = {
  id: string;
  name: string;
  description: string;
  light?: Tokens;
  dark?: Tokens;
  /** A font id of this extension's, used while the reader's font choice is "the theme's". */
  font?: string;
};

export type FontFile = { src: string; weight: string };

export type Font = {
  id: string;
  name: string;
  description: string;
  /** The page's text (`--font-sans`); left out, prifly's stays. */
  family?: string;
  fallback?: string;
  files?: FontFile[];
  /** Code, diffs and the terminal (`--font-mono`); left out, prifly's stays. */
  mono?: { family: string; fallback: string; files: FontFile[] };
};
