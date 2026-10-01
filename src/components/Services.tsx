import { motion } from "framer-motion";
import { Briefcase, ClipboardList, Code2, LineChart, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { services } from "@/data/portfolio";
import { DUR, EASE, VIEWPORT, springSoft, staggerParent } from "@/lib/motion";

interface ServicesProps {
  hideTitle?: boolean;
}

const icons: LucideIcon[] = [Code2, LineChart, ClipboardList, Zap, Briefcase, Sparkles];

export const Services = ({ hideTitle }: ServicesProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerParent()}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {services.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.article
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
              }}
              whileHover={{ y: -6 }}
              transition={springSoft}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card p-6 hover:border-primary/40 hover:shadow-lift transition-[border-color,box-shadow]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-6 w-6 text-primary" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold leading-snug">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.promise}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
};
