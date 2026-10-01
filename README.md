# Mohaimen Rashid (Shanin) — portfolio

Source for my portfolio site: background, enterprise project work, skills, work experience,
education, certifications, testimonials and an in-app résumé viewer.

**Live:** https://mohaimen-portfolio.vercel.app/

---

## What is on it

- Profile hero with a rotating role line and a proof row
- Featured projects — enterprise, academic and personal — with image carousels and expandable detail dialogs
- Expertise, services, work experience, education and certifications
- Eight colleague testimonials (verbatim)
- **Résumé** — a lazily loaded PDF viewer (zoom, fit width, page count, text selection for copy,
  open in a new tab, download)
- Contact form (Formspree) and footer

## Content

`src/data/portfolio.ts` is the single source of truth for every rendered claim. Nothing is written
inline in a component. The dossier rules are documented in `docs/ui-standards.md`.

## Stack

- React 18 + TypeScript, Vite 5
- Tailwind CSS with shadcn/ui components
- framer-motion (motion system, shared tokens in `src/lib/motion.ts`)
- embla-carousel with autoplay (projects, expertise, testimonials)
- react-pdf 10 / pdfjs-dist 5 for the résumé viewer (lazy chunk)
- Self-hosted Geist (sans + mono) — no third-party font requests
- Deployed on Vercel

## Running it

```bash
bun install     # or: npm install
bun run dev     # or: npm run dev
```

Production build and checks:

```bash
bun run build                                  # vite build
npm run lint                                   # eslint
npx tsc -p tsconfig.app.json --noEmit          # type check
```

## Résumé file

`public/Mohaimen-Rashid-Resume.pdf` is the only résumé file the site serves. It is produced by the
classic résumé engine in the separate job-hunt project (`tools/render_classic.py`), which emits that
exact `.docx` and `.pdf` pair.

## Theme and motion

- Theme follows the OS by default; the header toggle stores an explicit choice and a pre-paint script
  applies it before first paint (no flash).
- The motion system runs for every visitor. `prefers-reduced-motion` is an OS-level fallback that
  only affects visitors who enabled it themselves.
