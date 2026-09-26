/**
 * prifly's own theme check, imported from a prifly checkout rather than copied:
 * the rules a theme must pass are the ones the installed prifly applies.
 * `PRIFLY_REPO` names the checkout; `~/src/prifly` by default.
 */
import { homedir } from "node:os";
import { join } from "node:path";

const repo = process.env["PRIFLY_REPO"] ?? join(homedir(), "src", "prifly");
const wire = join(repo, "packages", "wire", "src");

type Mode = "light" | "dark";
type Note = { token: string; kind: string; message: string };
type Check = { tokens: Record<string, string>; notes: Note[] };

const check: {
  validateTheme: (declared: Record<string, string>, mode: Mode) => Check;
  contrast: (a: string, b: string) => number;
  distance: (a: string, b: string) => number;
} = await import(join(wire, "theme-check.ts"));
const theme: { THEME_TOKENS: Record<string, "chrome" | "state"> } = await import(
  join(wire, "theme.ts")
);

export const { validateTheme, contrast, distance } = check;
export const { THEME_TOKENS } = theme;

/** prifly's own reading of a manifest, and what the host sends the window from it. */
const host = join(repo, "apps", "desktop-host", "src", "extensions");
const installed: { Manifest: { parse: (raw: unknown) => PriflyManifest } } = await import(
  join(host, "installed.ts")
);
const hostTheme: { themeInfos: (installed: HostInstalled[]) => { id: string; font: string; warnings: string[] }[] } =
  await import(join(host, "theme.ts"));
const hostFont: { fontInfos: (installed: HostInstalled[]) => { id: string }[] } = await import(
  join(host, "font.ts")
);

export type PriflyManifest = {
  id: string;
  skin?: { folder: string; styles: string[] };
  themes: { id: string; font: string }[];
  fonts: { id: string; files: { src: string }[]; mono?: { files: { src: string }[] } }[];
};
type HostInstalled = { manifest: PriflyManifest; folder: string; source: string; prompt: string; plugin: null };

export const { Manifest } = installed;
export const { themeInfos } = hostTheme;
export const { fontInfos } = hostFont;
