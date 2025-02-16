import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExpandedDialog } from './ui/dialog-content';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  images: string[]; // Change from `image` to `images` array
  companyLogo?: string;
  fullDescription?: string;
  projectUrl?: string;
  timeline?: string;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  images,
  companyLogo,
  fullDescription,
  projectUrl,
  timeline,
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If no images are provided, fallback to an empty array
  const validImages =
    images && images.length > 0 ? images : ['/placeholder.png'];

  const truncatedDescription =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="glass-card rounded-xl overflow-hidden cursor-pointer h-[320px]"
        onClick={() => setIsExpanded(true)}
      >
        {/* Main Image Carousel */}
        <div className="relative h-36 overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {validImages.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img}
                    alt={`${title} - Image ${index + 1}`}
                    className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-lg"
                    loading="lazy"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {companyLogo && (
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full overflow-hidden bg-white">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {truncatedDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Expanded Dialog for Full Project Details */}
      <ExpandedDialog
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title={title}
      >
        <div className="space-y-6">
          {/* Full-Screen Carousel Inside Expanded Dialog */}
          <Carousel className="w-full">
            <CarouselContent>
              {validImages.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img}
                    alt={`${title} - Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                    loading="lazy"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70" />
          </Carousel>

          {/* Company Logo & Timeline */}
          {companyLogo && (
            <div className="flex items-center gap-4">
            <img
              src={companyLogo}
              alt="Company Logo"
              className="w-12 h-12 rounded-full object-contain border "
            />
            {timeline && (
              <p className="text-sm text-muted-foreground">{timeline}</p>
            )}
          </div>
          )}

          {/* Full Description */}
          <p className="text-muted-foreground">
            {fullDescription || description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Link */}
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-primary hover:underline"
            >
              View Project →
            </a>
          )}
        </div>
      </ExpandedDialog>
    </>
  );
};
