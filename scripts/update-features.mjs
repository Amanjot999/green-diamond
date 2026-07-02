#!/usr/bin/env node
/**
 * update-features.mjs — keeps FEATURES.md in sync with git history.
 *
 * Usage:
 *   node scripts/update-features.mjs              process the commit at HEAD
 *                                                 (called by scripts/git-hooks/post-commit)
 *   node scripts/update-features.mjs --backfill   regenerate FEATURES.md from full history
 *
 * Rules:
 *   - a commit whose subject starts with `feat:` / `feat(scope):` creates an entry
 *     (title = commit subject, description = commit body)
 *   - any commit that touches an entry's files bumps that entry's "Last updated"
 *     (renames are followed, so the file list stays current)
 *   - when ALL of an entry's files are deleted, the entry is marked removed —
 *     entries are never deleted or rewritten otherwise
 *   - the text under each `<!-- description -->` marker is preserved verbatim,
 *     so descriptions can be hand-edited
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

let repoRoot = "";
function git(...args) {
  return execFileSync("git", args, { encoding: "utf8", cwd: repoRoot || undefined });
}
repoRoot = git("rev-parse", "--show-toplevel").trim();

const FEATURES_PATH = join(repoRoot, "FEATURES.md");
// Changes to these never count as feature activity (the log must not track itself).
const IGNORED_FILES = new Set(["FEATURES.md", "STRUCTURE.md", "pnpm-lock.yaml"]);
const FEAT_RE = /^feat(\([^)]*\))?!?:\s*/;
const DESC_MARK = "<!-- description -->";

const HEADER = `# Feature Log

> **Auto-maintained — don't edit the generated bullet lines.**
> Updated by \`scripts/update-features.mjs\` via the git \`post-commit\` hook
> (activated by \`pnpm install\`, or manually: \`node scripts/setup-hooks.mjs\`).
>
> - A commit whose subject starts with \`feat:\` / \`feat(scope):\` adds an entry here
>   (title = commit subject, description = commit body).
> - Any later commit that touches a feature's files bumps its "Last updated"
>   (file renames are tracked).
> - When **all** of a feature's files are deleted, its entry is struck through and
>   marked removed. Entries are never deleted or rewritten otherwise.
> - The text below each \`${DESC_MARK}\` marker is yours — edit freely, it is preserved.
> - Rebuild from scratch: \`pnpm features:backfill\` (overwrites manual description edits).
`;

function commitInfo(ref) {
  const [subject = "", date = ""] = git("log", "-1", "--format=%s%n%ad", "--date=short", ref).split("\n");
  const body = git("log", "-1", "--format=%b", ref)
    .split("\n")
    .filter((l) => !/^(co-authored-by|signed-off-by):/i.test(l.trim()))
    .join("\n")
    .trim();
  const parents = git("log", "-1", "--format=%P", ref).trim().split(/\s+/).filter(Boolean);
  if (parents.length > 1) return { subject, date, body, changes: [] }; // skip merge commits
  const raw = git("diff-tree", "--no-commit-id", "--name-status", "-r", "-M", "--root", ref).trim();
  const changes = [];
  for (const line of raw ? raw.split("\n") : []) {
    const parts = line.split("\t");
    const status = parts[0][0];
    if (status === "R" || status === "C") changes.push({ status, from: parts[1], to: parts[2] });
    else changes.push({ status, from: parts[1], to: parts[1] });
  }
  return { subject, date, body, changes };
}

const BLOCK_RE = /<!-- feature:begin ([^\n]*?) -->\n([\s\S]*?)\n<!-- feature:end -->/g;

function parseAttrs(s) {
  const attrs = {};
  for (const m of s.matchAll(/(\w+)="([^"]*)"/g)) attrs[m[1]] = m[2];
  return attrs;
}

function parseBlockBody(body) {
  const at = body.indexOf(DESC_MARK);
  const head = at === -1 ? body : body.slice(0, at);
  const description = at === -1 ? "" : body.slice(at + DESC_MARK.length).trim();
  const titleLine = head.split("\n").find((l) => l.startsWith("### "));
  const title = titleLine ? titleLine.slice(4).trim().replace(/^~~(.*)~~$/, "$1") : "";
  return { title, description };
}

function loadEntries(content) {
  const entries = [];
  const segments = []; // alternating literal text + entry refs, for lossless reassembly
  let last = 0;
  for (const m of content.matchAll(BLOCK_RE)) {
    segments.push({ text: content.slice(last, m.index) });
    const attrs = parseAttrs(m[1]);
    const { title, description } = parseBlockBody(m[2]);
    const entry = {
      id: attrs.id ?? "",
      status: attrs.status ?? "active",
      added: attrs.added ?? "",
      updated: attrs.updated ?? "",
      updatedBy: attrs.updatedBy ?? "",
      removed: attrs.removed ?? "",
      createdBy: attrs.createdBy ?? "",
      files: attrs.files ? attrs.files.split(",").filter(Boolean) : [],
      title: title || attrs.id || "(untitled feature)",
      description,
    };
    entries.push(entry);
    segments.push({ entry });
    last = m.index + m[0].length;
  }
  segments.push({ text: content.slice(last) });
  return { entries, segments };
}

function esc(s) {
  return String(s).replaceAll('"', "'");
}

function renderEntry(e) {
  const attrs =
    `id="${esc(e.id)}" status="${e.status}" added="${e.added}" updated="${esc(e.updated)}" ` +
    `updatedBy="${esc(e.updatedBy)}" removed="${e.removed}" createdBy="${esc(e.createdBy)}" ` +
    `files="${esc(e.files.join(","))}"`;
  const title = e.status === "removed" ? `### ~~${e.title}~~` : `### ${e.title}`;
  const bullets = [`- Added: ${e.added}`];
  if (e.updated) bullets.push(`- Last updated: ${e.updated} — \`${e.updatedBy}\``);
  if (e.status === "removed") {
    bullets.push(`- **Removed: ${e.removed}** — all of this feature's files were deleted`);
  } else {
    bullets.push(`- Files tracked: ${e.files.length}`);
  }
  const description = e.description || "_No description in the commit message._";
  return `<!-- feature:begin ${attrs} -->\n${title}\n\n${bullets.join("\n")}\n\n${DESC_MARK}\n${description}\n<!-- feature:end -->`;
}

function slugify(s) {
  const slug = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  return slug || "feature";
}

function applyCommit(entries, info) {
  const changes = info.changes.filter((c) => !IGNORED_FILES.has(c.from) && !IGNORED_FILES.has(c.to));
  const isFeat = FEAT_RE.test(info.subject);
  if (!changes.length && !isFeat) return;

  // 1. Update existing entries whose files this commit touched.
  for (const e of entries) {
    if (e.status === "removed") continue;
    // Re-running on the commit that created this entry must be a no-op.
    if (e.createdBy && e.createdBy === info.subject && e.added === info.date) continue;
    let touched = false;
    for (const c of changes) {
      const i = e.files.indexOf(c.from);
      if (i === -1) continue;
      touched = true;
      if (c.status === "D") e.files.splice(i, 1);
      else if (c.status === "R") e.files[i] = c.to;
    }
    if (touched) {
      e.updated = info.date;
      e.updatedBy = info.subject;
      if (e.files.length === 0) {
        e.status = "removed";
        e.removed = info.date;
      }
    }
  }

  // 2. feat: commits create a new entry.
  if (isFeat) {
    const rawTitle = info.subject.replace(FEAT_RE, "").trim();
    const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
    const id = slugify(rawTitle);
    if (entries.some((e) => e.id === id)) return; // already logged
    const added = changes.filter((c) => c.status === "A").map((c) => c.to);
    const files = added.length
      ? added
      : changes.filter((c) => "MRT".includes(c.status)).map((c) => c.to);
    if (!files.length) return;
    entries.push({
      id,
      status: "active",
      added: info.date,
      updated: "",
      updatedBy: "",
      removed: "",
      createdBy: info.subject,
      files: [...new Set(files)],
      title,
      description: info.body,
    });
  }
}

function assemble(segments, entries) {
  const placed = new Set(segments.filter((s) => s.entry).map((s) => s.entry));
  let out = "";
  for (const s of segments) out += s.entry ? renderEntry(s.entry) : s.text;
  for (const e of entries) {
    if (placed.has(e)) continue;
    out = out.replace(/\s*$/, "\n\n");
    out += renderEntry(e) + "\n";
  }
  return out.replace(/\s*$/, "\n");
}

// ---- main -------------------------------------------------------------------
const mode = process.argv[2];
const before = existsSync(FEATURES_PATH) ? readFileSync(FEATURES_PATH, "utf8") : null;
const base = mode === "--backfill" || before === null ? HEADER : before;
const { entries, segments } = loadEntries(base);

if (mode === "--backfill") {
  const refs = git("rev-list", "--reverse", "HEAD").trim().split("\n").filter(Boolean);
  for (const ref of refs) applyCommit(entries, commitInfo(ref));
} else {
  applyCommit(entries, commitInfo("HEAD"));
}

const out = assemble(segments, entries);
if (out !== before) {
  writeFileSync(FEATURES_PATH, out);
  console.log(`FEATURES.md updated (${entries.length} entr${entries.length === 1 ? "y" : "ies"}).`);
} else {
  console.log("FEATURES.md already up to date.");
}
