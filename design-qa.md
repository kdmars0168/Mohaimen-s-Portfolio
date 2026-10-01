# Design QA — Portfolio Refine (2026-10-01)

**Contract:** the original design, refined in place. Same sections, same features; Geist typography,
tighter rhythm, a full motion system, better carousels, and a new Résumé section. See
`docs/ui-standards.md` for the binding rules.

**Branch:** `codex/portfolio-refine` (cut from `origin/main` @ `2a5fa16`). The noir branch
`codex/portfolio-refresh` is history only and is never merged.

## Evidence (Playwright, Chrome headless 1.63)

Artifacts: `%TEMP%\portfolio-qa\refine\` — desktop 1440px and phone 390px screenshots of every
section in both themes, full-page captures, the project dialog, the résumé viewer, the reduced-motion
pass, and the 1200×630 OG image preview.

| Check | Result |
|---|---|
| Theme no-flash (stored light + OS dark → light at DOM ready) | pass |
| Theme toggle → dark, persists across reload | pass |
| Carousel arrows change slides | pass |
| Autoplay pauses on hover; resumes after the pointer leaves | pass |
| Autoplay pauses while a control has focus | pass |
| Arrow-key navigation on the carousel | pass |
| Project card opens the detail dialog; Escape closes it | pass |
| Résumé viewer default zoom = `min(0.85, fit-width)` | pass (85% at 1440px) |
| Zoom in / Fit width change the scale | pass |
| Page counter reports "Page x of y" | pass ("Page 1 of 2") |
| Text layer selectable (copy works) | pass |
| Open-in-new-tab and Download links present | pass |
| `prefers-reduced-motion` still renders all content | pass |
| Console errors across the whole sweep | 0 |
| Horizontal overflow at 320px | none (scrollWidth = clientWidth = 320) |

## Build gates

- `bun run build` — clean. `ResumeViewer-*.js` and the pdf worker ship as separate lazy assets.
- `npm run lint` — 0 errors (6 pre-existing shadcn `react-refresh` warnings).
- `npx tsc -p tsconfig.app.json --noEmit` — clean.

## Content audit

Grep over `src/`, `index.html` and the built `dist/` for retired emails, "Expected 2026",
"March 2020", IoT, Lovable/gpteng traces, "Product Owner", "3.5 years", "Redcliffe" and hospitality:
**no rendered hits**. Remaining matches are the guard-rail comment in `src/data/portfolio.ts` and
this document — neither is rendered content.

## Notes

- The résumé PDF in `public/` is still the old-format placeholder; it is replaced by the classic
  engine output (`G:\job-hunt\tools\render_classic.py`) before the review gate.
- Both lockfiles (`bun.lockb`, `package-lock.json`) were regenerated after adding
  react-pdf 10.2.0 and pdfjs-dist 5.4.296.

## Session 3 — feedback round 1 (2026-10-01)

Playwright sweep `%TEMP%\portfolio-qa\pw\session3-qa.mjs` → `session3/session3-report.json`:
**20/20 checks true, 0 console errors, 0 page errors.**

- Hero: CTA row above the fold at 1440×900 and 1366×768; nav has no overflow at either width.
- Projects: featured cards all carry snapshots; All Projects shows 18 cards (12 + 6 earlier
  builds) and none is missing an image; a card's own arrows move its carousel
  (`translate3d` changes) without opening the project dialog, while the card body still opens it;
  no background control paints above the dialog overlay.
- Certifications: the desktop columns advance (loop), and stay still under reduced motion.
- Testimonials: the row keeps moving and the arrows/progress still work.
- Résumé: viewer defaults to 130% on desktop (`Page 1 of 2`), 54% fit-width on a 390px phone;
  no horizontal overflow at 320px.

Screenshots for the section contract live in `%TEMP%\portfolio-qa\session3\` (`hero-1440x900`,
`light-*`, `dark-*`, `projects-*`, `qa-*`). Résumé PDF re-rendered by
`G:\job-hunt\tools\render_classic.py` and re-verified (`CLASSIC VERIFY OK`, 2 pages, 905 words,
one-paragraph summary between PROFESSIONAL SUMMARY and EDUCATION).

### Snapshot provenance (all synthetic/demo data)

- AI Museum WA and HealthWhisper ran locally from their repos (Flask + SQLite) with seeded demo
  rows; Budget Tracker was captured from the public staging site.
- DBank, DKeeper, DANG and OpenD were captured from their own front ends served locally. The
  DFINITY SDK needs WSL and this machine only has the `docker-desktop` distro, so the canister
  back ends were replaced by local demo actors that keep the same interfaces (notes in
  localStorage, a ledger for DANG, a seeded NFT collection for OpenD). The UI is the projects'
  real UI; the data is demo data. Disclosed in HANDOVER.md.
- To-Do List (PostgreSQL) ran against the machine's local PostgreSQL 17 service on port 5433
  (a `permalist` database with the project's own `queries.sql` schema/seed); the Authentication &
  Security app ran against the local MongoDB with a demo account.
