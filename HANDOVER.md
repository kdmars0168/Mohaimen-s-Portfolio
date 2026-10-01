# HANDOVER — Portfolio feedback round 1 (session 3, end of session)

**Status:** all 13 feedback items are implemented, verified and committed on `codex/portfolio-refine`. **Nothing is pushed and nothing is deployed** — the review gate is next. The live site is still the old build.
**Where the work lives:** worktree `C:\Users\Asus\.codex\worktrees\d1c6\portfolio project` (branch `codex/portfolio-refine`). `G:\portfolio project` stays on `main` until deploy. Dev server: `npx vite --port 5174 --strictPort`.
**Reference confirmed by Mohaimen:** "the previous portfolio" = the original live design (`main`) — icon-tile expertise carousel, borderless scrolling certifications, smoothly moving testimonials, system-font nav. Résumé reference: `C:\Users\Asus\Downloads\Documents\Mohaimen Rashid- RESUME 2024.pdf`.

## 0. Next session — start here

1. Read this file, then collect Mohaimen's feedback on the round-1 build (`http://localhost:5174`).
2. Implement any round-2 feedback on the same branch and re-run the gate set below after every change.
3. **Only after he approves:** Stage C (`G:\job-hunt\SUBMISSION.md`) then deploy — in `G:\portfolio project`: `git merge --ff-only codex/portfolio-refine`, `git push origin main`, wait for Vercel, smoke-test the live site (all sections, résumé viewer zoom/copy/download, OG preview).
4. Still owed to him: should the job-hunt app's tailored-CV pipeline (`app/api → tools/render.py`) migrate to the classic engine? Record the answer in the job-hunt handover either way.

## 1. What changed this session (by feedback item)

1. **Hero fits at 100%** — removed `min-h-[80vh]`, `pt-20/24 pb-10`, portrait column capped at 18rem, one-line name at 1440px, tighter proof/social/CTA stack. Verified 1440×900 and 1366×768.
2. **Featured projects** — all six featured projects now carry three real snapshots (`public/projects/…`); carousel motion restored to the previous cadence (Autoplay 3000, no hover pause, focus pause only).
3. **Show All arrows** — a card's own arrows move its carousel without opening the project dialog (click/keydown stop propagation only when the event originates on a button); the card body still opens the detail dialog. No background control paints above the overlay.
4. **Earlier builds** — new `earlierBuildsProjects` (6 cards) renders inside All Projects under "Earlier builds — 2023": DKeeper, DBank, DANG, OpenD NFT, To-Do (PostgreSQL), Authentication & Security — each with two snapshots and a repo link. The old one-line string remains as the group summary.
5. **Nav** — back to the previous register: system-UI stack, 14/15/16px across breakpoints, foreground colour, animated underline; tighter gaps so nine links fit.
6. **Expertise** — the four grouped cards are gone; the previous flat icon-tile carousel is back, upgraded (icon circles, hover lift, drag-free autoplay, Show All grid).
7. **Services** — re-scoped to the current pitch with six promise + three-deliverable cards (Software & Systems Delivery, Data & Analytics, Business Analysis, Process & Automation, Project Delivery, AI & Reporting).
8. **Work experience** — WA Health crest added (`public/wa-health.png`, background removed, trimmed); all employer logos now sit in uniform 56px tiles on a light backing; bullets are single-column.
9. **Education** — reverted to the previous look (borderless cards, inline logos, plain dots, ±50px slide-in) with the current verified content; the section clips horizontal overflow.
10. **Certifications** — boxes removed; borderless tiles flow in three endless columns (26–34s linear, middle column reversed), paused only under reduced motion.
11. **Testimonials** — arrows + progress bar kept; motion restored to the previous drag-free loop (`dragFree: true`, `duration: 400`, Autoplay 5000).
12. **Résumé viewer** — default zoom 130% on desktop (phones keep fit-width), scroll frame `max-h-[85vh]`, resize re-fit only on phones.
13. **Résumé format** — summary now renders as ONE wrapped paragraph inside the full-bleed band, and sections carry space-before so the rules breathe like the 2024 template. `verify_classic.py` asserts both.

## 2. Evidence (all run this session)

- `bun run build` clean · `npm run lint` 0 errors (6 pre-existing warnings) · `npx tsc -p tsconfig.app.json --noEmit` clean.
- Playwright sweep `%TEMP%\portfolio-qa\pw\session3-qa.mjs` → `%TEMP%\portfolio-qa\session3\session3-report.json`: **20/20 checks true, 0 console errors, 0 page errors** (hero fit, nav overflow, project images, arrow behaviour, overlay, certifications loop + reduced motion, testimonial motion, résumé 130%/2 pages, no 320px overflow).
- Résumé: `render_classic.py` → `pages=2 words=905`; `verify_classic.py` → `CLASSIC VERIFY OK` (DOCX + PDF, including the new summary and spacing assertions). The PDF was copied over `public/Mohaimen-Rashid-Resume.pdf`.
- Content audit over `src/`, `index.html`, built `dist/`: no retired email, "Expected 2026", "March 2020", IoT, Lovable/gpteng, "Product Owner", "3.5 years", "Redcliffe" or hospitality claims.

## 3. Snapshot provenance (read before reusing the images)

- **Ran for real:** AI Museum WA and HealthWhisper (local Flask + SQLite, seeded demo rows), Combined Budget Tracker (public staging site), To-Do List (throwaway PostgreSQL cluster in `%TEMP%`), Authentication & Security (local MongoDB, demo account + demo secret).
- **Front ends served locally with demo back ends:** DKeeper, DBank, DANG token, OpenD NFT. The DFINITY SDK needs WSL and this machine only has the `docker-desktop` distro, so canister calls were answered by local demo actors with the projects' own interfaces (notes in localStorage, a token ledger, a seeded NFT collection). The UI in every screenshot is the project's real UI; the data is demo data.
- All snapshots are synthetic — no real emails, tokens, health data or third-party secrets appear in any frame.

## 4. Commits this session

`0d905ea` handover · `2d70382` previous-design restorations (hero, nav, expertise, services, work experience + WA Health crest, education, certifications, testimonials) · `6291abf` projects (snapshots, earlier builds, motion, arrows) · `b7bdcf5` résumé viewer 130% + template PDF. job-hunt: `f4aa052` classic engine summary wrapping + spacing + verifier.

## 5. Locks and watch-outs

- No push, no deploy, no merge before Mohaimen's review; job-hunt git = add/commit only, never push.
- Never merge `codex/portfolio-refresh` (noir). Geist stays site-wide except the nav.
- The snapshot rigs live in `%TEMP%` (`session3-apps/`): the demo actors and throwaway databases are capture-time artefacts, not part of either repo. Re-running the captures is only needed if a snapshot is replaced.
- Dev server on :5174 is session-scoped; restart with `npx vite --port 5174 --strictPort` after a reboot.
