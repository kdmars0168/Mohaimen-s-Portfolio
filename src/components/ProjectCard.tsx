import { motion } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";
import { useState } from "react";
import { ExpandedDialog } from "./ui/dialog-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project } from "@/data/portfolio";
import { DUR, EASE } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const images = project.images ?? [];
  const hasImages = images.length > 0;
  const summary =
    project.description.length > 120
      ? `${project.description.slice(0, 120)}…`
      : project.description;

  const openDialog = () => setIsExpanded(true);
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDialog();
    }
  };

  return (
    <>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: DUR.fast, ease: EASE }}
        className="group glass-card rounded-xl overflow-hidden cursor-pointer h-full flex flex-col hover:shadow-lift transition-shadow"
        onClick={openDialog}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Open project details: ${project.title}`}
      >
        <div className="relative h-40 overflow-hidden shrink-0">
          {images.length > 1 ? (
            <Carousel className="w-full h-full" opts={{ loop: true }}>
              <CarouselContent className="h-full ml-0">
                {images.map((image) => (
                  <CarouselItem key={image} className="pl-0 h-40">
                    <img
                      src={image}
                      alt={`${project.title} — preview`}
                      className="w-full h-40 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 invisible group-hover:visible focus-visible:visible bg-background/80 backdrop-blur" />
              <CarouselNext className="right-2 invisible group-hover:visible focus-visible:visible bg-background/80 backdrop-blur" />
            </Carousel>
          ) : hasImages ? (
            <img
              src={images[0]}
              alt={`${project.title} — preview`}
              className="w-full h-40 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-accent/80 via-secondary to-accent/50 flex items-center justify-center">
              <Layers className="w-10 h-10 text-muted-foreground/70" aria-hidden />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {project.logo && (
            <div className="absolute top-2 right-2 w-9 h-9 rounded-full overflow-hidden bg-background border shadow-sm">
              <img
                src={project.logo}
                alt=""
                className="w-full h-full object-contain p-0.5"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-1 leading-snug line-clamp-2">{project.title}</h3>
          <p className="text-xs text-muted-foreground mb-3">
            {project.meta} · {project.period}
          </p>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{summary}</p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.stack.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.article>

      <ExpandedDialog isOpen={isExpanded} onClose={() => setIsExpanded(false)} title={project.title}>
        <div className="space-y-6">
          {images.length > 1 ? (
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent className="ml-0">
                {images.map((image) => (
                  <CarouselItem key={image} className="pl-0">
                    <img
                      src={image}
                      alt={`${project.title} — preview`}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-background/80 backdrop-blur" />
              <CarouselNext className="right-4 bg-background/80 backdrop-blur" />
            </Carousel>
          ) : hasImages ? (
            <img
              src={images[0]}
              alt={`${project.title} — preview`}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-48 md:h-64 rounded-lg bg-gradient-to-br from-accent/80 via-secondary to-accent/50 flex items-center justify-center">
              <Layers className="w-12 h-12 text-muted-foreground/70" aria-hidden />
            </div>
          )}

          <div className="flex items-center gap-4">
            {project.logo && (
              <img
                src={project.logo}
                alt=""
                className="w-12 h-12 rounded-full object-contain border p-1"
                loading="lazy"
              />
            )}
            <div>
              <p className="text-sm font-medium">{project.meta}</p>
              <p className="text-sm text-muted-foreground">
                {project.period} · {project.category}
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{project.description}</p>

          {project.highlights.length > 0 && (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span aria-hidden className="text-primary/70 leading-6">
                    •
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline break-all"
                >
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>
      </ExpandedDialog>
    </>
  );
};
