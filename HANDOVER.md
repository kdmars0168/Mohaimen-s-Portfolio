# HANDOVER — Portfolio: Refine Original Design + Rebuild Classic Résumé Engine

**Date written:** 2026-10-01 (AWST)
**Status (updated 2026-10-01, execution session):** EXECUTING the revised plan in §6. Branch `codex/portfolio-refine` created from `origin/main` @ `2a5fa16` (origin/main had advanced by one README-only commit since the handover was written; `daa8776` is its parent and the live design is unchanged). Nothing pushed. Nothing deployed. Live site untouched.
**Repos:** `kdmars0168/Mohaimen-s-Portfolio` (portfolio) + `G:\job-hunt` (résumé engine/dossier)
**Live:** https://mohaimen-portfolio.vercel.app/

## 0. Next session — start here

1. This file is already saved at the portfolio worktree root (written 2026-10-01). Create `codex/portfolio-refine` from `origin/main` — the untracked `HANDOVER.md` survives the checkout — and commit it as the first commit on that branch.
2. Append the pointer to `G:\job-hunt\HANDOVER.md` §10 (exact wording in §7).
3. Execute the approved plan (§6): Stage A → Stage B → **user review gate** → Stage C → deploy.

## 1. Current state (verified 2026-10-01)

| What | Where | State |
|---|---|---|
| Live site (OLD design) | https://mohaimen-portfolio.vercel.app/ | `origin/main` @ `daa8776` — **this is the design to keep and refine** |
| Main checkout | `G:\portfolio project` | on `main` @ daa8776, clean, in sync with origin |
| Agent worktree | `C:\Users\Asus\.codex\worktrees\d1c6\portfolio project` | on `codex/portfolio-refresh` @ `2769897` — noir redesign; **REJECTED as a design; keep as history, never merge** |
| Dev server | http://localhost:4173 | running (PID 19340), serves the noir build from the worktree |
| Résumé engine | `G:\job-hunt\tools\render.py` | `kind` = `cv`/`statement`; builds .docx then exports PDF via Word COM (`to_pdf_and_count`). Reproduces an older/other CV format ≠ the user's 2024 template |
| Résumé source | `G:\job-hunt\resumes\portfolio-resume.md` | current markdown → wrong format; to be rewritten classic |
| Python venv | `G:\job-hunt\app\.venv\Scripts\python.exe` | python-docx + win32com ready |
| Template originals | `C:\Users\Asus\Downloads\Documents\` | `Copy of Mohaimen Rashid- RESUME 2024.docx` + `Mohaimen Rashid- RESUME 2024.pdf` |
| Template analysis rig | `C:\Users\Asus\AppData\Local\Temp\resume-template\` | analyze.py, dump_tables.py, dump_numbering.py, find_borders.py, measure_pdf.py, dump.json, tpl-1.png, docx/ |
| QA rig | `%TEMP%\portfolio-qa\` | old-top.png, old-tall.png, pw/ (playwright-core rig), pw-d-*.png section screenshots, og.html/og.png |
| Lockfiles | portfolio root | `bun.lockb` + `package-lock.json` — keep both in sync |

**Assets to harvest from the noir branch (copy, not merge):**
- `src/data/portfolio.ts` — all dossier-verified content (single source of truth)
- `src/components/ResumeSection.tsx` + `ResumeViewer.tsx` — react-pdf 10.2.0 / pdfjs-dist 5.4.296 viewer (default is `scale=1` + fit-width button; change default to `min(0.85, fit-width)`)
- `public/fonts/` — geist-latin-var.woff2, geist-mono-latin-var.woff2, fraunces-latin-var.woff2
- `docs/ui-standards.md` + `design-qa.md` + `README.md` — patterns to re-baseline, not reuse as-is
- `public/Mohaimen-Rashid-Resume.pdf` — placeholder; replaced in Stage B

**Old design (base) facts:** `src/pages/Index.tsx` composes Header (fixed nav + theme toggle), ProfileSection, ProjectsSection/ProjectCard (embla carousels + expanded dialog), SkillsSection (Expertise), Services, WorkExperience, Education, Certifications, Testimonials (embla + autoplay), ContactForm (Formspree `mpwqynrn`), Footer. `use-theme.tsx` follows system + toggle (no persistence). `Hero.tsx` and `AnimatedBackground.tsx` are dead files (not imported) — leave them. `index.html` still has the Lovable `gptengineer.js` loader + placeholder meta; `package.json` homepage still points at GitHub Pages on main.

## 2. What was done this session

- **Phase 0 skill intake:** full read of the UI/UX skill set (22 craft/system/motion skills + verification skills + the product-design plugin) → distilled into `docs/ui-standards.md` (noir contract).
- **Built the full noir/champagne redesign** (branch `codex/portfolio-refresh` @ 2769897): dark-first tokens, editorial layout, dossier-verified `portfolio.ts`, lazy-loaded resume viewer, self-hosted fonts, QA screenshots, a11y pass.
- **Reversal #1 — design:** user does NOT want the new frontend. Keep the OLD design; refine it in place (fonts, spacing, motion, carousels). "Subtle changes outside, proper deep dive inside."
- **Reversal #2 — viewer zoom:** 100% is too far in for an average user; fit-width alone not wanted → default `min(0.85, fit-width)`.
- **Résumé format:** engine output still not the right format / not ATS-best. User supplied their preferred 2024 template (PDF + DOCX) and demanded the engine reproduce it exactly, emitting BOTH `.docx` and `.pdf` every render ("end of discussion"). Template reverse-engineered to measurements (§4).
- **ATS deep dive:** both pasted recruiter posts analysed against primary sources → verified findings (§5).
- **Motion correction (2026-10-01, post-handover):** user explicitly wants MORE beautiful animation/motion — motion is a headline refinement goal, not something to tone down. Wording fixed across this file; `prefers-reduced-motion` remains only as an OS-level accessibility fallback that never affects normal visitors.
- **Locked decisions** captured (§3); approved plan recorded (§6); session wrapped with this handover.

## 3. Locked decisions (do not re-litigate)

1. Base = the existing live design (`daa8776`). Refine in place; keep every section, component and feature. No redesign, no removals.
2. Site font: Geist (self-hosted; already in `public/fonts`).
3. Theme: follows system, toggle retained (matches existing `use-theme`); add pre-paint script (no flash) + persist the toggle choice.
4. Résumé viewer default zoom: `min(0.85, fit-width)`.
5. Engine emits `.docx` AND `.pdf` on every render — non-negotiable.
6. Résumé template: match the 2024 docx exactly (§4). Phone `+61413249236` goes in the public contact line ("Match template exactly").
7. Content: dossier-verified only (`me.md`, `master-it.yaml`); name `Mohaimen Rashid (Shanin)`; email `shaninrashid00@gmail.com`; no work-rights claims; no hospitality; no invented numbers. All 8 testimonials verbatim; exactly 7 certifications (duplicate SQL removed).
8. Deploy only after the user reviews the refined site + the new PDF/DOCX.
9. Motion (post-handover correction, 2026-10-01): rich, plentiful, beautiful animation is a headline goal. `prefers-reduced-motion` is an OS-level accessibility fallback only — it applies exclusively to visitors who enabled "reduce motion" in their OS settings and never reduces motion for standard visitors.

## 4. Target résumé spec — measured from the 2024 template

Source of truth: `Copy of Mohaimen Rashid- RESUME 2024.docx` + its PDF export (visual truth).

- Page: US Letter 612×792 pt. Text frame: left 51.1 pt, right ≈568 pt; full-bleed bands/rules span x ≈ 0–612 pt.
- Font: **Lora** throughout.
- Name 20 pt centred (spacing before 444 twips); contact line 8 pt centred (before 190).
- Section headings 10 pt **bold UPPERCASE** (after 100 twips; indent left 850 / right −189).
- Body/entries/bullets 8 pt, single line spacing.
- **Professional summary:** full-bleed `#F3F3F3` shaded band (tcMar 170 twips, tblW 12211 dxa).
- **Section rules:** full-bleed 1 pt `#CCCCCC` bottom border under every section EXCEPT the summary.
- **Entries:** `**Bold Role** | Org | Period | Location`; subsequent entries +115 twips (5.75 pt) before.
- **Bullets:** `●` (U+25CF); indent left 1440 twips / hanging 360 / right 686.
- **Hyperlinks:** `#1155CC` single underline — LinkedIn (`linkedin.com/in/mohaimenrashid`; the template's stale `-6809a8206` URL must NOT be used), GitHub, Portfolio.
- Contact line: `Email: shaninrashid00@gmail.com | Mobile: +61413249236 | LinkedIn | Github | Portfolio | Address: Perth, AU`.
- Inline bold labels: `Key Modules:`, `Skills:`, `Certifications:` — comma-separated lists.
- Closing: centred `References Available on Request` (8 pt).
- **Implementation rule:** the template uses one-cell tables — replace them with paragraph shading + pBdr borders + negative indents (identical look, **zero tables**, ATS-safe).

## 5. ATS deep dive — verified findings (both pasted posts + primary sources)

| Claim | Verdict | Action taken |
|---|---|---|
| "75% of résumés are auto-rejected" | **Myth** — traces to Preptel 2012 (defunct company's sales pitch) | Never cite |
| Tables/columns/headers/footers/text boxes/graphics/image uploads/unclear sections/incomplete titles break parsing | **Confirmed** — Greenhouse official doc "Unsuccessful resume parse" (Mar 2026; includes 2.5 MB limit) | Engine: zero tables, single column, body contact info, no graphics, full titles |
| Exact job title / exact terms help | **Partly true** — search is literal; but "10.6×", "99.7%" claims have no source | Tailor with true JD vocabulary; never claim unheld titles |
| "25–35 keywords is the sweet spot" | **Unverified** | No keyword counts; true terms only, in context |
| White/hidden text works | **Flagged/penalised** (strong consensus) | Prohibited |
| ".docx beats .pdf" | **Overstated** — Greenhouse accepts both; legacy portals (e.g. older Taleo) parse docx more reliably | Emit both; portal-aware upload guidance |
| "83% of résumés are filtered by AI" | Traces to Resume Builder Oct-2024 survey (948 leaders) | Context only, never a claim |
| Consistent date formats matter | **Plausible** | `Month YYYY – Month YYYY` everywhere |

Practical rules adopted: standard section headers; contact details in body; true terms ideally inside bullet context; no keyword stuffing; no white text; consistent dates; ship both formats.

## 6. Execution plan (revised 2026-10-01 — supersedes the earlier verbatim copy)

# Portfolio Refine + Classic Résumé Engine — Execution Plan

## Summary
Three gated stages in one workstream: **A** refine the existing live portfolio in place (same sections/design, Geist typography, rich motion system, better carousels, new Résumé section with PDF viewer), **B** rebuild the résumé engine in `G:\job-hunt` to reproduce the 2024 classic template exactly (`.docx` + `.pdf` every render, zero tables), **C** adopt it in the pipeline docs after the user's review gate, then deploy. Nothing is pushed or deployed before the user reviews the refined site and the final PDF. Every step has an explicit pass gate; no step is "done" without fresh verification evidence.

## Stage 0 — Setup and protocol
- `git fetch origin`; create `codex/portfolio-refine` from `origin/main` **in the existing worktree** `C:\Users\Asus\.codex\worktrees\d1c6\portfolio project` (noir branch `codex/portfolio-refresh` @ `2769897` stays as history, never merged). origin/main had advanced by one README-only commit (`2a5fa16`, parent `daa8776`) since the handover was written — the branch is cut from the latest `origin/main`; the live design is unchanged. Commit the untracked `HANDOVER.md` as the first commit; its §6 is refreshed to this plan.
- Append item 7 to `G:\job-hunt\HANDOVER.md` §10 using the exact wording in handover §7.2.
- job-hunt: complete the AGENTS.md Tier-1 reads before engine work; `tools/*.py` is wrap-never-edit; git allowed = add/commit only (no push/remote).
- Kill/replace the stale dev server on :4173 (PID 19340 served the noir build); run the refine build on its own port.
- Gate: branch exists, worktree clean apart from intended files, handovers updated, dev server serving the new branch.

## Stage A — Portfolio refinement (worktree `codex/portfolio-refine`)
- **Harvest from noir (copy, never merge):** `src/data/portfolio.ts`, `ResumeSection.tsx`, `ResumeViewer.tsx`, `public/fonts/` (Geist sans + Geist mono only; Fraunces unused), `docs/ui-standards.md`; keep `Hero.tsx`/`AnimatedBackground.tsx` dead files untouched.
- **Content:** wire every old component (Profile, Projects/ProjectCard, Skills, Services, WorkExperience, Education, Certifications, Testimonials, ContactForm) to `src/data/portfolio.ts`; keep Formspree `mpwqynrn`, carousels, dialogs, footer. Audit greps clean (excluding verbatim testimonials): `marashid0168`, `Expected 2026`, `March 2020`, `IoT`, `Lovable`, `gpteng`, `Product Owner`, `3.5 years`, `Redcliffe`, `hospitality`.
- **Résumé section:** new section between Testimonials and Contact + "Résumé" nav link; viewer lazily imported (react-pdf 10.2.0 + pdfjs-dist 5.4.296), same-origin `public/Mohaimen-Rashid-Resume.pdf`; default zoom = `min(0.85, fit-width)` recomputed on container resize until the user manually zooms; toolbar = zoom −/+, fit width, "Page x of y", open-in-new-tab, download; text layer for copy; keyboard accessible; `<noscript>` + load-failure fallback card. Nav must not overflow at ≥768px (tighten spacing/type, no new hamburger; sub-md behavior unchanged).
- **Typography/spacing:** self-hosted Geist via `@font-face` (`font-display: swap`) wired into Tailwind/CSS; refined type scale, rhythm, card radii/shadows; both themes AA contrast.
- **Motion system (headline goal):** shared duration/easing/stagger token module; orchestrated page-load entrance, per-section scroll reveals, staggered lists, card/button/link hover micro-interactions, animated headings/dividers, portrait parallax/tilt, spring-eased embla carousels (arrows, progress, swipe, pause on hover/focus, keyboard), dialog open/close choreography, smooth scrolling + scrolled-header transition; transform/opacity only, 60fps, zero layout shift. `prefers-reduced-motion` is the sole fallback (framer-motion `MotionConfig`/`useReducedMotion`), affecting only visitors who enabled it at OS level.
- **Theme:** pre-paint inline script in `index.html` applies the stored/system class before first paint; hook initializes from that class; toggle persists the choice.
- **Housekeeping:** real title/description/OG/Twitter meta; remove the gptengineer.js loader; regenerate `public/og-image.png` (1200×630) from the refined design and point meta at it; `package.json` name/homepage → Vercel URL; rewrite README; rewrite `docs/ui-standards.md` + `design-qa.md` to the refined-original contract.
- **Deps:** add react-pdf/pdfjs-dist; regenerate and keep `bun.lockb` + `package-lock.json` in sync.
- Gates: `bun run build`, `npm run lint`, `npx tsc -p tsconfig.app.json --noEmit` all clean; viewer exists as a separate lazy chunk in `dist`; zero console errors; Playwright screenshots of every section at 1440px and 390px in both themes; interactive checks (theme no-flash + persistence, carousel arrows/keyboard/pause, dialog, viewer toolbar incl. text-layer copy); reduced-motion emulation degrades gracefully.

## Stage B — Classic résumé engine (`G:\job-hunt`)
- **`tools/render_classic.py`** (new file; imports helpers from `render.py`, edits nothing existing): CLI `cv <input.md> <output.docx>` writes both `.docx` and `.pdf` (Word COM `to_pdf_and_count`) and runs ATS assertions. New helpers only: hyperlink runs (`w:hyperlink`, `#1155CC` underlined), paragraph shading, `w:pBdr` bottom rules, negative indents for full-bleed.
- **Markdown conventions (decision-complete):** `%%NAME`/`%%CONTACT` furniture; `## HEADING` sections; first heading (`PROFESSIONAL SUMMARY`) + its body paragraphs form the shaded full-bleed `#F3F3F3` band; engine auto-inserts a full-bleed 1pt `#CCCCCC` rule after the last block of every other section; `**...**` full line = entry (`Bold Role | Org | Period | Location`); `- ` = `●` bullet at 1440/360/686 twips; body lines support inline `**bold**` (Key Modules / Skills / Certifications labels); `%%CLOSING` = centred closing line.
- **Template match (measured from the rig):** US Letter, right margin 749 twips, text positioned by paragraph indents (exact left/right values read from `%TEMP%\resume-template\dump.json` + `analyze.py` at execution; tolerance ±2pt vs the template render); Lora throughout; name 20pt centred (before 444), contact 8pt centred (before 190), headings 10pt bold uppercase (after 100), body/bullets 8pt; zero tables; page ≤ 2.
- **Contact line (template-exact):** `Email: shaninrashid00@gmail.com | Mobile: +61413249236 | LinkedIn | Github | Portfolio | Address: Perth, AU` with links `linkedin.com/in/mohaimenrashid`, `github.com/kdmars0168`, `mohaimen-portfolio.vercel.app`.
- **Rewrite `resumes/portfolio-resume.md`** from `master-it.yaml` + `me.md` in the template's section order: SUMMARY, EDUCATION, WORK EXPERIENCE, PROJECTS, SKILLS AND CERTIFICATES, closing `References Available on Request`. No work-rights, no hospitality, no invented numbers; `Month YYYY – Month YYYY` dates.
- **`tools/verify_classic.py`:** non-zero exit with a report on any failure — DOCX: zero tables, single column, geometry/margins, band fill `F3F3F3`, all rule borders `CCCCCC`, 3 hyperlinks, bullet glyph/indents, Lora-only fonts; PDF: ≤ 2 pages, 3 link annotations, full-bleed band/rule spans, clean text-extraction order, date format consistency.
- Gate: `verify_classic.py` exits 0 on both outputs; render both PDF pages to PNG and compare side-by-side with `tpl-1.png`; copy the new PDF over the portfolio `public/Mohaimen-Rashid-Resume.pdf` and re-run the Stage A build gate.

## Stage C + deploy (only after the review gate)
- **Review gate:** stop; present the running refined site (dev build) + the new `.docx`/`.pdf`. Nothing is committed to `main` or deployed before approval.
- After the PDF is approved, ask the user the deferred question: migrate the job-hunt app's tailored-CV pipeline to the classic engine, or leave it (recorded in HANDOVER either way).
- **Stage C:** create `G:\job-hunt\SUBMISSION.md` (does not exist today) with portal-aware upload guidance — PDF default, DOCX for legacy parsers, per the verified ATS findings; confirm packages carry both formats.
- **Deploy:** commit the refine branch; in `G:\portfolio project` `git merge --ff-only codex/portfolio-refine`; push `main`; wait for the Vercel build; live smoke = sections render, viewer zoom/copy/download/new-tab, OG preview. job-hunt changes are committed (add/commit only, no push).
- Post-deploy gate: live URL verified section-by-section; viewer functional at 1440px and 390px; OG preview correct.

## Interfaces & Assumptions
- `src/data/portfolio.ts` is the site's single typed content source (profile, experience, projects, skills, education, certifications, testimonials).
- `public/Mohaimen-Rashid-Resume.pdf` is the only résumé file the website serves; the DOCX exists for application packages.
- Locked: base = the `daa8776` design (now `2a5fa16`, README-only delta), Geist font, theme system-default + persisted toggle, zoom `min(0.85, fit-width)`, dual-format render, template-exact résumé, dossier-only content, noir branch never merged, no push/deploy before review.
- Defaults chosen: Fraunces not used; sub-768px nav unchanged; LANGUAGES section omitted (the 2024 template has none) and can be added on request; `SUBMISSION.md` is created new; the job-hunt app's tailored-CV renderer is untouched pending the post-review decision; submitted packages are never rewritten.

## 7. Immediate next actions (in order)

1. `HANDOVER.md` already exists at `C:\Users\Asus\.codex\worktrees\d1c6\portfolio project\HANDOVER.md` (written 2026-10-01, untracked). Create `codex/portfolio-refine` from `origin/main`; commit this file as the first commit on that branch.
2. Append to `G:\job-hunt\HANDOVER.md` §10 as a new item:
   `7. **Portfolio refine + classic résumé engine (2026-10-01)** — keep the old portfolio design, refine it, rebuild the résumé renderer to the 2024 classic template with dual .docx+.pdf output. Full context: C:\Users\Asus\.codex\worktrees\d1c6\portfolio project\HANDOVER.md`
3. Execute Stage A → Stage B per §6; capture QA screenshots (both themes); render the résumé (both files); run `verify_classic.py`.
4. **STOP for user review:** present the refined site (dev server) + the final PDF/DOCX. Only then Stage C + deploy.

## 8. Commands cheat-sheet

- Main checkout (old design): `cd "G:\portfolio project"; bun run dev`
- Current worktree (noir build, reference only): `cd "C:\Users\Asus\.codex\worktrees\d1c6\portfolio project"; bun run dev -- --port 4173`
- New branch: `git checkout -b codex/portfolio-refine origin/main`
- Render (new engine): `G:\job-hunt\app\.venv\Scripts\python.exe G:\job-hunt\tools\render_classic.py cv G:\job-hunt\resumes\portfolio-resume.md <out>.docx` → writes `.docx` + `.pdf`
- Verify: `G:\job-hunt\app\.venv\Scripts\python.exe G:\job-hunt\tools\verify_classic.py <out>.docx` + same for `.pdf`
- Build / lint: `bun run build` · `npm run lint`

## 9. Watch-outs / red lines

- Never merge `codex/portfolio-refresh` (noir). History only.
- `tools/*.py` is wrap-never-edit (job-hunt AGENTS.md): create wrappers; do not modify `render.py`. If a wrapper is impossible, stop and ask.
- Job-hunt session protocol (AGENTS.md Tier-1 reads) applies before any engine work.
- Do not push or deploy before the user's review gate.
- Keep every existing feature (Formspree `mpwqynrn` contact form, carousels, dialogs, theme toggle). Refine, don't remove.
- Never render work-rights claims, hospitality, retired emails, or invented numbers.
