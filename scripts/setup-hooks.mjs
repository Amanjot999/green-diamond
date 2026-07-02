#!/usr/bin/env node
// Point git at the repo's committed hooks (runs automatically via the root
// "prepare" script on pnpm install). Silent no-op outside a git checkout.
import { execFileSync } from "node:child_process";

try {
  execFileSync("git", ["config", "core.hooksPath", "scripts/git-hooks"], { stdio: "ignore" });
  console.log("git hooks path set to scripts/git-hooks");
} catch {
  // Not a git repo (e.g. installing from a tarball) — nothing to do.
}
