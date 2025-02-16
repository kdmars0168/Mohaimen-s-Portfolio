import { useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { ExpandedDialog } from '@/components/ui/dialog-content';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Code, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'DELTA Security AG - ERP System',
    description:
      'For DELTA Security AG, I contributed to the development of an ERP system with integrated CRM, HRM, and Project Management modules, significantly improving business operations. The CRM module featured an automated ticketing system and real-time client interaction tracking, which reduced response times by 40% and increased customer satisfaction by 25%. The HRM module introduced payroll automation, attendance tracking, and employee record management, cutting payroll processing time by 30% and improving data accuracy by 20%. The Project Management module included task assignment, deadline tracking, and team collaboration tools, reducing project completion time by 35% and boosting team efficiency by 40%. These features streamlined workflows, minimized manual errors, and enhanced overall productivity.',
    tags: ['CRM', 'HRM', 'Project Management'],
    images: ['/deltaproject1.png', '/deltaproject2.png', '/deltaproject3.png'],
    companyLogo: '/delta.png',
    timeline: 'July 2021 – December 2022',
  },
  {
    title: 'Amberg Technologies AG - RailTrack Measurement System (RMS)',
    description:
      'I developed the RailTrack Measurement System (RMS), a real-time track monitoring application that achieved 90% accuracy in assessing track conditions. The system featured automated anomaly detection, predictive maintenance alerts, and real-time data processing, allowing for early issue detection and proactive maintenance. Additionally, I implemented a reporting and visualization module, generating detailed charts and analytics that improved decision-making efficiency by 20%. These enhancements streamlined railway maintenance, improved safety, and reduced unexpected track failures.',
    tags: ['RMS', 'Scrum', 'Team Leadership'],
    images: [
      '/ambergproject1.png',
      '/ambergproject2.png',
      '/ambergproject3.png',
    ],
    companyLogo: '/amberg.png',
    timeline: 'December 2022 – May 2023',
  },
  {
    title: 'Credit Exchange AG - Commission and Billing Tool',
    description:
      'For Credit Exchange AG, I developed a Commission and Billing Tool, designed to handle precise mortgage calculations and automate payment processes. The system integrated real-time commission tracking, automated invoicing, and error detection mechanisms, ensuring seamless financial transactions. As a result, it achieved a high accuracy rate, significantly reducing billing errors and improving overall payment efficiency.',
    tags: ['Billing Tool', ' Agile'],
    images: [
      '/credexproject2.png',
      '/credexproject1.png',
      '/credexproject3.png',
    ],
    companyLogo: '/credex.png',
    timeline: 'December 2022 – May 2023',
  },
  {
    title: 'Lubnan Trade Consortium Ltd. - HRM, ROM and SCM',
    description:
      'At Lubnan Trade Consortium Ltd., I developed and implemented key business management systems to enhance efficiency across multiple departments. I engineered a Human Resources Management (HRM) system that automated employee transitions, payroll processing, and transactions, reducing processing time by 20% and improving overall workflow. Additionally, I designed a Retail Operation Management (ROM) system that streamlined outlet management, staff supervision, payroll generation, and inventory tracking, optimizing retail operations and minimizing manual errors. To improve supply chain processes, I developed an integrated Supply Chain Management (SCM) system that enhanced warehouse operations, resource allocation, and procurement tracking, leading to a 15% reduction in resource allocation time and a 20% improvement in raw materials management. These systems collectively improved operational efficiency, reduced costs, and strengthened business performance.',
    tags: ['HRM', 'ROM', 'SCM'],
    images: ['/lubnanproject1.png', '/lubnanproject2.png'],
    companyLogo: '/lubnan.png',
    timeline: 'September 2023 – July 2024',
  },
  {
    title: 'German Club - Event Management and Facility Booking Software',
    description:
      'At German Club Dhaka, I developed an Event Management Software that improved the member signup process by 50%, reducing manual approvals through an automated workflow. The system integrated payment gateways, leading to a 40% faster transaction process and enabling seamless internal wallet management, which reduced payment errors by 30%. Additionally, I created a Facility Booking Software that enhanced the member booking experience, reducing booking time by 45% and improving payment processing efficiency by 35%. These solutions streamlined operations, minimized administrative workload, and significantly improved overall user experience.',
    tags: ['Event Management', 'Membership Management', 'Facility Booking'],
    images: [
      '/germanclubproject1.png',
      '/germanclubproject2.png',
      '/germanclubproject3.png',
    ],
    companyLogo: '/germanclub.png',
    timeline: 'November 2023 – July 2024',
  },
  {
    title: 'JOTE - Micro Investing Solution',
    description:
      'I developed JOTE.io, a micro-investing platform that democratizes investment opportunities through tokenization and collective pooling, enabling users to invest in real estate, gold, stock markets, banking products, and startups with as little as 500 Taka. The platform features automated portfolio management, real-time investment tracking, and transparent reporting, ensuring users can monitor and optimize their investments efficiently. Key modules include fractional real estate investment, gold asset trading, stock market portfolios, and profit-earning opportunities from banks and NGOs. Additionally, educational resources and investment simulators allow users to enhance financial literacy and practice risk-free investing. A collaborative investing feature enables group investments with family and friends, maximizing financial leverage. By prioritizing financial inclusivity, automation, and transparency, JOTE.io empowers users to make informed investment decisions and build long-term wealth.',
    tags: [
      'Micro Investing Solution',
      'Stock Market',
      'Gold Trading',
      'Real Estate',
      'Crowdfunding',
    ],
    images: ['/joteproject1.png', '/joteproject2.png', '/joteproject3.png'],
    companyLogo: '/jote.png',
    timeline: 'December 2023 – July 2024',
  },
  {
    title: 'SATU, PIDIM Foundation, Hydrus Digital',
    description:
      'At SATU, PIDIM Foundation, and Hydrus Digital, I developed customized HRM solutions tailored to the specific requirements of each organization. These solutions optimized employee management, payroll processing, and leave tracking, leading to a 40% improvement in HR process efficiency. Additionally, by implementing automation for customized features, I reduced processing time by 35%, minimizing manual work and enhancing overall accuracy. These improvements streamlined HR operations, reduced administrative workload, and ensured a more efficient workforce management system.',
    tags: [
      'Human Resources Management',
      'Employee Management',
      ' Payroll Management',
    ],
    images: [
      '/hydrusproject1.png',
      '/hydrusproject2.png',
      '/hydrusproject3.png',
    ],
    companyLogo: '/hydrus.png',
    timeline: 'June 2023 – July 2024',
  },
  {
    title: 'Hypatia AG - HRM and Recruiting Software',
    description:
      'I developed a recruiting software that revolutionizes job matching by using intelligent algorithms, similar to how users are paired on Tinder, but based on key hiring metrics such as skills, experience, and employer preferences. The platform seamlessly connects job seekers with relevant opportunities, enhancing the hiring process with automated profile matching, real-time job recommendations, and application tracking. Additionally, an HRM feature was integrated for administrators, enabling candidate management, interview scheduling, and employee onboarding within a single system. By combining data-driven matchmaking with HR automation, this solution streamlines recruitment, reduces hiring time, and improves workforce management efficiency.',
    tags: [
      'Human Resources Management',
      'Recruiting Software',
      'Job Matching Platform',
    ],
    images: [
      '/hypatiaproject1.png',
      '/hypatiaproject2.png',
      '/hypatiaproject3.png',
    ],
    companyLogo: '/hypatia.png',
    timeline: 'November 2022 – January 2023',
  },
  {
    title: 'Hawle - Fire Hydrants Portal',
    description:
      'I contributed to the development of the Hawle Fire Hydrants Portal, a real-time monitoring and management system designed to optimize fire hydrant maintenance, operational tracking, and emergency response. The platform features an interactive GIS-based map that allows users to visually manage hydrants across different city zones while accessing live data on water pressure, flow rates, and temperature levels through IoT connectivity. An alerts and reporting module provides real-time notifications for issues such as high pressure, low flow rates, and system malfunctions, improving response times and minimizing downtime. Additionally, an asset management dashboard helps administrators track hydrant locations, battery levels, maintenance logs, and performance metrics, ensuring proactive maintenance. By integrating predictive analytics, automation, and streamlined data visualization, the system enhances fire safety infrastructure, optimizes resource management, and ensures rapid issue resolution for municipalities and emergency services.',
    tags: [
      'IoT Monitoring',
      'GIS Mapping',
      'Emergency Response',
      'RealTime Tracking'
    ],
    images: [
      '/hawleproject1.png',
      '/hawleproject2.png',
      '/hawleproject3.png',
    ],
    companyLogo: '/hawle.png',
    timeline: 'November 2022 – January 2023',
  },
];

export const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectsPlugin = Autoplay({ delay: 3000, stopOnInteraction: false });

  return (
    <section id="projects" className="rounded-xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 justify-start md:justify-center mx-auto">
          <Code className="w-6 h-6" />
          <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAllProjects(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" /> Show All
        </Button>
      </div>
      <Carousel
        plugins={[projectsPlugin]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projects.map((project) => (
            <CarouselItem
              key={project.title}
              className="pl-2 md:pl-4 basis-full md:basis-1/3"
            >
              <ProjectCard {...project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ExpandedDialog
        isOpen={showAllProjects}
        onClose={() => setShowAllProjects(false)}
        title="All Projects"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </ExpandedDialog>
    </section>
  );
};
