import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Target,
  LineChart,
  ShieldCheck,
  Brain,
  Plus,
  Code,
  Database,
  FileText,
  BarChart,
  Book,
  Settings,
  Layers,
  Activity,
  MonitorSmartphone,
  Globe,
  PencilRuler,
  Wrench,
  ClipboardList,
  Server,
} from 'lucide-react'; // ✅ Import diverse icons
import { useState } from 'react';
import { Button } from './ui/button';
import { ExpandedDialog } from './ui/dialog-content';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface SkillsSectionProps {
  hideTitle?: boolean;
}

const skills = [
  // Project Management & Agile
  { name: 'Project Management', icon: Briefcase },
  { name: 'Agile Scrum Methodology', icon: ClipboardList },
  { name: 'Stakeholder Management', icon: Users },
  { name: 'Requirements Gathering', icon: FileText },
  { name: 'System Design', icon: Layers },

  // Tools & Technologies
  { name: 'Power BI', icon: BarChart },
  { name: 'JIRA', icon: ClipboardList },
  { name: 'Azure DevOps', icon: Server },
  { name: 'SQL', icon: Database },

  // UI/UX & Documentation
  { name: 'Figma', icon: PencilRuler },
  { name: 'Confluence', icon: Book },

  // Web Development Knowledge
  { name: 'HTML', icon: Code },
  { name: 'CSS', icon: Globe },
  { name: 'JavaScript', icon: MonitorSmartphone },
  { name: 'React', icon: Activity },
];

export const SkillsSection = ({ hideTitle }: SkillsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const plugin = Autoplay({ delay: 1300, stopOnInteraction: false });

  return (
    <section id="skills" className="py-12 px-4 bg-accent/5">
      <div className="max-w-4xl mx-auto">
        {/* Title & Expand Button */}
        <div className="flex items-center justify-between mb-12">
          <div className="ml-auto">
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" /> Show All
            </Button>
          </div>
        </div>

        {/* Skill Carousel */}
        <Carousel
          plugins={[plugin]}
          opts={{
            align: 'start',
            loop: true,
            dragFree: true, // ✅ Ensures smooth autoplay without jumping
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {skills.map((skill, index) => (
              <CarouselItem
                key={skill.name}
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} // ✅ Prevents re-animation when scrolling
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-6"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 shadow-md">
                    <skill.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-medium">{skill.name}</h3>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Expanded Dialog for All Skills */}
      <ExpandedDialog
        isOpen={showAll}
        onClose={() => setShowAll(false)}
        title="All Expertise"
      >
        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center text-center p-4 w-32"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 shadow-lg">
                <skill.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-medium">{skill.name}</h3>
            </div>
          ))}
        </div>
      </ExpandedDialog>
    </section>
  );
};
