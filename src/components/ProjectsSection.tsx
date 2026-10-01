import { useState } from "react";
import { Plus } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { ProjectCard } from "@/components/ProjectCard";
import { ExpandedDialog } from "@/components/ui/dialog-content";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { earlierBuilds, featuredProjects, moreProjects } from "@/data/portfolio";

interface ProjectsSectionProps {
  hideTitle?: boolean;
}

export const ProjectsSection = (_props: ProjectsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const allProjects = [...featuredProjects, ...moreProjects];

  return (
    <section id="projects" className="rounded-xl">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4200,
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
          {featuredProjects.map((project) => (
            <CarouselItem
              key={project.id}
              className="pl-3 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ExpandedDialog isOpen={showAll} onClose={() => setShowAll(false)} title="All Projects">
        <div className="grid gap-6 md:grid-cols-2">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6 border-t pt-4">{earlierBuilds}</p>
      </ExpandedDialog>
    </section>
  );
};
