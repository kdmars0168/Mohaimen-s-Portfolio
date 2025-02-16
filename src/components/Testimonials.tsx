import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Plus } from 'lucide-react';
import { ExpandedDialog } from './ui/dialog-content';
import { Button } from './ui/button';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface Testimonial {
  name: string;
  position: string;
  company: string;
  image: string;
  text: string[];
  companyLogo?: string;
}

interface TestimonialsProps {
  hideTitle?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Deep Roy Moulick',
    position: 'AGM (IT) || Chief Technology Officer',
    company: 'CDIP',
    image: '/deep.png',
    companyLogo: '/cdip.png',
    text: [
      "An exceptional project manager who consistently delivers results. Their leadership transformed our team's productivity and helped us achieve our goals ahead of schedule. The attention to detail and strategic thinking brought to our projects was invaluable.",
      'During his time on my team, he played a pivotal role in gathering and analyzing business requirements, bridging the gap between stakeholders and technical teams. His ability to translate complex data into actionable insights significantly contributed to the success of our projects. He consistently demonstrated strong communication skills, keen attention to detail, and a proactive approach to solving business challenges.',
      'What sets Mohaimen apart is his dedication to continuous improvement and his willingness to take on new challenges. He is a team player who collaborates effectively with cross-functional teams and always ensures that project objectives are met efficiently.',
      'I highly recommend Mohaimen Rashid to any organization looking for a talented and driven Business Analyst. His skills, work ethic, and analytical expertise make him a valuable asset to any team',
    ],
  },
  {
    name: 'Sarfaraz Khan',
    position: 'Product Manager @ AMH | Executive MBA, CSPO',
    company: 'AMH',
    image: '/sarfaraz.png',
    text: [
      'Mohaimen is a very diligent and hard working professional. He was very meticulous to his approach for every task and would ask a lot of questions for getting full clarity of the situation. Definitely would make a fine addition to every team he joins in his career.',
    ],
  },
  {
    name: 'Alimur Razi Rana',
    position: 'Full-Stack | JavaScript | Angular | React | .NET | Azure',
    company: 'Cefalo',
    image: '/alimur.png',
    text: [
      'I had the pleasure of working with Mohaimen Rashid when he was a Business Analyst and I was a developer on the team. His dedication and effectiveness in bridging the gap between the development team and the client were truly impressive.',
      'Mohaimen ensured we understood the business requirements clearly by gathering detailed insights from the client and translating them into actionable tasks for our team. He also handled our queries with diligence, seeking out clarifications from the client and resolving any concerns promptly.',
      'Additionally, Mohaimen seamlessly collaborated with internal teams, such as DevOps and QA, while maintaining an agile workflow. This led to higher productivity and enhanced the client’s trust in our work.',
      'I highly recommend Mohaimen Rashid for any kind of Business Analyst or Product Owner role. His ability to lead, communicate, and adapt makes him an invaluable asset to any team.',
    ],
  },
  {
    name: 'Shamsul Islam Rana',
    position: 'Software Engineer',
    company: 'Adventure Dhaka',
    image: '/rana.png',
    text: [
      'I had the pleasure of working with Mohaimen at CDIP, where he was an exceptional Business Analyst. He has a great ability to turn complex business needs into clear, actionable insights. His attention to detail, problem-solving skills, and ability to collaborate with both stakeholders and technical teams made a real difference in our projects.',
      'Beyond his technical expertise, Mohaimen is a fantastic teammate—always approachable, eager to learn, and committed to delivering results. Any organization would be lucky to have him!',
    ],
  },
  {
    name: 'Sheikh Rezwanul Islam',
    position: 'Support Engineer | Active QA Professional',
    company: 'CDIP',
    image: '/sk.png',
    text: [
      'I highly recommend Mohaimen as a Business Analyst. His ability to simplify complex problems, deliver actionable insights, and collaborate effectively makes him an invaluable asset to any team. A true professional.',
    ],
  },
  {
    name: 'Fardin Ananta',
    position:
      'Robotics Engineer | Business Development | Media-tech | Data Analyst',
    company: 'Tyger Media',
    image: '/fardin.png',
    text: [
      'Mohaimen is a very smart and capable young man. He is very detail oriented and a perfectionist in his work and was a valuable asset on my team.',
    ],
  },
];

export const Testimonials = ({ hideTitle }: TestimonialsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const plugin = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  });

  return (
    <section id="testimonials" className="py-4 px-4 bg-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
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
        <div className="h-[420px]">
          <Carousel
            plugins={[plugin]}
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
              skipSnaps: false,
              duration: 400,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-2/5"
                >
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    className="bg-card border border-gray-300 p-6 rounded-xl h-full cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedTestimonial(testimonial)}
                  >
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <ExpandedDialog
        isOpen={showAll}
        onClose={() => setShowAll(false)}
        title="All Testimonials"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-xl border cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ExpandedDialog>

      <ExpandedDialog
        isOpen={!!selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
        title="Testimonial"
      >
        {selectedTestimonial && (
          <div className="space-y-6">
            <Quote className="w-8 h-8 text-primary" />

            {/* Correctly display text as paragraphs */}
            {Array.isArray(selectedTestimonial.text) ? (
              selectedTestimonial.text.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">
                {selectedTestimonial.text}
              </p>
            )}

            <div className="flex items-center gap-4 pt-4 border-t">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">{selectedTestimonial.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedTestimonial.position} at{' '}
                  {selectedTestimonial.company}
                </p>
              </div>
            </div>
          </div>
        )}
      </ExpandedDialog>
    </section>
  );
};
