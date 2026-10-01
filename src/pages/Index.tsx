import { motion } from "framer-motion";
import {
  Award,
  Brain,
  Briefcase,
  Code,
  FileText,
  GraduationCap,
  MailIcon,
  Quote,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileSection } from "@/components/ProfileSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { WorkExperience } from "@/components/WorkExperience";
import { Certifications } from "@/components/Certifications";
import { SkillsSection } from "@/components/SkillsSection";
import { Education } from "@/components/Education";
import { Services } from "@/components/Services";
import { ContactForm } from "@/components/ContactForm";
import { Testimonials } from "@/components/Testimonials";
import { ResumeSection } from "@/components/ResumeSection";
import { Reveal } from "@/components/motion/Reveal";
import { DUR, EASE } from "@/lib/motion";

const SectionHeading = ({ icon: Icon, children }: { icon: typeof Brain; children: ReactNode }) => (
  <Reveal>
    <div className="flex items-center gap-2 mb-8 justify-start md:justify-center">
      <Icon className="w-6 h-6 text-primary" aria-hidden />
      <h2 className="text-2xl md:text-3xl font-bold">{children}</h2>
    </div>
  </Reveal>
);

const Section = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: DUR.slow, ease: EASE }}
    className={`scroll-mt-24 ${className ?? ""}`}
  >
    {children}
  </motion.section>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.slow, ease: EASE }}
        >
          <ProfileSection />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 py-16">
            <Section id="projects">
              <SectionHeading icon={Code}>Featured Projects</SectionHeading>
              <ProjectsSection hideTitle />
            </Section>

            <Section id="skills">
              <SectionHeading icon={Brain}>Expertise</SectionHeading>
              <SkillsSection hideTitle />
            </Section>

            <Section id="services">
              <SectionHeading icon={Wrench}>Services</SectionHeading>
              <Services />
            </Section>

            <Section id="work-experience">
              <SectionHeading icon={Briefcase}>Work Experience</SectionHeading>
              <WorkExperience hideTitle />
            </Section>

            <Section id="education">
              <SectionHeading icon={GraduationCap}>Education</SectionHeading>
              <Education hideTitle />
            </Section>

            <Section id="certifications">
              <SectionHeading icon={Award}>Certifications</SectionHeading>
              <Certifications hideTitle />
            </Section>

            <Section id="testimonials">
              <SectionHeading icon={Quote}>Testimonials</SectionHeading>
              <Testimonials hideTitle />
            </Section>

            <Section id="resume">
              <SectionHeading icon={FileText}>Résumé</SectionHeading>
              <ResumeSection hideTitle />
            </Section>

            <Section id="contact">
              <SectionHeading icon={MailIcon}>Contact</SectionHeading>
              <ContactForm hideTitle />
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
