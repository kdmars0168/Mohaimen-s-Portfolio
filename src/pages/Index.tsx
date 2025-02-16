import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProfileSection } from '@/components/ProfileSection';
import { ProjectsSection } from '@/components/ProjectsSection'; // ✅ Imported refactored Projects Section
import { WorkExperience } from '@/components/WorkExperience';
import { Certifications } from '@/components/Certifications';
import { SkillsSection } from '@/components/SkillsSection';
import { Education } from '@/components/Education';
import { Services } from '@/components/Services';
import { ContactForm } from '@/components/ContactForm';
import { Testimonials } from '@/components/Testimonials';
import {
  Brain,
  Wrench,
  Briefcase,
  GraduationCap,
  Award,
  Quote,
  MailIcon,
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <ProfileSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 py-16">
            <ProjectsSection />

            <section id="skills" className="rounded-xl">
              <div className="flex items-center gap-2 mb-8 justify-start md:justify-center">
                <Brain className="w-6 h-6" />
                <h2 className="text-2xl md:text-3xl font-bold">Expertise</h2>
              </div>
              <SkillsSection hideTitle />
            </section>

            <section id="services" className="rounded-xl">
              <div className="flex items-center gap-2 mb-8 justify-start md:justify-center">
                <Wrench className="w-6 h-6" />
                <h2 className="text-2xl md:text-3xl font-bold">Services</h2>
              </div>
              <Services />
            </section>

            <section id="work-experience">
              <div className="flex items-center gap-2 mb-8 justify-start md:justify-center">
                <Briefcase className="w-6 h-6" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Work Experience
                </h2>
              </div>
              <WorkExperience hideTitle />
            </section>

            <section id="education">
              <div className="flex items-center gap-2 mb-8 justify-start md:justify-center">
                <GraduationCap className="w-6 h-6" />
                <h2 className="text-2xl md:text-3xl font-bold">Education</h2>
              </div>
              <Education hideTitle />
            </section>

            <section id="certifications">
              <div className="flex items-center gap-2 mb-8 justify-start md:justify-center">
                <Award className="w-6 h-6" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  Certifications
                </h2>
              </div>
              <Certifications hideTitle />
            </section>

            <section id="testimonials">
              <div className="flex items-center gap-2 mb-8 justify-start md:justify-center">
                <Quote className="w-6 h-6" />
                <h2 className="text-2xl md:text-3xl font-bold">Testimonials</h2>
              </div>
              <Testimonials hideTitle />
            </section>

            <section id="contact">
              <div className="flex items-center gap-2 mb-8 justify-start md:justify-center">
                <MailIcon className="w-6 h-6" />
                <h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
              </div>
              <ContactForm hideTitle />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
