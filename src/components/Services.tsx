
import { motion } from "framer-motion";
import { 
  BarChart2, 
  Users, 
  Sparkles,
  Target,
  Scale,
  LineChart
} from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
            }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-xl bg-card p-6 hover:bg-accent/5"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <service.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
