# UI Standards — Mohaimen Rashid (Shanin) Portfolio

**Contract (2026-10-01):** this site keeps the original design. It is *refined in place* — same
sections, same components, same features. Nothing was redesigned, removed or replaced. Every rule
below describes the refined-original contract. (The earlier noir/champagne contract is retired and
must not be re-applied.)

## 1. Non-negotiables

- Every section and feature from the original site stays: Header (nav + theme toggle), profile hero,
  Projects (grid, cards, image carousels, expand dialog), Expertise, Services, Work Experience,
  Education, Certifications, Testimonials, **Résumé**, Contact (Formspree), Footer.
- Content comes from exactly one place: `src/data/portfolio.ts`. No component hard-codes a claim,
  a date, a number, an email address or a testimonial.
- The dossier rules hold: 8 testimonials verbatim, exactly 7 certifications, no hospitality, no
  work-rights claims, no invented numbers, no retired email addresses.

## 2. Typography and rhythm

- **Font:** self-hosted Geist (variable, `public/fonts/geist-latin-var.woff2`) with Geist Mono for
  numerals/labels. Declared via `@font-face` in `src/index.css` with `font-display: swap`; wired into
  Tailwind as `font-sans` / `font-mono`. No third-party font requests.
- **Scale:** section headings `text-2xl md:text-3xl font-bold tracking-tight`; body copy
  `text-sm`–`text-lg` with `text-wrap: pretty`; headings `text-wrap: balance`.
- **Rhythm:** section stack `space-y-16`; section padding `py-12 px-4`; cards `p-5`/`p-6`; anchor
  sections carry `scroll-mt-24` so the fixed header never covers a heading.
- **Surfaces:** `rounded-xl` cards on `bg-card` with `border`; shadows come from the two house
  tokens `shadow-soft` and `shadow-lift`. `.glass-card` is theme-aware (`bg-card/80` + blur).
- **Contrast:** AA in both themes. Never use theme-blind literals (`bg-white`, `text-gray-*`) for
  surfaces or text.

## 3. Motion system (headline requirement)

One rhythm for the whole site; tokens live in `src/lib/motion.ts` (`DUR`, `EASE`, `STAGGER`,
`springSoft`, `springSnappy`, `VIEWPORT`) and mirror `--dur-*` / `--ease-out` in `src/index.css`.

Required motion moments — all of them ship by default:

- orchestrated page-load entrance (header, hero portrait, hero text stagger)
- per-section scroll reveals (`Reveal` / `Section` / `whileInView`, once per visit)
- staggered lists (projects, expertise groups, experience, education, certifications, testimonials)
- hover micro-interactions (card lift, image zoom, light sweep, animated underlines, button states)
- animated section headings and dividers, portrait tilt on pointer move
- spring-eased embla carousels with arrows, progress, swipe, keyboard support, and pause on
  hover **and** focus (`stopOnMouseEnter`, `stopOnFocusIn`)
- dialog open/close choreography (Radix + Tailwind animate classes)
- scrolled-header transition and smooth in-page scrolling

Rules: animate **transform and opacity only**, never layout; no cumulative layout shift; the suite
must hold 60 fps. The single fallback is the OS-level `prefers-reduced-motion` setting, applied
through `<MotionConfig reducedMotion="user">` and the CSS media query — it affects only visitors who
enabled it themselves. Never reduce motion for everyone else.

## 4. Theme contract

- Default is the OS preference; the header toggle stores an explicit choice in `localStorage`
  (`portfolio-theme`) and is the only thing that pins a theme.
- A pre-paint inline script in `index.html` applies the stored/system class before first paint — no
  flash. The hook (`src/hooks/use-theme.tsx`) initialises from that class and keeps following the OS
  while no choice is stored.

## 5. Résumé viewer contract

- Section id `#resume`, placed between Testimonials and Contact, with a "Résumé" nav link.
- `ResumeViewer` is a **lazy** chunk (react-pdf 10.2.0 + pdfjs-dist 5.4.296) — it must never be part
  of the entry bundle.
- Default zoom is `min(0.85, fit-width)`; it re-fits on resize until the visitor zooms or presses
  Fit width themselves.
- Toolbar: zoom − / %, zoom +, Fit width, "Page x of y", Open in a new tab, Download.
- Text layer enabled for selection/copy; annotation layer enabled so the PDF's own links work;
  toolbar is keyboard reachable; the scroll region is focusable.
- Fallbacks: `<noscript>` link in the section, and an in-place card with Open/Download if the PDF
  fails to load.
- The PDF is same-origin: `public/Mohaimen-Rashid-Resume.pdf` — the only résumé file the site serves.

## 6. Verification gates (no gate is optional)

## 7. Feedback round 1 contracts (2026-10-01, session 3)

- **Hero fit.** At a 1440×900 viewport (100% zoom) every hero element — name, rotating role,
  lede, sub-line, availability, three proof stats, social icons, both CTAs and "See the work" —
  sits at least 16px above the fold; 1366×768 is the stretch target. No `min-h-[80vh]`; spacing
  comes from `pt-20/24 pb-10`, a two-column grid with an 18rem portrait column.
- **Navigation.** The nav links use the system-UI stack (the previous portfolio's register) at
  14px/15px/base across breakpoints, foreground colour, animated underline; the rest of the site
  stays on Geist.
- **Expertise.** Flat icon tiles (icon circle + skill name) from `skillTiles`, auto-advancing
  drag-free carousel, Show All grid of the same tiles. No category grouping is rendered.
- **Services.** Six services from `services` in `src/data/portfolio.ts`, each with a one-line
  promise and three dossier-true deliverables.
- **Work experience.** Uniform 56px logo tiles on a light backing (`object-contain`), single-column
  hanging bullets, WA Health crest at `public/wa-health.png` (white removed).
- **Education.** Previous look: borderless `bg-card` cards with `shadow-md`, inline logos, plain
  timeline dots, ±50px slide-in on a section that clips horizontal overflow.
- **Certifications.** Borderless tiles flowing in three endless columns (26–34s linear loops, the
  middle column reversed), paused only under `prefers-reduced-motion`.
- **Testimonials.** Arrows + progress bar retained; motion is the previous drag-free loop
  (`dragFree: true`, `duration: 400`, Autoplay 5000, pause on hover/focus).
- **Projects.** Every project card carries real snapshots (featured: 3 each; earlier builds: 2
  each) served from `public/projects/`; card carousels never open the project dialog — only the
  card body does. "Earlier builds — 2023" groups the four Motoko dApps and the two coursework
  builds inside the All Projects dialog.
- **Résumé viewer.** Desktop default zoom is 130% (phones stay on fit-width); the scroll frame is
  `max-h-[85vh]`; Fit width, page indicator, Open and Download stay available.
- **Résumé format.** The summary renders as ONE wrapped paragraph inside the full-bleed band;
  every other section keeps ≥10pt space-before so the rules breathe like the 2024 template.

1. `bun run build` — clean; `ResumeViewer-*.js` present as a separate chunk.
2. `npm run lint` — zero errors; `npx tsc -p tsconfig.app.json --noEmit` — clean.
3. Playwright sweep — screenshots of every section at 1440px and 390px in both themes; zero console
   errors; theme no-flash + persistence; carousel arrows, hover/focus pause and keyboard; dialog
   open/close; viewer default zoom, zoom/fit, page count, text-layer copy, open/download; reduced
   motion still renders content.
4. Content audit — retired emails, "Expected 2026", "March 2020", IoT, Lovable/gpteng traces,
   "Product Owner" (outside verbatim testimonial copy), "3.5 years", "Redcliffe" and hospitality
   must not appear in the rendered site. Run the audit against `src/`, `index.html` and built `dist/`.
