import { motion } from "framer-motion";
import { Layers, Plus, Sparkles, Target, Wrench } from "lucide-react";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import { ExpandedDialog } from "./ui/dialog-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { skills, type SkillGroup } from "@/data/portfolio";
import { DUR, EASE, springSoft } from "@/lib/motion";

interface SkillsSectionProps {
  hideTitle?: boolean;
}

const groupIcons = [Target, Wrench, Layers, Sparkles];

const SkillGroupCard = ({
  group,
  index,
  full = false,
}: {
  group: SkillGroup;
  index: number;
  full?: boolean;
}) => {
  const Icon = groupIcons[index % groupIcons.length];
  const maxItems = 6;
  const items = full ? group.items : group.items.slice(0, maxItems);
  const hidden = group.items.length - items.length;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={springSoft}
      className="h-full rounded-xl border bg-card p-6 flex flex-col hover:shadow-lift transition-shadow"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold mb-1">{group.title}</h3>
      <p className="text-xs text-muted-foreground mb-4">{group.note}</p>
      <ul className="flex flex-wrap gap-2 mt-auto">
        {items.map((item) => (
          <li
            key={item}
            className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
          >
            {item}
          </li>
        ))}
        {hidden > 0 && (
          <li className="px-2.5 py-1 text-xs rounded-full border border-dashed text-muted-foreground">
            +{hidden} more
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export const SkillsSection = ({ hideTitle }: SkillsSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="skills" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4600,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
            }),
          ]}
          opts={{ align: "start", loop: true, duration: 30 }}
          className="w-full"
        >
          <div className="flex items-center justify-end gap-2 mb-6">
            <Button variant="outline" onClick={() => setShowAll(true)} className="gap-2 mr-1">
              <Plus className="w-4 h-4" /> Show All
            </Button>
            <CarouselPrevious className="static translate-y-0 h-9 w-9" />
            <CarouselNext className="static translate-y-0 h-9 w-9" />
          </div>
          <CarouselContent className="-ml-3 md:-ml-4">
            {skills.map((group, index) => (
              <CarouselItem
                key={group.title}
                className="pl-3 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <SkillGroupCard group={group} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <ExpandedDialog isOpen={showAll} onClose={() => setShowAll(false)} title="All Expertise">
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((group, index) => (
            <SkillGroupCard key={group.title} group={group} index={index} full />
          ))}
        </div>
      </ExpandedDialog>
    </section>
  );
};
