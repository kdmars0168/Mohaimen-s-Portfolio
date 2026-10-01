import { motion } from "framer-motion";
import { Briefcase, Building2 } from "lucide-react";
import { experience } from "@/data/portfolio";
import { DUR, EASE, VIEWPORT, staggerParent } from "@/lib/motion";

interface WorkExperienceProps {
  hideTitle?: boolean;
}

const entryVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export const WorkExperience = ({ hideTitle }: WorkExperienceProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!hideTitle && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-center">Work Experience</h2>
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerParent()}
          className="space-y-6"
        >
          {experience.map((entry) => (
            <motion.article
              key={`${entry.org}-${entry.period}`}
              variants={entryVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: DUR.fast, ease: EASE }}
              className="relative group rounded-xl border bg-card/60 backdrop-blur-md p-6 shadow-soft hover:shadow-lift transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {entry.logo ? (
                    <img
                      src={entry.logo}
                      alt=""
                      className="w-14 h-14 rounded-lg object-contain bg-white border p-1.5 shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <span className="w-14 h-14 rounded-lg border bg-accent/40 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-primary" aria-hidden />
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{entry.role}</h3>
                    <p className="text-muted-foreground">{entry.org}</p>
                    <p className="text-xs text-muted-foreground mt-1">{entry.context}</p>
                  </div>
                </div>
                <div className="md:text-right shrink-0">
                  <p className="text-sm font-medium tabular-nums">{entry.period}</p>
                  <p className="text-xs text-muted-foreground">{entry.place}</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span aria-hidden className="text-primary/70 leading-6">
                      •
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
