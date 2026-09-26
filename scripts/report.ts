/**
 * Every theme through prifly's own check, and a contrast table of the pairs
 * it reads: `bun scripts/report.ts [theme-id]`.
 */
import { themes } from "../src/index";
import { contrast, validateTheme } from "./prifly-wire";

const only = process.argv[2];
for (const theme of themes) {
  if (only !== undefined && theme.id !== only) continue;
  for (const mode of ["light", "dark"] as const) {
    const tokens = theme[mode];
    if (tokens === undefined) continue;
    const declared = Object.fromEntries(Object.entries(tokens).map(([k, v]) => [`--${k}`, v]));
    const { notes } = validateTheme(declared, mode);
    console.log(`${theme.name} (${mode}): ${notes.length === 0 ? "clean" : `${notes.length} notes`}`);
    for (const note of notes) console.log(`  ${note.kind}: ${note.message}`);
    if (only !== undefined) {
      const t = tokens;
      const rows: [string, string][] = [
        ["foreground", "background"], ["card-foreground", "card"], ["muted-foreground", "muted"],
        ["muted-foreground", "card"], ["secondary-foreground", "secondary"], ["accent-foreground", "accent"],
        ["primary-foreground", "primary"], ["destructive-foreground", "destructive"],
      ];
      for (const name of Object.keys(t)) if (/^(ink|mode|kind)-/.test(name)) rows.push([name, "card"], [name, "background"]);
      for (const [fg, bg] of rows) {
        const a = t[fg]; const b = t[bg];
        if (a && b) console.log(`    ${fg} on ${bg}: ${contrast(a, b).toFixed(2)}`);
      }
    }
  }
}
