---
setup: []
---

Nothing to install: `package.json` has no dependencies and there is no lockfile. The scripts
(`bun run build`, `bun run report`, `bun test`) run straight from the tracked sources with bun.

What they rely on outside the worktree:

- `bun` on the PATH.
- A prifly checkout, `~/src/prifly` by default or `PRIFLY_REPO`. `scripts/prifly-wire.ts` imports
  prifly's theme checker (`packages/wire/src`) and manifest reader
  (`apps/desktop-host/src/extensions`) from it, so the tests check against whatever that checkout
  is at.
