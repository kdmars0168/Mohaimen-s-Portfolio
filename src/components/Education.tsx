import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";
import { VIEWPORT } from "@/lib/motion";

interface EducationProps {
  hideTitle?: boolean;
}

export const Education = ({ hideTitle }: EducationProps) => {
  return (
    <section id="education" className="overflow-x-clip py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!hideTitle && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <GraduationCap className="w-6 h-6" />
            <h2 className="text-3xl font-bold text-center">Education</h2>
          </div>
        )}

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-primary/20"
            aria-hidden
          />
          <div className="space-y-8">
            {education.map((entry, index) => (
              <motion.div
                key={entry.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"
                />
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div className="bg-card p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      {entry.logo && (
                        <img
                          src={entry.logo}
                          alt={`${entry.institution} logo`}
                          className="w-12 h-12 object-contain shrink-0"
                          loading="lazy"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{entry.institution}</h3>
                        <p className="text-primary text-sm mb-1">{entry.degree}</p>
                        <p className="text-xs text-muted-foreground mb-2">{entry.period}</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                          {entry.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
