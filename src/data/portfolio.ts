/**
 * Single source of truth for every rendered claim on this site.
 * Verified against G:\job-hunt\me.md and resumes\master-it.yaml (2026-10).
 * Never render: work-rights claims, hospitality roles, IoT, SAP, TRIM, ArcGIS,
 * retired email addresses, "3.5 years", or any number that is not in the dossier.
 */

export interface SocialLink {
  label: string;
  href: string;
}

export interface ProofItem {
  value: string;
  label: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  place: string;
  context: string;
  bullets: string[];
  logo?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  meta: string;
  period: string;
  category: "Enterprise" | "Academic" | "Personal";
  description: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
  logo?: string;
  images?: string[];
}

export interface SkillGroup {
  title: string;
  note: string;
  items: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  logo?: string;
  points: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string[];
}

export const profile = {
  name: "Mohaimen Rashid (Shanin)",
  roles: "Software Developer · Data Analyst · Business Analyst · IT Consultant",
  subline:
    "Master of Information Technology (Applied Computing), UWA · Python · SQL · React · Power BI · Perth, WA",
  availability:
    "Open to software, data, analysis and IT roles across Perth — and remote nationally.",
  lede:
    "I work at both ends of software delivery: sitting with the people who will use a system to work out what it has to do, then building it. Requirements in the morning, repository in the afternoon.",
  about: [
    "Across professional roles in Europe and South Asia, an Australian government placement and two IT degrees, I have worked at both ends of software delivery — business analysis and the engineering that follows it.",
    "My Master of Information Technology (Applied Computing) at UWA is the technical spine: Python, relational databases, natural language processing, software requirements and design, cybersecurity and agile web development. My Bachelor of Business Analytics at Deakin is the quantitative one — statistics, data mining and machine learning, business intelligence and data warehousing — completed on a Deakin International Merit Scholarship.",
    "What I have built: at the WA Department of Health I replaced a legacy Microsoft Access database governing Needle and Syringe Program approvals with a SharePoint Lists system and a fully migrated record set. At SELISE Digital Platforms I delivered ERP, CRM and HRM work for Swiss clients, including a rail-monitoring system that reached 90% accuracy in assessing track condition. At UWA I built the timeline engine and the complete authentication layer for AI Museum WA, and HealthWhisper, a Flask analytics app for personal health data. On my own time I build — a Supabase household finance app in daily use, and Motoko dApps on the Internet Computer.",
    "Artificial intelligence is where my attention is now — RAG, LLMs and applied AI systems. Languages: English (professional — PTE 86), Bengali (native), Hindi and Urdu (conversational).",
  ],
  email: "shaninrashid00@gmail.com",
  location: "Perth, Western Australia",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohaimenrashid/" },
    { label: "GitHub", href: "https://github.com/kdmars0168" },
  ] as SocialLink[],
};

export const proof: ProofItem[] = [
  { value: "3+", label: "Years in business analysis" },
  { value: "9", label: "Enterprise platforms delivered" },
  { value: "MIT", label: "Applied Computing, UWA — 2026" },
];

export const experience: ExperienceEntry[] = [
  {
    role: "NSP Approvals System Intern",
    org: "WA Department of Health",
    period: "Nov – Dec 2025",
    place: "East Perth, WA",
    context: "Communicable Disease Control Directorate · 100-hour placement",
    logo: "/wa-health.png",
    bullets: [
      "Replaced a legacy Microsoft Access database governing Needle and Syringe Program approvals under the Medicines and Poisons Act 2014, delivering a SharePoint Lists system with the full historical approval record set migrated and validated against source.",
      "Mapped the end-to-end approvals workflow with the Data Systems team — intake, assessment and certificate generation — and authored a business requirements and future-plan document adopted as the directorate’s roadmap.",
      "Automated applicant correspondence and certificate generation with Power Automate and mail merge, removing the transcription errors inherent to the manual process.",
      "Built a stage-2 Power Apps prototype demonstrating the future-state system, and was rated Excellent on all four assessment criteria by the host supervisor.",
    ],
  },
  {
    role: "Business Analyst",
    org: "Center for Development Innovation and Practices (CDIP)",
    period: "Jun 2023 – Jul 2024",
    place: "Dhaka, Bangladesh",
    context: "NGO, supply-chain and workforce platforms",
    logo: "/cdip.png",
    bullets: [
      "Led analysis across six enterprise projects, including CRM and HRM platforms for NGOs and supply-chain systems for fair-trade organisations.",
      "Worked with 320+ stakeholders and authored 420+ user stories and test cases.",
      "Produced BRDs, SRS documents and UAT reports, and streamlined approval workflows with Microsoft Access, Excel and SharePoint Lists — a 20% reduction in processing time and 15% better resource allocation.",
      "Coordinated project meetings, agendas and minutes, and prepared discussion papers and briefings for project sponsors.",
    ],
  },
  {
    role: "Business Analyst",
    org: "SELISE Digital Platforms",
    period: "Jul 2021 – May 2023",
    place: "Dhaka, Bangladesh · Swiss clients",
    context: "ERP, CRM and HRM delivery for multinational clients",
    logo: "/selise.png",
    bullets: [
      "Led ERP and CRM integrations for multinational clients — a CHF 10B security services group and a CHF 12B rail technology leader — improving operational efficiency by 30%.",
      "Coordinated a 12-member Scrum team through sprint planning and retrospectives, and designed 160+ clickable prototypes to de-risk delivery.",
      "Authored 1,200+ user stories and test cases, translating business requirements into buildable specifications for development and QA teams.",
      "Supported Power BI dashboards and data-quality validation for public and nonprofit clients.",
    ],
  },
  {
    role: "Business Development Intern",
    org: "The Tech Academy",
    period: "Mar – Jun 2021",
    place: "Dhaka, Bangladesh",
    context: "Market research, financial modelling and customer programmes",
    logo: "/tta.png",
    bullets: [
      "Conducted market research identifying a $1M profit opportunity, and contributed to a 15% revenue increase through optimised operations.",
      "Designed a customer loyalty programme projected to lift memberships by 20%.",
      "Built financial models and analysis in Excel that improved financial decision-making by 20%, and produced sales material that lifted client engagement by 10%.",
    ],
  },
];

export const featuredProjects: Project[] = [
  {
    id: "ai-museum",
    title: "AI Museum WA — “A.I. Software Technology in Western Australia”",
    meta: "UWA capstone · team of 5 · Distinction (75)",
    period: "2026",
    category: "Academic",
    description:
      "A full-stack virtual museum presenting ten major AI paradigm shifts for schools and the public. I built the timeline engine, moved topic content behind a Flask and SQLAlchemy API, and delivered the complete authentication system — hashed passwords, sessions and protected routes.",
    highlights: [
      "Rebuilt the timeline page from a broken grid layout so markers align to the prototype, and shipped client-side filtering by decade, category and status.",
      "Added an Active/Legacy status field end-to-end: database model, seed data, API response and UI badges.",
      "Authentication layer with username, email and hashed passwords; login, signup, logout and route protection for the guided tour.",
      "Feature work merged through reviewed pull requests #4 and #20; the team suite finished green with 41 passing pytest and Selenium tests.",
    ],
    stack: ["Python", "Flask", "SQLAlchemy", "Flask-Login", "Jinja", "SQLite", "pytest", "Selenium"],
    links: [
      {
        label: "github.com/RoshiniVadla75/Group-22---CITS5206",
        href: "https://github.com/RoshiniVadla75/Group-22---CITS5206",
      },
    ],
    images: ["/projects/ai-museum-1.png", "/projects/ai-museum-2.png", "/projects/ai-museum-3.png"],
  },
  {
    id: "budget-tracker",
    title: "Combined Budget Tracker",
    meta: "Personal build · in daily use",
    period: "2026",
    category: "Personal",
    description:
      "A Supabase-backed household finance app: sign in, share a household, keep the everyday money view calm and simple. Households are separated at the database level with Postgres row-level security, and payslips can be imported from a photo with browser OCR.",
    highlights: [
      "12 ordered SQL migrations including RLS, storage policies and a privilege-hardening pass, with SQL tests asserting household isolation.",
      "React 18 + TypeScript front end on Vite, Recharts for the money view, Tesseract.js for payslip OCR, Vitest for tests.",
      "17 design and security documents written before deployment, including a security checklist, staging review and go/no-go.",
      "Live and in daily use by me and my partner.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Supabase", "PostgreSQL", "RLS", "Recharts", "Vitest"],
    links: [
      { label: "couple-money-staging.vercel.app", href: "https://couple-money-staging.vercel.app/" },
      { label: "github.com/kdmars0168/combined-budget-tracker", href: "https://github.com/kdmars0168/combined-budget-tracker" },
    ],
    images: [
      "/couple-money-preview.png",
      "/projects/budget-tracker-1.png",
      "/projects/budget-tracker-2.png",
    ],
  },
  {
    id: "healthwhisper",
    title: "HealthWhisper",
    meta: "UWA team project · team of 3",
    period: "Apr – May 2025",
    category: "Academic",
    description:
      "A Flask web app that turns uploaded personal health data — steps, sleep, mood — into charts you can share one data type at a time. I created the repository and built the core flows across two semesters of commits and nine merged pull requests.",
    highlights: [
      "Registration, login, logout and the authenticated-redirect flow; profile fields on the user model with Alembic migrations.",
      "Dashboard and upload interface with preview, CSV template download and validation.",
      "Mood pie-chart logic, timeframe filtering, trend-score calculation and the dynamic analysis summary.",
      "Test-isolation fixes plus Selenium logout and registration coverage, with pytest across routes, models, auth and the API.",
    ],
    stack: ["Python", "Flask", "SQLAlchemy", "Alembic", "Flask-Login", "Jinja", "Tailwind", "pytest", "Selenium"],
    links: [{ label: "github.com/kdmars0168/data-analytics-app", href: "https://github.com/kdmars0168/data-analytics-app" }],
    images: [
      "/projects/healthwhisper-1.png",
      "/projects/healthwhisper-2.png",
      "/projects/healthwhisper-3.png",
    ],
  },
  {
    id: "amberg",
    title: "Amberg Technologies AG — RailTrack Measurement System",
    meta: "SELISE · Swiss rail technology client",
    period: "Dec 2022 – May 2023",
    category: "Enterprise",
    description:
      "A real-time track monitoring system for a CHF 12B rail technology company: 90% accuracy in assessing track condition, automated anomaly detection and predictive maintenance alerts.",
    highlights: [
      "90% accuracy in assessing track condition, with automated anomaly detection and real-time data processing.",
      "Reporting and visualisation module that improved decision-making efficiency by 20%.",
      "Reduced unexpected track failures through early issue detection and proactive maintenance.",
    ],
    stack: ["Requirements", "Agile delivery", "Data visualisation"],
    links: [],
    logo: "/amberg.png",
    images: ["/ambergproject1.png", "/ambergproject2.png", "/ambergproject3.png"],
  },
  {
    id: "delta",
    title: "DELTA Security AG — ERP with CRM, HRM and Project Management",
    meta: "SELISE · CHF 10B security services client",
    period: "Jul 2021 – Dec 2022",
    category: "Enterprise",
    description:
      "An integrated ERP for a CHF 10B security services group — customer ticketing, payroll automation and project management in one system.",
    highlights: [
      "CRM module: automated ticketing and real-time client tracking — response times down 40%, customer satisfaction up 25%.",
      "HRM module: payroll automation, attendance and records — payroll processing time down 30%, data accuracy up 20%.",
      "Project management module: task assignment, deadlines and collaboration — project completion time down 35%, team efficiency up 40%.",
    ],
    stack: ["Requirements", "Process design", "Scrum"],
    links: [],
    logo: "/delta.png",
    images: ["/deltaproject1.png", "/deltaproject2.png", "/deltaproject3.png"],
  },
  {
    id: "lubnan",
    title: "Lubnan Trade Consortium — HRM, ROM and SCM",
    meta: "CDIP · fair-trade supply chain",
    period: "Sep 2023 – Jul 2024",
    category: "Enterprise",
    description:
      "Business management systems across HR, retail operations and supply chain for a fair-trade consortium.",
    highlights: [
      "HRM: employee transitions, payroll and transactions — processing time down 20%.",
      "ROM: outlet management, staff supervision, payroll generation and inventory tracking.",
      "SCM: warehouse operations and procurement tracking — resource allocation time down 15%, raw materials management up 20%.",
    ],
    stack: ["Requirements", "Process mapping", "UAT"],
    links: [],
    logo: "/lubnan.png",
    images: ["/lubnanproject1.png", "/lubnanproject2.png"],
  },
];

export const moreProjects: Project[] = [
  {
    id: "credit-exchange",
    title: "Credit Exchange AG — Commission and Billing Tool",
    meta: "SELISE · Swiss mortgage fintech",
    period: "Sep 2021 – Jan 2023",
    category: "Enterprise",
    description:
      "A commission and billing tool for precise mortgage calculations, automated payment processing, real-time commission tracking, invoicing and error detection — high accuracy, fewer billing errors and faster payments.",
    highlights: [],
    stack: ["Requirements", "Billing workflows"],
    links: [],
    logo: "/credex.png",
    images: ["/credexproject1.png", "/credexproject2.png", "/credexproject3.png"],
  },
  {
    id: "german-club",
    title: "German Club Dhaka — Event Management and Facility Booking",
    meta: "CDIP engagement",
    period: "Nov 2023 – Jul 2024",
    category: "Enterprise",
    description:
      "Membership, event and facility booking software with payment gateway integration and an internal wallet.",
    highlights: [
      "Member signup improved 50% through an automated approval workflow.",
      "Transactions 40% faster; payment errors down 30%.",
      "Facility booking time down 45%; payment processing efficiency up 35%.",
    ],
    stack: ["Payments", "Process automation"],
    links: [],
    logo: "/germanclub.png",
    images: ["/germanclubproject1.png", "/germanclubproject2.png", "/germanclubproject3.png"],
  },
  {
    id: "satu-hrm",
    title: "SATU, PIDIM Foundation and Hydrus Digital — custom HRM",
    meta: "CDIP · three organisations",
    period: "Jun 2023 – Jul 2024",
    category: "Enterprise",
    description:
      "Customised HRM solutions for three organisations — employee management, payroll and leave tracking.",
    highlights: [
      "HR process efficiency up 40%.",
      "Automation of customised features cut processing time by 35%.",
    ],
    stack: ["HRM", "Payroll systems"],
    links: [],
    logo: "/hydrus.png",
    images: ["/hydrusproject1.png", "/hydrusproject2.png", "/hydrusproject3.png"],
  },
  {
    id: "jote",
    title: "JOTE.io — Micro-Investing Platform",
    meta: "Client project · BA / PM",
    period: "Dec 2023 – Jul 2024",
    category: "Enterprise",
    description:
      "A micro-investing platform for Bangladesh: tokenised, pooled access to real estate, gold, stocks, banking products and startups from 500 Taka, with automated portfolio management and investment simulators.",
    highlights: [],
    stack: ["Product discovery", "Requirements"],
    links: [],
    logo: "/jote.png",
    images: ["/joteproject1.png", "/joteproject2.png", "/joteproject3.png"],
  },
  {
    id: "hypatia",
    title: "Hypatia AG — HRM and Recruiting Software",
    meta: "SELISE · recruiting platform",
    period: "Nov 2022 – Jan 2023",
    category: "Enterprise",
    description:
      "Recruiting software with intelligent job matching on skills, experience and employer preferences, plus candidate management, interview scheduling and onboarding for administrators.",
    highlights: [],
    stack: ["Job matching", "HR workflows"],
    links: [],
    logo: "/hypatia.png",
    images: ["/hypatiaproject1.png", "/hypatiaproject2.png", "/hypatiaproject3.png"],
  },
  {
    id: "hawle",
    title: "Hawle — Fire Hydrants Portal",
    meta: "SELISE · municipal infrastructure",
    period: "Nov 2022 – Jan 2023",
    category: "Enterprise",
    description:
      "A real-time monitoring and management system for fire-hydrant maintenance, with a GIS-based map across city zones, live sensor readings for pressure, flow and temperature, alerts, and an asset-management dashboard.",
    highlights: [],
    stack: ["GIS mapping", "Real-time monitoring"],
    links: [],
    logo: "/hawle.png",
    images: ["/hawleproject1.png", "/hawleproject2.png", "/hawleproject3.png"],
  },
];

export const earlierBuilds =
  "Four Internet Computer dApps written in Motoko (Nov 2023) — a keeper, a bank, a token and an NFT marketplace prototype — plus bootcamp coursework in Node, PostgreSQL and authentication.";

export const earlierBuildsProjects: Project[] = [
  {
    id: "dkeeper",
    title: "DKeeper — notes on the Internet Computer",
    meta: "Bootcamp build · Motoko + React",
    period: "Nov 2023",
    category: "Personal",
    description:
      "A Google Keep-style note-taker whose notes live in a Motoko canister rather than a conventional database. Notes are written from the React front end, held in stable storage and returned by query calls.",
    highlights: [
      "Notes persist in canister state through stable variables, so they survive canister upgrades.",
      "createNote, readNotes and removeNote are exposed from the Motoko actor and called through the generated Candid interface.",
      "Reads use query calls and writes use update calls — the latency difference is visible in the running app.",
    ],
    stack: ["Motoko", "Internet Computer", "React", "Webpack"],
    links: [
      { label: "github.com/kdmars0168/DKeeper-App-Blockchain", href: "https://github.com/kdmars0168/DKeeper-App-Blockchain" },
    ],
    images: ["/projects/dkeeper-1.png", "/projects/dkeeper-2.png"],
  },
  {
    id: "dbank",
    title: "DBank — a decentralised bank canister",
    meta: "Bootcamp build · Motoko on-chain state",
    period: "Nov 2023",
    category: "Personal",
    description:
      "A bank whose balance lives inside the canister: deposit, withdraw and let the balance compound from the canister's own clock between transactions.",
    highlights: [
      "Interest compounds from the time elapsed since the last update, using the canister's own clock rather than a cron job.",
      "Balance and timestamp are stable variables, so both survive canister upgrades.",
      "Withdrawals are guarded against invalid amounts, and the same methods are callable from the dfx CLI.",
    ],
    stack: ["Motoko", "Internet Computer", "JavaScript", "dfx"],
    links: [
      { label: "github.com/kdmars0168/DBank-Blockchain-App", href: "https://github.com/kdmars0168/DBank-Blockchain-App" },
    ],
    images: ["/projects/dbank-1.png", "/projects/dbank-2.png"],
  },
  {
    id: "dang-token",
    title: "DANG — a token and faucet on the Internet Computer",
    meta: "Bootcamp build · token ledger in Motoko",
    period: "Nov 2023",
    category: "Personal",
    description:
      "A custom cryptocurrency token with an interactive front end for checking balances and transferring between accounts, plus a faucet that pays out 10,000 DANG to a signed-in principal.",
    highlights: [
      "Token balances are keyed by principal and transfers are validated against the sender's balance.",
      "The faucet pays out through an authenticated identity rather than a shared wallet.",
      "The front end calls the canister directly with typed arguments through the Candid interface.",
    ],
    stack: ["Motoko", "Internet Computer", "React", "@dfinity/agent"],
    links: [
      { label: "github.com/kdmars0168/DANG-Crypto-Token", href: "https://github.com/kdmars0168/DANG-Crypto-Token" },
    ],
    images: ["/projects/dang-1.png", "/projects/dang-2.png"],
  },
  {
    id: "opend",
    title: "OpenD — NFT marketplace, one canister per NFT",
    meta: "Bootcamp build · canister-per-asset design",
    period: "Nov 2023",
    category: "Personal",
    description:
      "A marketplace where users mint NFTs, list them for sale, browse the listings and buy from other owners. Each minted NFT is deployed as its own canister, so ownership records live on-chain.",
    highlights: [
      "Canister-per-asset design: minting creates a new NFT canister that holds its own name, owner and image bytes.",
      "The marketplace tracks NFTs, owners and listings in HashMaps keyed by principal, and pays for the new canisters in cycles.",
      "React front end with a discovery gallery, a personal collection view and a minting form calling generated Candid interfaces.",
    ],
    stack: ["Motoko", "Internet Computer", "React", "Bootstrap"],
    links: [
      { label: "github.com/kdmars0168/OpenD-NFT-Marketplace", href: "https://github.com/kdmars0168/OpenD-NFT-Marketplace" },
    ],
    images: ["/projects/opend-1.png", "/projects/opend-2.png"],
  },
  {
    id: "postgres-todo",
    title: "To-Do List — PostgreSQL from the server down",
    meta: "Bootcamp coursework · Node + PostgreSQL",
    period: "2023",
    category: "Personal",
    description:
      "A server-rendered to-do list backed by a real PostgreSQL database: add, edit, tick off and delete items with SQL rather than client-side state.",
    highlights: [
      "Express routes issue parameterised INSERT, UPDATE and DELETE statements against the items table.",
      "EJS renders the list on the server, so the page works without a client framework.",
      "Schema and seed data are kept as SQL in queries.sql alongside the app.",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "EJS"],
    links: [
      { label: "github.com/kdmars0168/ToDoList-w-PostgreSQL", href: "https://github.com/kdmars0168/ToDoList-w-PostgreSQL" },
    ],
    images: ["/projects/postgres-todo-1.png", "/projects/postgres-todo-2.png"],
  },
  {
    id: "auth-secrets",
    title: "Authentication & Security — six levels in one Express app",
    meta: "Bootcamp coursework · Node, MongoDB, Passport",
    period: "2023",
    category: "Personal",
    description:
      "The bootcamp's authentication ladder in a single app: plain-text storage, encryption, MD5, bcrypt salting, Passport sessions and finally Google OAuth 2.0 — behind one 'secrets' board.",
    highlights: [
      "Passport local strategy with salted, hashed password storage and session-based login.",
      "Protected routes: submitting a secret requires an authenticated session and lands back on the shared board.",
      "OAuth 2.0 flow wired for Google sign-in alongside the local strategy.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Passport", "OAuth 2.0"],
    links: [
      { label: "github.com/kdmars0168/Authentication-Security", href: "https://github.com/kdmars0168/Authentication-Security" },
    ],
    images: ["/projects/auth-secrets-1.png", "/projects/auth-secrets-2.png"],
  },
];

export const skills: SkillGroup[] = [
  {
    title: "Core strengths",
    note: "Backed by professional delivery and assessed coursework",
    items: [
      "Requirements gathering & elicitation",
      "Stakeholder management (320+)",
      "User stories & backlog management (1,200+ / 420+)",
      "BRD, SRS & UAT documentation",
      "Agile & Scrum delivery",
      "Process mapping & BPMN 2.0",
      "SQL & relational databases",
      "Data analysis & statistics",
      "Power BI & advanced Excel",
      "Supply-chain analytics",
    ],
  },
  {
    title: "Working",
    note: "Used in role, in study or in shipped projects",
    items: [
      "Python",
      "Business intelligence",
      "Data warehousing",
      "Data mining & machine learning",
      "Natural language processing",
      "Decision analytics",
      "Product, marketing & financial analysis",
      "Cybersecurity fundamentals",
      "Software requirements & design",
      "JIRA · Confluence · Azure DevOps",
      "Figma & wireframing",
      "Git & GitHub pull-request workflow",
      "SuccessFactors Learning (LMS administration)",
      "Executive & secretariat support — agendas, minutes, committee papers",
      "R (coursework)",
    ],
  },
  {
    title: "Technical exposure",
    note: "Used in projects or roles — not pitched as deep specialisms",
    items: [
      "Docker",
      "GitHub Actions",
      "Postman / Swagger",
      "TypeScript",
      "Node.js",
      "React Native",
      "MongoDB",
      "Linux",
      "GitLab",
      "VBA",
      "Stripe",
      "Tableau",
      "Azure ML",
      "Kubernetes",
      "Terraform",
      "GraphQL",
    ],
  },
  {
    title: "Currently developing",
    note: "Where my attention is now",
    items: ["AI systems", "RAG pipelines", "LLM applications", "Prompt & token optimisation"],
  },
];

/** Flat, ordered tile list for the Expertise carousel — derived, never hand-maintained. */
export const skillTiles: string[] = skills.flatMap((group) => group.items);

export interface ServiceEntry {
  title: string;
  promise: string;
  deliverables: string[];
}

export const services: ServiceEntry[] = [
  {
    title: "Software & Systems Delivery",
    promise: "From requirements to a shipped system — web apps, internal tools and integrations.",
    deliverables: [
      "Flask and React builds with tested authentication and data layers (AI Museum WA, HealthWhisper)",
      "SharePoint Lists and Power Automate replacing a legacy Access approvals system (WA Department of Health)",
      "PostgreSQL and Supabase schemas with row-level security in daily use (Combined Budget Tracker)",
    ],
  },
  {
    title: "Data & Analytics",
    promise: "Turn operational data into decisions people can act on.",
    deliverables: [
      "SQL analysis and data-quality validation across enterprise and public-sector data",
      "Power BI dashboards and reporting for operations and program performance",
      "Statistical, predictive and decision analytics (Bachelor of Business Analytics, Deakin)",
    ],
  },
  {
    title: "Business Analysis",
    promise: "Requirements, process design and documentation a development team can build from.",
    deliverables: [
      "BRDs, SRS documents and UAT reports across six enterprise projects",
      "420+ user stories and test cases written; 320+ stakeholders engaged across two roles",
      "BPMN 2.0 process maps and 160+ clickable prototypes used to settle design decisions early",
    ],
  },
  {
    title: "Process & Automation",
    promise: "Remove the manual steps that cause errors and slow teams down.",
    deliverables: [
      "20% faster approval processing and 15% better resource allocation at CDIP through workflow redesign",
      "Power Automate and mail merge replacing manual correspondence and certificate generation",
      "Access, Excel and SharePoint workflow automation for approvals and reporting",
    ],
  },
  {
    title: "Project Delivery",
    promise: "Agile delivery with the governance and reporting to match.",
    deliverables: [
      "Scrum delivery with a 12-member team at SELISE across sprint planning and retrospectives",
      "ERP, CRM and HRM rollouts for a CHF 10B security group and a CHF 12B rail technology leader",
      "Agendas, minutes, briefings and committee papers for sponsors and steering groups",
    ],
  },
  {
    title: "AI & Reporting",
    promise: "Applied AI and reporting — RAG pipelines, LLM tooling and the analysis behind them.",
    deliverables: [
      "RAG pipeline and LLM application work — my current development focus",
      "NLP, data mining and machine-learning coursework applied to real datasets",
      "Automated analysis that turns uploaded data into charts and a written summary (HealthWhisper)",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    institution: "The University of Western Australia",
    degree: "Master of Information Technology — Applied Computing",
    period: "2024 – 2026 · Completed July 2026",
    logo: "/uwa.png",
    points: [
      "Object-oriented programming · Agile web development · Computational data analysis",
      "Data warehousing · Business intelligence · Natural language processing",
      "Software requirements & design · Cybersecurity · Cloud computing",
      "IT Capstone Project — Distinction (75)",
    ],
  },
  {
    institution: "Deakin University",
    degree: "Bachelor of Business Analytics",
    period: "2019 – 2022 · Conferred October 2022",
    logo: "/deakin.png",
    points: [
      "Deakin International Merit Scholarship",
      "Data mining & machine learning · Business intelligence & data warehousing",
      "Statistics & quantitative analysis · Predictive & decision analytics",
      "Supply-chain, marketing & financial analytics · AI for business",
    ],
  },
];

export const certifications: Certification[] = [
  { title: "The Complete 2023 Web Development Bootcamp", issuer: "Udemy", date: "Nov 2023" },
  { title: "The Complete SQL Bootcamp: Go from Zero to Hero", issuer: "Udemy", date: "May 2023" },
  { title: "The Practical BPMN 2.0 Master Class", issuer: "Udemy", date: "Mar 2022" },
  { title: "Scrum Master Certification 2023 + Agile Scrum Certification", issuer: "Udemy", date: "Dec 2021" },
  { title: "Agile Leadership and Resilient Teams", issuer: "Udemy", date: "Jan 2021" },
  { title: "Detailed Guide to Building Wireframes Using Balsamiq Mockups", issuer: "Udemy", date: "Jan 2021" },
  { title: "UX Strategy Fundamentals", issuer: "Udemy", date: "Jan 2021" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Deep Roy Moulick",
    role: "AGM (IT) · Chief Technology Officer",
    company: "CDIP",
    image: "/deep.png",
    quote: [
      "During his time on my team, he played a pivotal role in gathering and analyzing business requirements, bridging the gap between stakeholders and technical teams. His ability to translate complex data into actionable insights significantly contributed to the success of our projects.",
      "He consistently demonstrated strong communication skills, keen attention to detail, and a proactive approach to solving business challenges. I highly recommend Mohaimen Rashid to any organization looking for a talented and driven Business Analyst.",
    ],
  },
  {
    name: "F M Nafis Rahman",
    role: "Deputy Manager IT",
    company: "CDIP",
    image: "/nafis.png",
    quote: [
      "Mohaimen is not just a skilled Business Analyst; he’s also a strong project manager who keeps everything running smoothly. He has a natural talent for bridging the gap between technical teams and business stakeholders, ensuring projects are aligned with organizational goals.",
      "What sets Mohaimen apart is his proactive attitude and ability to adapt to shifting priorities. I highly recommend him to any organization looking for someone with the right mix of analytical skills, leadership, and a results-driven mindset.",
    ],
  },
  {
    name: "Alimur Razi Rana",
    role: "Full-Stack Engineer",
    company: "Cefalo",
    image: "/alimur.png",
    quote: [
      "I worked with Mohaimen when he was a Business Analyst and I was a developer on the team. His dedication and effectiveness in bridging the gap between the development team and the client were truly impressive.",
      "He ensured we understood the business requirements clearly, translating them into actionable tasks, and seamlessly collaborated with DevOps and QA while maintaining an agile workflow.",
    ],
  },
  {
    name: "Md Ali Zawad",
    role: "Project Manager",
    company: "Axentec by Robi Axiata",
    image: "/ali.png",
    quote: [
      "Mohaimen played a crucial role in supporting an ERP project valued at more than half-a-million Euros for a Swiss security company. Despite it being his first professional role, he quickly adapted and demonstrated strong analytical skills and attention to detail.",
      "His ability to understand complex system requirements and communicate effectively with stakeholders played a significant role in keeping the project on track.",
    ],
  },
  {
    name: "Sarfaraz Khan",
    role: "Product Manager",
    company: "AMH",
    image: "/sarfaraz.png",
    quote: [
      "Mohaimen is a diligent and hard-working professional. He was meticulous in his approach to every task and would ask questions until he had full clarity of the situation. He would make a fine addition to any team he joins.",
    ],
  },
  {
    name: "Shamsul Islam Rana",
    role: "Software Engineer",
    company: "Adventure Dhaka",
    image: "/rana.png",
    quote: [
      "I worked with Mohaimen at CDIP, where he was an exceptional Business Analyst. He has a great ability to turn complex business needs into clear, actionable insights, and his collaboration with both stakeholders and technical teams made a real difference in our projects.",
    ],
  },
  {
    name: "Sheikh Rezwanul Islam",
    role: "Support Engineer · QA",
    company: "CDIP",
    image: "/sk.png",
    quote: [
      "His ability to simplify complex problems, deliver actionable insights and collaborate effectively makes him an invaluable asset to any team. A true professional.",
    ],
  },
  {
    name: "Fardin Ananta",
    role: "Robotics Engineer · Data Analyst",
    company: "Tyger Media",
    image: "/fardin.png",
    quote: [
      "Mohaimen is a smart and capable professional — detail-oriented and a perfectionist in his work. He was a valuable asset on my team.",
    ],
  },
];

export const resume = {
  file: "/Mohaimen-Rashid-Resume.pdf",
  fileName: "Mohaimen-Rashid-Resume.pdf",
};
