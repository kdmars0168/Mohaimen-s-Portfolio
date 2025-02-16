import { motion } from 'framer-motion';
import { Award, Plus } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { ExpandedDialog } from './ui/dialog-content';

const certifications = [
  { title: 'Complete Web Development Bootcamp', issuer: 'Udemy', date: '2023' },
  { title: 'SQL Bootcamp', issuer: 'Udemy', date: '2023' },
  {
    title: 'The Practical BPMN 2.0 Master Class',
    issuer: 'Udemy',
    date: '2022',
  },
  {
    title: 'The Complete SQL Bootcamp: Go From Zero to Hero',
    issuer: 'Udemy',
    date: '2023',
  },
  {
    title: 'Scrum Master Certification 2023 + Agile Scrum Certification',
    issuer: 'Udemy',
    date: '2021',
  },
  {
    title: 'Agile Leadership and Resilient Teams',
    issuer: 'Udemy',
    date: '2021',
  },
  {
    title: 'Detailed Guide to Building Wireframes Using Balsamiq Mockups',
    issuer: 'Udemy',
    date: '2021',
  },
  { title: 'UX Strategy Fundamentals', issuer: 'Udemy', date: '2021' },
];

interface CertificationsProps {
  hideTitle?: boolean;
}

export const Certifications = ({ hideTitle }: CertificationsProps) => {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {!hideTitle && (
          <div className="flex items-center gap-2 mb-8">
            <Award className="w-6 h-6" />
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>
        )}

        <div className="flex justify-end mb-8">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" /> Show All
          </Button>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden max-h-[400px]"
        >
          <motion.div
            animate={{ y: ['0%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {[...certifications, ...certifications].map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-accent/5 transition-colors"
              >
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {cert.date}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <ExpandedDialog
        isOpen={showAll}
        onClose={() => setShowAll(false)}
        title="All Certifications"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-h-[500px] overflow-y-auto">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-accent/5 transition-colors"
            >
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              <p className="text-sm text-muted-foreground mt-2">{cert.date}</p>
            </div>
          ))}
        </div>
      </ExpandedDialog>
    </section>
  );
};
