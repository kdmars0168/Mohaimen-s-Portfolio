import { motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  BarChart3,
  Book,
  BookOpen,
  Boxes,
  Brain,
  Briefcase,
  ClipboardList,
  Cloud,
  Code,
  Code2,
  CreditCard,
  Database,
  FileSpreadsheet,
  FileText,
  GitBranch,
  GitFork,
  GraduationCap,
  Layers,
  LineChart,
  MessageSquare,
  MonitorSmartphone,
  Network,
  PenTool,
  PieChart,
  Plus,
  Server,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import { ExpandedDialog } from "./ui/dialog-content";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { skillTiles } from "@/data/portfolio";
import { DUR, EASE, VIEWPORT, springSoft } from "@/lib/motion";

interface SkillsSectionProps {
  hideTitle?: boolean;
}

const icons: Record<string, LucideIcon> = {
  "Requirements gathering & elicitation": FileText,
  "Stakeholder management (320+)": Users,
  "User stories & backlog management (1,200+ / 420+)": ClipboardList,
  "BRD, SRS & UAT documentation": BookOpen,
  "Agile & Scrum delivery": Zap,
  "Process mapping & BPMN 2.0": GitFork,
  "SQL & relational databases": Database,
  "Data analysis & statistics": BarChart3,
  "Power BI & advanced Excel": LineChart,
  "Supply-chain analytics": Boxes,
  Python: Code2,
  "Business intelligence": BarChart2,
  "Data warehousing": Server,
  "Data mining & machine learning": Brain,
  "Natural language processing": MessageSquare,
  "Decision analytics": Target,
  "Product, marketing & financial analysis": Briefcase,
  "Cybersecurity fundamentals": ShieldCheck,
  "Software requirements & design": PenTool,
  "JIRA · Confluence · Azure DevOps": Settings,
  "Figma & wireframing": PenTool,
  "Git & GitHub pull-request workflow": GitBranch,
  "SuccessFactors Learning (LMS administration)": GraduationCap,
  "Executive & secretariat support — agendas, minutes, committee papers": Book,
  "R (coursework)": Activity,
  Docker: Boxes,
  "GitHub Actions": Zap,
  "Postman / Swagger": Share2,
  TypeScript: Code,
  "Node.js": Server,
  "React Native": MonitorSmartphone,
  MongoDB: Database,
  Linux: Terminal,
  GitLab: GitFork,
  VBA: FileSpreadsheet,
  Stripe: CreditCard,
  Tableau: PieChart,
  "Azure ML": Cloud,
  Kubernetes: Layers,
  Terraform: Network,
  GraphQL: Share2,
  "AI systems": Brain,
  "RAG pipelines": Network,
  "LLM applications": Sparkles,
  "Prompt & token optimisation": Zap,
};

const SkillTile = ({ name, index, full = false }: { name: string; index: number; full?: boolean }) => {
  const Icon = icons[name] ?? Layers;

  return (
    <motion.div
      initial={full ? undefined : "hidden"}
      whileInView={full ? undefined : "show"}
      viewport={full ? undefined : VIEWPORT}
      variants={
        full
          ? undefined
          : {
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: DUR.base, ease: EASE, delay: (index % 5) * 0.05 },
              },
            }
      }
      whileHover={full ? { y: -4 } : undefined}
      transition={springSoft}
      className={`flex flex-col items-center text-center ${
        full ? "w-28 sm:w-32 p-3 rounded-xl hover:bg-accent/40 transition-colors" : "px-3"
      }`}
    >
      <span className="w-16 h-16 rounded-full bg-accent/60 ring-1 ring-border/60 flex items-center justify-center mb-3 shadow-soft">
        <Icon className="w-7 h-7 text-primary" aria-hidden />
      </span>
      <h3 className="text-sm font-medium leading-snug text-balance">{name}</h3>
    </motion.div>
  );
};

export const SkillsSection = ({ hideTitle }: SkillsSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="skills" className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2400,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
            }),
          ]}
          opts={{ align: "start", loop: true, dragFree: true, duration: 34 }}
          className="w-full"
        >
          <div className="flex items-center justify-end mb-8">
            <Button variant="outline" onClick={() => setShowAll(true)} className="gap-2">
              <Plus className="w-4 h-4" /> Show All
            </Button>
          </div>
          <CarouselContent className="-ml-2">
            {skillTiles.map((skill, index) => (
              <CarouselItem
                key={skill}
                className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <SkillTile name={skill} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <ExpandedDialog isOpen={showAll} onClose={() => setShowAll(false)} title="All Expertise">
        <div className="flex flex-wrap justify-center gap-4">
          {skillTiles.map((skill, index) => (
            <SkillTile key={skill} name={skill} index={index} full />
          ))}
        </div>
      </ExpandedDialog>
    </section>
  );
};
