import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const designations = [
  'Business Analyst',
  'Project Manager',
  'Product Owner',
  'Scrum Master',
];

export const ProfileSection = () => {
  const [designationIndex, setDesignationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDesignationIndex((prev) => (prev + 1) % designations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mohaimenrashid/',
      label: 'LinkedIn',
    },
    { icon: Github, href: 'https://github.com/kdmars0168', label: 'GitHub' },

    {
      icon: Mail,
      href: 'mailto:marashid0168@gmail.com', // Replace with your actual email
      label: 'Email',
    },
  ];

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-end"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-accent hover:scale-105 transition-transform duration-300">
            <img
              src="/mohaimen.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.className = 'hidden';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.className =
                    'w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center border-4 border-accent bg-accent/10';
                  parent.innerHTML =
                    '<div class="text-accent"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg></div>';
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mohaimen Rashid
          </h1>

          <motion.div
            key={designationIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-8 mb-4"
          >
            <p className="text-xl text-primary font-bold">
              {designations[designationIndex]}
            </p>
          </motion.div>

          <p className="text-lg text-muted-foreground mb-8">
            Results-driven Business Analyst with over 3 years of experience
            delivering transformative ERP, CRM, and HRM solutions for global
            organizations, including $10B+ enterprises. Proficient in Agile
            methodologies, requirements gathering, and tools like JIRA, Azure
            DevOps, and Power BI. Skilled in optimising processes, managing
            diverse stakeholders, and ensuring client satisfaction. Pursuing a
            Master of Information Technology to enhance technical expertise.
          </p>

          <div className="flex items-center gap-6 mb-8">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <Button
            onClick={() =>
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="rounded-full hover:scale-105 transition-transform"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
