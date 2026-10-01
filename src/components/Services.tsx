import { motion } from "framer-motion";
import {
  BarChart2,
  Users,
  Sparkles,
  Target,
  Scale,
  LineChart,
} from "lucide-react";
import { DUR, EASE, VIEWPORT, staggerParent } from "@/lib/motion";

interface ServicesProps {
  hideTitle?: boolean;
}

const services = [
  {
    title: "Project Management",
    description: "End-to-end project planning, execution, and delivery",
    icon: Target,
  },
  {
    title: "Team Leadership",
    description: "Building and managing high-performing teams",
    icon: Users,
  },
  {
    title: "Digital Transformation",
    description: "Guiding organizations through digital evolution",
    icon: Sparkles,
  },
  {
    title: "Risk Management",
    description: "Identifying and mitigating project risks",
    icon: Scale,
  },
  {
    title: "Process Optimization",
    description: "Streamlining operations for maximum efficiency",
    icon: BarChart2,
  },
  {
    title: "Performance Analysis",
    description: "Data-driven insights and recommendations",
    icon: LineChart,
  },
];

export const Services = ({ hideTitle }: ServicesProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerParent()}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
            }}
            whileHover={{ y: -6 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:bg-accent/40 hover:shadow-lift transition-[background-color,box-shadow]"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
              <service.icon className="w-6 h-6 text-primary" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
