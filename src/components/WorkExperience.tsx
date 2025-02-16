import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Business Analyst",
    company: "Center for Development Innovation and Practices (CDIP)",
    companyLogo: "/cdip.png",
    period: "June 2023 – July 2024",
    achievements: [
      "Spearheaded analysis for 6 enterprise projects, including CRM and HRM platforms for NGOs and supply chain systems.",
      "Collaborated with 320+ stakeholders to gather requirements and authored 420+ user stories and test cases.",
      "Produced comprehensive technical documents, including BRDs, SRS, and UAT reports, ensuring alignment with client goals.",
      "Optimized processes with tailored solutions, achieving a 20% reduction in processing time and a 15% improvement in resource allocation.",
    ],
  },
  {
    title: "Business Analyst",
    company: "SELISE Digital Platforms",
    companyLogo: "/selise.png",
    period: "July 2021 – May 2023",
    achievements: [
      "Led ERP and CRM integrations for multinational clients, including a CHF10B security services company and a CHF12B rail leader, improving efficiency by 30%.",
      "Coordinated a 12-member Scrum team, managing Sprint planning and retrospectives while designing 160+ clickable prototypes to mitigate disruptions.",
      "Authored 1,200+ user stories and test cases, translating business requirements into actionable technical solutions for timely project delivery.",
    ],
  },
  {
    title: "Business Development Intern",
    company: "The Tech Academy",
    period: "March 2020 – May 2021",
    companyLogo: "/tta.png",
    achievements: [
      "Conducted in-depth market research, identifying a $1M profit opportunity and driving a 15% revenue increase through optimized operations.",
      "Designed a customer loyalty program projected to increase memberships by 20%, enhancing client engagement and satisfaction.",
    ],
  },
];

interface WorkExperienceProps {
  hideTitle?: boolean;
}

export const WorkExperience = ({ hideTitle }: WorkExperienceProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        {!hideTitle && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-center">Work Experience</h2>
          </div>
        )}

        {/* Work Experience List */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-6 rounded-xl border backdrop-blur-md group-hover:bg-accent/5 transition-colors shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  
                  {/* Company Logo & Details */}
                  <div className="flex items-start gap-4">
                    {exp.companyLogo && (
                      <img
                        src={exp.companyLogo}
                        alt={`${exp.company} logo`}
                        className="w-14 h-14 rounded-lg object-contain flex-shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-primary">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {exp.company} • {exp.period}
                      </p>
                    </div>
                  </div>

                  {/* Divider on Larger Screens */}
                  <div className="hidden md:block w-px h-12 bg-border" />

                  {/* Achievements List */}
                  <ul className="list-disc list-outside pl-6 space-y-2 text-sm text-muted-foreground">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
