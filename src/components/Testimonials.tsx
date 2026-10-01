import { motion } from "framer-motion";
import { Quote, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ExpandedDialog } from "./ui/dialog-content";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { testimonials, type Testimonial } from "@/data/portfolio";
import { DUR, EASE } from "@/lib/motion";

interface TestimonialsProps {
  hideTitle?: boolean;
}

const CarouselProgress = ({ api, count }: { api: CarouselApi; count: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setProgress(api.scrollProgress());
    update();
    api.on("scroll", update);
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("scroll", update);
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const current = api ? api.selectedScrollSnap() + 1 : 1;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
        {current} / {count}
      </span>
      <div
        className="h-1 w-28 rounded-full bg-border overflow-hidden"
        role="progressbar"
        aria-label="Carousel progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <motion.div
          className="h-full bg-primary origin-left"
          animate={{ scaleX: Math.max(progress, 0.02) }}
          transition={{ duration: DUR.fast, ease: EASE }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export const Testimonials = ({ hideTitle }: TestimonialsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [api, setApi] = useState<CarouselApi>();

  const handleApi = useCallback((instance: CarouselApi) => setApi(instance), []);

  return (
    <section id="testimonials" className="py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-end mb-6">
          <Button variant="outline" onClick={() => setShowAll(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Show All
          </Button>
        </div>

        <div className="pb-2">
          <Carousel
            setApi={handleApi}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                stopOnFocusIn: true,
                rootNode: (emblaRoot) => emblaRoot.parentElement,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              duration: 400,
              skipSnaps: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.name}
                  className="pl-3 md:pl-4 basis-full md:basis-1/2 lg:basis-2/5"
                >
                  <motion.figure
                    whileHover={{ y: -4 }}
                    transition={{ duration: DUR.fast, ease: EASE }}
                    className="h-full rounded-xl border bg-card p-6 cursor-pointer hover:shadow-lift transition-shadow flex flex-col"
                    onClick={() => setSelected(testimonial)}
                  >
                    <Quote className="w-8 h-8 text-primary mb-4 shrink-0" aria-hidden />
                    <blockquote className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {testimonial.quote.join(" ")}
                    </blockquote>
                    <figcaption className="flex items-center gap-4 mt-auto">
                      <span className="w-12 h-12 rounded-full overflow-hidden shrink-0 border">
                        <img
                          src={testimonial.image}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold truncate">{testimonial.name}</span>
                        <span className="block text-sm text-muted-foreground truncate">
                          {testimonial.role} · {testimonial.company}
                        </span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex items-center justify-between mt-6">
              <CarouselProgress api={api} count={testimonials.length} />
              <div className="flex items-center gap-2">
                <CarouselPrevious className="static translate-y-0 h-9 w-9" />
                <CarouselNext className="static translate-y-0 h-9 w-9" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      <ExpandedDialog isOpen={showAll} onClose={() => setShowAll(false)} title="All Testimonials">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-xl border cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelected(testimonial)}
            >
              <Quote className="w-8 h-8 text-primary mb-4" aria-hidden />
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {testimonial.quote.join(" ")}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img
                    src={testimonial.image}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ExpandedDialog>

      <ExpandedDialog
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.name} — ${selected.company}` : "Testimonial"}
      >
        {selected && (
          <div className="space-y-5">
            <Quote className="w-8 h-8 text-primary" aria-hidden />
            {selected.quote.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <img
                  src={selected.image}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-semibold">{selected.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selected.role} · {selected.company}
                </p>
              </div>
            </div>
          </div>
        )}
      </ExpandedDialog>
    </section>
  );
};
