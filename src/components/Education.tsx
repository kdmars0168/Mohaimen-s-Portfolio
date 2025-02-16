import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface EducationProps {
  hideTitle?: boolean;
}

const education = [
  {
    institution: 'The University Of Western Australia',
    logo: '/uwa.png',
    degree: 'Master of Information Technology',
    period: 'Expected 2026',
    achievements: [
      'Object-Oriented Programming, Agile Web Development, Software Testing and Quality Assurance, IoT, Cloud Computing',
    ],
  },
  {
    institution: 'Deakin University',
    logo: '/deakin.png',
    degree: 'Bachelor Of Business Analytics',
    period: 'Completed October 2022',
    achievements: [
      'Business Analytics, Data Science, Predictive Analytics, Project Management, Artificial Intelligence for Business',
    ],
  },
];

export const Education = ({ hideTitle }: EducationProps) => {
  return (
    <section id="education" className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!hideTitle && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <GraduationCap className="w-6 h-6" />
            <h2 className="text-3xl font-bold text-center">Education</h2>
          </div>
        )}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary/20" />
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}
                >
                  <div className="bg-card p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      {edu.logo && (
                        <img
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {edu.institution}
                        </h3>
                        <p className="text-primary text-sm mb-1">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {edu.period}
                        </p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
