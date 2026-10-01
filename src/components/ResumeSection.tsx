import { Suspense, lazy } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { resume } from "@/data/portfolio";

const ResumeViewer = lazy(() =>
  import("./ResumeViewer").then((module) => ({ default: module.ResumeViewer })),
);

interface ResumeSectionProps {
  hideTitle?: boolean;
}

export const ResumeSection = ({ hideTitle }: ResumeSectionProps) => (
  <section id="resume" aria-label="Résumé">
    {!hideTitle && (
      <div className="flex items-center justify-start md:justify-center gap-2 mb-8">
        <h2 id="resume-title" className="text-2xl md:text-3xl font-bold">
          Résumé
        </h2>
      </div>
    )}
    <Reveal>
      <p className="max-w-2xl mx-auto text-sm text-muted-foreground text-center mb-8">
        The current résumé — preview it here, zoom or scroll, select text to copy, or download the
        PDF. The file is served from this site.
      </p>
      <Suspense
        fallback={
          <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
            Loading résumé…
          </div>
        }
      >
        <ResumeViewer file={resume.file} fileName={resume.fileName} />
      </Suspense>
      <noscript>
        <p className="mt-4 text-sm text-center">
          <a className="text-primary underline" href={resume.file}>
            Open the résumé PDF
          </a>
        </p>
      </noscript>
    </Reveal>
  </section>
);
