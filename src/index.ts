/** The extension's themes, in the order the picker lists them, and its fonts. */
import { fonts } from "./fonts";
import { brutalist } from "./themes/brutalist";
import { calm } from "./themes/calm";
import { codeModern } from "./themes/code-modern";
import { daylight } from "./themes/daylight";
import { gameBoy } from "./themes/game-boy";
import { highContrast } from "./themes/high-contrast";
import { ideClassic } from "./themes/ide-classic";
import { solarized } from "./themes/solarized";
import { terminal } from "./themes/terminal";
import type { Theme } from "./types";

export const themes: Theme[] = [
  highContrast,
  daylight,
  calm,
  solarized,
  terminal,
  gameBoy,
  brutalist,
  ideClassic,
  codeModern,
];

export { fonts };
