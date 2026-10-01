# HANDOVER — Portfolio Refine + Classic Résumé Engine (session 2, end of session)

**Date written:** 2026-10-01 (AWST)
**Status:** Stages 0, A and B are COMPLETE, verified and committed. **The review gate has NOT been passed** — Mohaimen still has to give feedback on the refined site and the classic résumé PDF. Nothing is pushed. Nothing is deployed. The live site is still the old build.
**Repos:** `kdmars0168/Mohaimen-s-Portfolio` (portfolio) + `G:\job-hunt` (résumé engine/dossier)
**Live:** https://mohaimen-portfolio.vercel.app/ (untouched, still `origin/main` @ `2a5fa16`)

---

## 0. Next session — start here

1. **Read this file in full**, then `G:\job-hunt\AGENTS.md` before any engine work (`tools/*.py` stays wrap-never-edit; job-hunt git = add/commit only, never push).
2. **Collect Mohaimen's feedback** on (a) the refined site and (b) the classic résumé PDF/DOCX, and implement it on the existing branch `codex/portfolio-refine` in the worktree `C:\Users\Asus\.codex\worktrees\d1c6\portfolio project`. Re-run the full gate set after every change (build / lint / tsc / Playwright sweep / content audit, and `verify_classic.py` if the résumé changes).
3. **Only after he approves the site + the PDF:** run **Stage C**, then **deploy** (§4).
4. **One question is still owed to him** (he deferred it to after the PDF review): should the job-hunt app's own tailored-CV pipeline (`app/api → tools/render.py`) also render through the new classic engine, or stay as-is? Record the answer in the job-hunt handover either way.

## 1. Current state (verified at end of this session)

| What | Where | State |
|---|---|---|
| Main checkout | `G:\portfolio project` | on `main` @ `2a5fa16`, clean, in sync with `origin/main` — untouched this session |
| Worktree + branch | `C:\Users\Asus\.codex\worktrees\d1c6\portfolio project` | on **`codex/portfolio-refine`**, clean, **3 commits ahead of `origin/main`** (a0d2846, e89606d, 948f306) |
| Noir branch | worktree `codex/portfolio-refresh` @ `2769897` | history only — **never merge** |
| Dev server | http://localhost:5174 | running (vite, session-scoped; restart command in §6) |
| Classic résumé | `G:\job-hunt\resumes\portfolio-resume.md/.docx/.pdf` | rewritten + rendered — 2 pages, 903 words, `CLASSIC VERIFY OK` |
| Site résumé file | `public/Mohaimen-Rashid-Resume.pdf` (worktree) | the new classic PDF (125,379 bytes) — committed in `948f306` |
| job-hunt repo | branch `frontend-redesign` | commit **`6d95ab1`** with the two new tools + the rewritten résumé; everything else in that repo is still uncommitted (pre-existing) |
| QA artifacts | `%TEMP%\portfolio-qa\refine\` | 37 screenshots + `refine-report.json` (all checks true, 0 console errors) |
| Résumé QA | `%TEMP%\resume-template\` | probe rigs, `cmp-*.png`, `final-ours-1.png`, `final-ours-2.png` |

## 2. What was done this session

### Stage 0 — setup
- `git fetch origin` — `origin/main` had advanced by one **README-only** commit since the previous handover (`daa8776` → `2a5fa16`); the branch was cut from the latest `origin/main` (design unchanged).
- `codex/portfolio-refine` created in the existing worktree; this file committed as the first commit (`a0d2846`) with §6 refreshed to the revised execution plan. The previous verbatim plan now lives in git history at that commit.
- `G:\job-hunt\HANDOVER.md` §10 gained item 7 pointing at this file.
- The stale noir dev server on :4173 (PID 19340) was stopped.

### Stage A — portfolio refined in place (commit `e89606d`)
- **Harvested from noir (copy, never merge):** `src/data/portfolio.ts`, `ResumeSection.tsx`, `ResumeViewer.tsx`, `public/fonts/geist*.woff2`, `public/couple-money-preview.png`, the placeholder résumé PDF; `docs/ui-standards.md` + `design-qa.md` were rewritten rather than reused.
- **Every section wired to `src/data/portfolio.ts`** (single source of truth): Profile, Projects + ProjectCard, Skills, Services, Work Experience (+ per-role logo field), Education, Certifications, Testimonials, ContactForm, Footer. All the stale copy (retired email, "Expected 2026", "March 2020", "Product Owner", IoT, 8→7 certs) is gone.
- **Typography:** self-hosted Geist sans + mono via `@font-face` (`font-display: swap`), Tailwind `font-sans`/`font-mono`, refined type scale, `text-wrap: balance/pretty`, theme-aware `.glass-card`, `shadow-soft`/`shadow-lift` tokens.
- **Motion system:** `src/lib/motion.ts` (DUR/EASE/STAGGER/springs/VIEWPORT) + `Reveal` and `Section` wrappers + `<MotionConfig reducedMotion="user">`. Page-load choreography, per-section scroll reveals, staggered lists, hover micro-interactions (card lift, image zoom, link underlines), portrait tilt on pointer move, spring-eased embla carousels with arrows + progress + keyboard and pause on hover **and** focus, dialog choreography, scrolled-header transition, smooth anchors (`scroll-mt-24`).
- **Theme:** pre-paint inline script in `index.html` (stored choice → else OS), persisted on toggle, hook initialises from the applied class and keeps following the OS while no choice is stored.
- **Résumé section** between Testimonials and Contact + "Résumé" nav link; `ResumeViewer` lazy chunk (react-pdf 10.2.0 + pdfjs-dist 5.4.296); default zoom `min(0.85, fit-width)` re-fitted on resize until the visitor zooms or presses Fit width; toolbar = zoom −/%/+, Fit width, "Page x of y", Open ↗, Download; text layer + annotation layer; `<noscript>` + failure fallback card.
- **Housekeeping:** real title/description/OG/Twitter meta, Lovable `gptengineer.js` loader removed, OG image regenerated at 1200×630 from the refined design, `package.json` name + homepage → Vercel, README rewritten, `docs/ui-standards.md` + `design-qa.md` rewritten to the refined-original contract, both lockfiles regenerated after adding the two deps.
- **Fixed pre-existing lint errors** (shadcn `command.tsx`, `textarea.tsx`, `tailwind.config.ts` `require()` import) so `npm run lint` has **0 errors**.

### Stage B — classic résumé engine (job-hunt commit `6d95ab1`)
- **`tools/render_classic.py`** (new file; `render.py` untouched — wrap-never-edit): Lora throughout, name 20pt centred, contact 8pt centred, 10pt bold caps headings, **full-bleed `#F3F3F3` summary band**, full-bleed 1pt `#CCCCCC` rule after every other section, bold entry lines, `●` bullets (left 1610 / hanging 360 / right 122 twips), `#1155CC` underlined hyperlinks via `[label|url]`, `%%CLOSING` centred line, **zero tables**, writes `.docx` **and** `.pdf` (Word COM, real page count) on every render. Inline markdown: `%%NAME/%%CONTACT/%%CLOSING`, `## HEADING`, `**entry**`, `- bullet`, plain body, `**bold**` inside lines.
- **Band implementation detail (do not "simplify"):** Word draws paragraph shading from the paragraph's left indent, so the band is one paragraph **per authored line**, each with indents `-1/-749` plus a leading tab to 1020 twips, and a shaded 8.5pt pad paragraph top and bottom. The engine **fails loudly** (`_check_width`) if a summary line would wrap — keep summary lines short.
- **Measured against the 2024 template:** text frame 51.0pt (template 51.1), band top 89.0 (89.0), heading baseline 97.2 (97.0), bullet text 80.3 (80.3), rules/band full-bleed 0→612. The template's body content sits in one-cell tables with 170tw cell margins, so every body indent in the engine is `template value + 170` (`CELL_INSET`).
- **`tools/verify_classic.py`** (new): DOCX — zero tables, single column, Letter geometry, right margin 37.45pt, F3F3F3 shading present, CCCCCC rules, exactly 3 hyperlinks, `●` bullets with 1610/360 indents, Lora-only fonts, 8/10/20pt sizes; PDF — ≤2 pages, 612×792, 3 link annotations with the right targets, full-bleed band + rule spans, first line = name, last = closing, section order, en-dash date ranges, no unrendered markdown. Exits non-zero with a report.
- **`resumes/portfolio-resume.md`** rewritten from `master-it.yaml` + `me.md`: summary, education (UWA + Deakin with Key Modules from the transcript), work experience (NSP internship, CDIP, SELISE, Tech Academy), projects (AI Museum WA, Combined Budget Tracker, HealthWhisper, Amberg), skills + the 7 certifications, closing. No languages section (the 2024 template has none), no work-rights, no hospitality, no invented numbers.
- The new PDF was copied over the site's `public/Mohaimen-Rashid-Resume.pdf` and committed in the portfolio repo (`948f306`).

## 3. Evidence (all run this session)

- `bun run build` clean; `npm run lint` 0 errors (6 pre-existing react-refresh warnings); `npx tsc -p tsconfig.app.json --noEmit` clean. `ResumeViewer-*.js` + the pdf worker ship as **separate lazy chunks**.
- Playwright sweep (`%TEMP%\portfolio-qa\pw\refine-qa.mjs` → `refine/refine-report.json`): no theme flash, toggle persists across reload, carousel arrows + hover/focus pause + resume + keyboard, dialog open/Escape close, viewer default zoom 85% desktop / 54% phone = `min(0.85, fit-width)`, zoom in + fit width work, "Page 1 of 2", text-layer copy works, open/download links present, reduced-motion still renders, **0 console errors**, no overflow at 320px.
- Content audit over `src/`, `index.html` and built `dist/`: no `marashid0168`, "Expected 2026", "March 2020", IoT, Lovable/gpteng, "Product Owner", "3.5 years", "Redcliffe" or hospitality in anything rendered (only the guard-rail comment in `portfolio.ts` and the QA docs mention them).
- `verify_classic.py` → `CLASSIC VERIFY OK` on both outputs; render reports `pages=2 words=903`.

## 4. What remains (in order)

1. **Review gate** — Mohaimen's feedback on the site + the classic PDF/DOCX → implement, re-run gates.
2. **Owed question** — migrate the job-hunt app's tailored-CV pipeline to the classic engine, or not?
3. **Stage C** — create `G:\job-hunt\SUBMISSION.md` (it does not exist today) with portal-aware upload guidance: PDF is the default, DOCX for legacy parsers; confirm application packages carry both formats. Submitted packages are never rewritten.
4. **Deploy** — commit the refine branch, then in `G:\portfolio project`: `git merge --ff-only codex/portfolio-refine`, `git push origin main`; wait for the Vercel build; live smoke = all sections, viewer (zoom/copy/download/new tab), OG preview; then record completion in the job-hunt handover.
5. Optional if he asks: a one-page variant of the résumé (current text is ~2 pages: page 1 = summary → projects, page 2 = skills/certifications + closing).

## 5. Locked decisions still in force

- Base = the original live design, refined in place. Every section/feature stays (Formspree `mpwqynrn`, carousels, dialogs, theme toggle, footer).
- Geist (self-hosted) for the site; `min(0.85, fit-width)` viewer default; dual `.docx`+`.pdf` render; classic 2024 template reproduced exactly; dossier-only content; hospitality and work-rights stay out; the noir branch is never merged.
- Motion serves normal visitors; `prefers-reduced-motion` is the only fallback and applies only to people who enabled it at OS level.
- No push and no deploy before the review gate.

## 6. Commands cheat-sheet

```powershell
# site — dev / gates (run from the worktree)
cd "C:\Users\Asus\.codex\worktrees\d1c6\portfolio project"
npx vite --port 5174 --strictPort          # dev server (the running one is session-scoped)
bun run build ; npm run lint ; npx tsc -p tsconfig.app.json --noEmit
cd "$env:TEMP\portfolio-qa\pw"; node refine-qa.mjs     # full Playwright sweep + screenshots

# résumé — render + verify (job-hunt venv)
& "G:\job-hunt\app\.venv\Scripts\python.exe" "G:\job-hunt\tools\render_classic.py" cv "G:\job-hunt\resumes\portfolio-resume.md" "G:\job-hunt\resumes\portfolio-resume.docx"
& "G:\job-hunt\app\.venv\Scripts\python.exe" "G:\job-hunt\tools\verify_classic.py" "G:\job-hunt\resumes\portfolio-resume.docx" "G:\job-hunt\resumes\portfolio-resume.pdf"
Copy-Item "G:\job-hunt\resumes\portfolio-resume.pdf" "C:\Users\Asus\.codex\worktrees\d1c6\portfolio project\public\Mohaimen-Rashid-Resume.pdf" -Force
```

## 7. Watch-outs / gotchas

- **File locks.** `render_classic.py` exports the PDF through Word COM: Word can leave `~$…docx` lock files behind (delete them) and a stray `WINWORD` process. Also, **Adobe Acrobat holding `portfolio-resume.pdf` makes the export fail with a misleading "read-only" error** — that is exactly what happened this session; close the viewer (or kill the process) before re-rendering. Find the holder with the Windows Restart Manager if it happens again.
- `tools/*.py` is wrap-never-edit — `render.py` was not modified; the classic engine is a new file. job-hunt git: `add`/`commit` only, never `push`/`remote`.
- Both lockfiles (`bun.lockb` + `package-lock.json`) must stay in sync with `package.json`.
- Never merge `codex/portfolio-refresh` (noir). `Hero.tsx` / `AnimatedBackground.tsx` stay as dead files (not imported).
- Keep the summary lines in `portfolio-resume.md` short — the band renderer raises if a line wraps.
- The QA script injects `scroll-behavior:auto` (smooth scrolling makes hover targets unstable for Playwright) and uses `page.mouse.move` for hover tests; keep both if you edit it.

## 8. Files created / changed this session

**Portfolio (`codex/portfolio-refine`)** — commits `a0d2846` (handover), `e89606d` (refine), `948f306` (classic PDF): `HANDOVER.md`, `README.md`, `design-qa.md`, `docs/ui-standards.md`, `index.html`, `package.json` + both lockfiles, `tailwind.config.ts`, `src/index.css`, `src/App.tsx`, `src/pages/Index.tsx`, `src/hooks/use-theme.tsx`, `src/lib/motion.ts`, `src/components/motion/Reveal.tsx`, `src/data/portfolio.ts`, `src/components/{Header,ProfileSection,ProjectsSection,ProjectCard,SkillsSection,Services,WorkExperience,Education,Certifications,Testimonials,ContactForm,Footer,ResumeSection,ResumeViewer}.tsx`, `src/components/ui/{command,textarea}.tsx`, `public/{og-image.png,Mohaimen-Rashid-Resume.pdf,couple-money-preview.png}`, `public/fonts/geist-{latin,mono-latin}-var.woff2`.

**job-hunt (`6d95ab1`)** — `tools/render_classic.py` (new), `tools/verify_classic.py` (new), `resumes/portfolio-resume.md` (rewritten), `resumes/portfolio-resume.docx` + `.pdf` (regenerated), `HANDOVER.md` (§10 item 7).
