# HANDOVER — Portfolio feedback round 1 (session 3, start of session)

**Status:** Session 2 (site refine + classic résumé engine) is complete on branch `codex/portfolio-refine`; nothing pushed, nothing deployed. Session 3 implements Mohaimen's review feedback below, re-runs the gates, and stops again at the review gate.
**Where the work lives:** worktree `C:\Users\Asus\.codex\worktrees\d1c6\portfolio project` (branch `codex/portfolio-refine`, tip `1940006`). `G:\portfolio project` stays on `main` (deploy path only). Dev server: `npx vite --port 5174 --strictPort`. Never merge `codex/portfolio-refresh` (noir).
**Reference confirmed by Mohaimen:** "the previous portfolio" = the original live design (`main`) — icon-tile expertise carousel, borderless auto-scrolling certifications, smoothly moving testimonials, system-font nav."

## A. Hero — fit everything at 100% (item 1)
Target: at a **1440×900 viewport, 100% zoom**, all hero content ends ≥24px above the fold and the "Featured Projects" heading is visible; 1366×768 is the stretch target. Root cause: `min-h-[80vh]` + `pt-28 pb-20` over-pad the section.
- Remove `min-h-[80vh]`; `pt-28 → pt-20/24`, `pb-20 → pb-10`; grid `gap-12 → gap-10`.
- Portrait: `md:w-64` → `md:w-56`, `xl:w-64` at wide screens; keep tilt/hover.
- Tighten the stack: proof strip `mb-8 → mb-6`, stat numerals `text-2xl → text-xl`, lede `text-lg → text-base`, merge the subline and availability into one two-line block, keep both CTAs + "See the work".
- Verify with a Playwright screenshot at 1440×900 and 1366×768; assert the hero's bottom `getBoundingClientRect().bottom < viewport height`.

## B. Featured projects — snapshots + motion + Show All arrows (items 2, 3)
- **Motion:** restore the previous carousel feel — Autoplay `delay: 3000`, keep `loop`, drop hover-pause (keep keyboard focus-pause and reduced-motion). Keep the current static arrow buttons.
- **Arrows in Show All:** the card's mini-carousel controls bubble clicks/keydowns to the card's `onClick`/`onKeyDown`, opening the project dialog. Stop propagation on the carousel wrapper (`onClick` + `onKeyDown` capture) so arrows only change images; card body still opens the dialog. Also verify no background page control renders above the dialog overlay.
- **Every project gets real snapshots.** Target: all 6 featured projects → 3 images each; all earlier-build cards → 2 each; no project left with 0 images.
- Image spec: capture at 1440×900 (deviceScaleFactor 1) with the existing Playwright rig (`%TEMP%\portfolio-qa\pw`), convert to WebP q82 (≤200KB), save to `public/projects/<slug>-<n>.webp`, reference as `/projects/...` in `src/data/portfolio.ts`. Synthetic/demo data only.
- Apps to run and shoot: **AI Museum WA** (`RoshiniVadla75/Group-22---CITS5206`), **HealthWhisper** (`kdmars0168/data-analytics-app`), **Combined Budget Tracker** (live `couple-money-staging.vercel.app` public pages; keep `couple-money-preview.png`).
- Fallback ladder per app: run locally → static-serve built `dist` → repository screenshot. Record any fallback here.

## C. Earlier builds — 4 dApps + bootcamp coursework, with snapshots (item 4)
- Add `earlierBuildsProjects: Project[]` to `src/data/portfolio.ts` (6 cards) and render them inside the "All Projects" dialog under a labelled **"Earlier builds — 2023"** group.
- Cards: DKeeper (`DKeeper-App-Blockchain`), DBank (`DBank-Blockchain-App`), DANG token (`DANG-Crypto-Token`), OpenD NFT marketplace (`OpenD-NFT-Marketplace`), To-Do List (`ToDoList-w-PostgreSQL`), Authentication & Security (`Authentication-Security`).
- Snapshot sources: DANG → live mainnet frontend `https://yo32t-qyaaa-aaaai-qibea-cai.ic0.app`. DKeeper/DBank/OpenD → `dfx` local (time-boxed 45 min each) else static-serve the built frontend. Coursework → local MongoDB + PostgreSQL 16/17 services (both running), shoot 2 frames each.

## D. Sections restored to the previous (live) design language (items 5–11)
- **Nav (5):** restore the previous register — system-UI stack, 16px, normal weight, foreground colour, tightened gaps; keep scrolled-header behaviour and the animated underline.
- **Expertise (6):** replace the four grouped cards with the previous flat icon-tile carousel, upgraded (auto-advance, hover lift, Show All grid of the same tiles).
- **Services (7):** re-scope to the current pitch — Software & Systems Delivery, Data & Analytics, Business Analysis, Process & Automation, Project Delivery, AI & Reporting — each card with a one-line promise, 3 concrete deliverables, an icon.
- **Work experience (8):** add the WA Department of Health logo (`https://www.health.wa.gov.au/images/Corporate/doh-logo-mono-web-print.jpg` → transparent `public/wa-health.png`); normalise all employer logos to a uniform 56px tile on a light backing; single-column hanging bullets.
- **Education (9):** revert to the previous presentation (borderless cards, inline logo, plain timeline dots, ±50px slide-in); keep verified content.
- **Certifications (10):** remove the boxes; restore the borderless tiles and the previous vertical infinite loop (duplicate once, `y: 0% → -50%`, 20s linear, seamless).
- **Testimonials (11):** keep arrows + progress bar; restore the previous moving-loop feel (`dragFree: true`, `duration: 400`, Autoplay 5000, pause on hover/focus).

## E. Résumé (items 12–13)
- **Viewer:** `ResumeViewer.tsx` default scale `0.85 → 1.30` (desktop ≥768px; below that `min(1.30, fit-width)`), no resize re-fit of the default, scroll area `max-h-[70vh] → max-h-[85vh]`.
- **Résumé format:** reference `C:\Users\Asus\Downloads\Documents\Mohaimen Rashid- RESUME 2024.pdf`. In `G:\job-hunt\tools\render_classic.py` (ours to edit; `render.py` stays wrap-never-edit): render the summary as **one paragraph** (join authored lines, keep band indents/tab/shading, drop the per-line `_check_width` guard, add a max-lines sanity check) and add section space-before (~24–28pt).
- Rewrite the summary in `G:\job-hunt\resumes\portfolio-resume.md` as one flowing paragraph; re-render `.docx` + `.pdf`; update `verify_classic.py`; copy the PDF over `public/Mohaimen-Rashid-Resume.pdf`.

## F. Tests and gates
`bun run build` · `npm run lint` · `npx tsc -p tsconfig.app.json --noEmit` · updated Playwright sweep (`%TEMP%\portfolio-qa\pw\refine-qa.mjs`): hero fits at 1440×900 and 1366×768; Show All arrows change images without opening the dialog; no background control above the overlay; every project card has real images; certifications loop present and static under reduced motion; testimonials move with working arrows/progress; viewer default 130% with "Page 1 of 2"; no console errors; no 320px overflow. Content audit over `src/`, `index.html`, `dist/`. Résumé: `verify_classic.py` → `CLASSIC VERIFY OK`, 2 pages. Update `docs/ui-standards.md` and `design-qa.md`; commit each workstream atomically on `codex/portfolio-refine`.

## G. Assumptions and locks
- "Previous portfolio" = original live design (`main`); noir stays unmerged; Geist stays site-wide except the nav.
- Hero target 1440×900 (1366×768 stretch); résumé viewer 130% desktop / fit-width on phones; earlier builds live inside All Projects.
- No push, no deploy, no merge before Mohaimen's next review; job-hunt git = add/commit only, never push; both lockfiles stay in sync.
- Privacy: all new snapshots use demo/synthetic data only.
