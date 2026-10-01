import { motion } from "framer-motion";
import { Award, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ExpandedDialog } from "./ui/dialog-content";
import { certifications, type Certification } from "@/data/portfolio";
import { DUR, EASE, VIEWPORT, staggerParent } from "@/lib/motion";

interface CertificationsProps {
  hideTitle?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

const CertificationCard = ({ cert }: { cert: Certification }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4 }}
    transition={{ duration: DUR.fast, ease: EASE }}
    className="flex flex-col items-center text-center p-6 rounded-xl border bg-card/50 hover:bg-accent/40 hover:shadow-soft transition-[background-color,box-shadow]"
  >
    <Award className="w-8 h-8 text-primary mb-4" aria-hidden />
    <h3 className="text-base font-semibold mb-2 leading-snug">{cert.title}</h3>
    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
    <p className="text-xs text-muted-foreground mt-2 tabular-nums">{cert.date}</p>
  </motion.div>
);

export const Certifications = ({ hideTitle }: CertificationsProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {!hideTitle && (
          <div className="flex items-center gap-2 mb-8">
            <Award className="w-6 h-6" />
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>
        )}

        <div className="flex justify-end mb-6">
          <Button variant="outline" onClick={() => setShowAll(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Show All
          </Button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerParent()}
          className="marquee-viewport relative overflow-hidden max-h-[420px] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
        >
          <div
            className="marquee-track grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            style={{ ["--marquee-duration"]: "44s" } as React.CSSProperties}
          >
            {[...certifications, ...certifications].map((cert, index) => (
              <CertificationCard key={`${cert.title}-${index}`} cert={cert} />
            ))}
          </div>
        </motion.div>
      </div>

      <ExpandedDialog isOpen={showAll} onClose={() => setShowAll(false)} title="All Certifications">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <CertificationCard key={cert.title} cert={cert} />
          ))}
        </div>
      </ExpandedDialog>
    </section>
  );
};
