/**
 * Writes `prifly-extension.json` from the palettes in `src/`. The manifest is
 * checked in (prifly reads it straight from the folder); the test fails when
 * it and the palettes disagree, so run this after changing a colour.
 */
import { manifest } from "../src/manifest";

const file = new URL("../prifly-extension.json", import.meta.url);
const version = process.env["THEMES_VERSION"] ?? (await Bun.file(file).json().catch(() => ({ version: "0.1.0" }))).version;
await Bun.write(file, `${JSON.stringify(manifest(version), null, 2)}\n`);
console.log(`wrote prifly-extension.json (version ${version})`);
