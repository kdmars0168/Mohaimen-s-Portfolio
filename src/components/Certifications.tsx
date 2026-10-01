import { motion, useReducedMotion } from "framer-motion";
import { Award, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ExpandedDialog } from "./ui/dialog-content";
import { certifications, type Certification } from "@/data/portfolio";

interface CertificationsProps {
  hideTitle?: boolean;
}

const CertificationTile = ({ cert }: { cert: Certification }) => (
  <div className="flex flex-col items-center rounded-lg px-4 py-6 text-center transition-colors hover:bg-accent/5">
    <Award className="mb-4 h-8 w-8 text-primary" aria-hidden />
    <h3 className="mb-2 text-base font-semibold leading-snug">{cert.title}</h3>
    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
    <p className="mt-1 text-sm text-muted-foreground tabular-nums">{cert.date}</p>
  </div>
);

const COLUMN_COUNT = 3;
const columns = Array.from({ length: COLUMN_COUNT }, (_, column) =>
  certifications.filter((_, index) => index % COLUMN_COUNT === column),
);

export const Certifications = ({ hideTitle }: CertificationsProps) => {
  const [showAll, setShowAll] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {!hideTitle && (
          <div className="mb-8 flex items-center gap-2">
            <Award className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>
        )}

        <div className="mb-8 flex justify-end">
          <Button variant="outline" onClick={() => setShowAll(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Show All
          </Button>
        </div>

        {/* Mobile: plain list, no motion */}
        <div className="grid grid-cols-1 gap-2 md:hidden">
          {certifications.map((cert) => (
            <CertificationTile key={cert.title} cert={cert} />
          ))}
        </div>

        {/* md+: three endless columns of tiles, the previous flow in a tighter register */}
        <div className="relative hidden max-h-[440px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] md:block">
          <div className="grid grid-cols-3 gap-6">
            {columns.map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                animate={
                  prefersReduced
                    ? undefined
                    : { y: columnIndex === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }
                }
                transition={
                  prefersReduced
                    ? undefined
                    : { repeat: Infinity, duration: 26 + columnIndex * 4, ease: "linear" }
                }
                className="flex flex-col gap-2"
              >
                {[...column, ...column].map((cert, index) => (
                  <CertificationTile
                    key={`${columnIndex}-${index}-${cert.title}`}
                    cert={cert}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ExpandedDialog isOpen={showAll} onClose={() => setShowAll(false)} title="All Certifications">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {certifications.map((cert) => (
            <CertificationTile key={cert.title} cert={cert} />
          ))}
        </div>
      </ExpandedDialog>
    </section>
  );
};
