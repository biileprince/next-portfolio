import { db } from "./index";
import {
  profile,
  projects,
  skills,
  testimonials,
  experience,
  education,
  achievements,
  features,
  expertiseContent,
  messages,
} from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // ─── Clear tables ────────────────────────────────────────────────────────
  await db.delete(profile);
  await db.delete(projects);
  await db.delete(skills);
  await db.delete(testimonials);
  await db.delete(experience);
  await db.delete(education);
  await db.delete(achievements);
  await db.delete(features);
  await db.delete(expertiseContent);
  await db.delete(messages);

  // ─── Profile ─────────────────────────────────────────────────────────────
  await db.insert(profile).values({
    name: "Prince Yennuyar Biile",
    title: "BSc. IT Student & AWS Certified Cloud Practitioner",
    bio: "Dedicated BSc. Information Technology student (Final Year) and AWS Certified Cloud Practitioner with expertise in full-stack development, microservices, and cloud technologies. Hands-on experience building web applications using modern frameworks (React, Next.js, Node.js, NestJS) and strict TypeScript environments. Combines strong backend programming skills with demonstrated leadership abilities to build innovative, cloud-driven software solutions.",
    email: "biileprinceyennuyar5@gmail.com",
    phone: "0555902675",
    avatarUrl: "/images/princeimg.jpg",
    cvUrl: "/PrinceBiile_CV.pdf", // Assume this is uploaded/updated manually
    heroImageUrl: "/images/biileprince.jpg",
    socialLinks: JSON.stringify([
      {
        platform: "GitHub",
        url: "https://github.com/biileprince",
        iconName: "FaGithub",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/prince-biile-75343b244",
        iconName: "FaLinkedinIn",
      },
      {
        platform: "Freelance",
        url: "https://www.axiomcraft.dev/",
        iconName: "FaGlobe",
      },
    ]),
    typewriterWords: JSON.stringify([
      "BSc. IT Student",
      "Full Stack Developer",
      "AWS Certified Cloud Practitioner",
      "Backend Engineer",
      "Freelance Developer",
    ]),
  });

  // ─── Projects ────────────────────────────────────────────────────────────
  await db.insert(projects).values([
    {
      title: "Sasakawa Restaurant Service Request System",
      description:
        "A comprehensive web application for UCC Sasakawa Campus that streamlines catering requests, approvals, invoicing, and financial tracking with role-based workflow automation. Completed July 2025.",
      imageUrl: "/images/Project2.jpg", // Placeholder until exact image is linked
      tags: JSON.stringify([
        "Web App",
        "Enterprise Software",
        "Finance Management",
      ]),
      techStack: JSON.stringify([
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "React Query",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma ORM",
        "Clerk Auth",
        "Cloudinary",
        "Nodemailer",
        "Resend",
        "Vercel",
      ]),
      features: JSON.stringify([
        "Three-role workflow for Requesters, Approvers, and Finance officers",
        "Digital request lifecycle from submission to invoicing and payment tracking",
        "Automated notifications and status updates with resilient email delivery",
        "Invoice generation, payment recording, and finance reporting support",
        "Audit-friendly process visibility replacing manual paper workflows",
      ]),
      githubUrl: "#",
      liveUrl: "https://sasakawa.netlify.app/",
      featured: true,
      sortOrder: 1,
    },
    {
      title: "Local Service Finder - Professional Service Booking Platform",
      description:
        "A full-stack booking platform connecting customers with verified local service professionals, featuring real-time availability, secure authentication, and complete booking management. Completed January 2026.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify([
        "Web App",
        "Featured",
        "Client: Personal Project / Portfolio",
      ]),
      techStack: JSON.stringify([
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma ORM",
        "Node.js",
        "JWT Authentication",
        "Vercel",
        "Neon Database",
      ]),
      features: JSON.stringify([
        "Smart search and filtering by category, rating, price, and availability",
        "Dual-role customer and provider dashboards with booking workflows",
        "Real-time booking calendar with instant confirmation",
        "Reviewed provider profiles and verified feedback system",
        "Production deployment improvements for SSR and Prisma 7 migration",
      ]),
      githubUrl: "#",
      liveUrl: "https://local-service-finder-blond.vercel.app/",
      featured: true,
      sortOrder: 2,
    },
    {
      title: "NextCommerse - Campus-First Commerce Platform",
      description:
        "A campus-first e-commerce platform for student entrepreneurs, small businesses, and local communities to buy and sell with secure payments, smooth checkout, and order tracking. Completed March 2026.",
      imageUrl: "/images/skycommerce-project.png",
      tags: JSON.stringify(["E-commerce", "Featured"]),
      techStack: JSON.stringify([
        "React",
        "Next.js 16",
        "TypeScript",
        "Tailwind CSS",
        "Prisma ORM",
        "PostgreSQL",
        "Better Auth",
        "Paystack",
        "Vercel",
        "Docker",
      ]),
      features: JSON.stringify([
        "Product discovery, cart, and end-to-end checkout flow",
        "Secure Paystack integration with robust payment retries",
        "Guest cart continuity with automatic merge after login",
        "Order history and detailed order tracking",
        "Image snapshot strategy for reliable historical order visuals",
        "Admin-ready operations structure for scaling marketplace workflows",
      ]),
      githubUrl: "https://github.com/biileprince/next-commerce",
      liveUrl: "https://next-commerce-gh.vercel.app/",
      featured: true,
      sortOrder: 3,
    },
    {
      title: "Employ.me - Job Listing Platform for Ghana",
      description:
        "A full-stack job marketplace connecting employers and job seekers in Ghana with real-time messaging, role-based dashboards, and a two-tier moderation workflow. Completed January 2026.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify(["Web App"]),
      techStack: JSON.stringify([
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "Node.js",
        "Express",
        "Socket.IO",
        "PostgreSQL",
        "Prisma ORM",
        "JWT",
        "Cloudinary",
        "Nodemailer",
      ]),
      features: JSON.stringify([
        "Three-role architecture for Job Seekers, Employers, and Admins",
        "Real-time Socket.IO messaging with duplicate-message prevention",
        "Advanced job discovery and application status tracking pipeline",
        "Two-tier moderation: employer verification plus job approval",
        "Role-safe JWT auth and profile-linked Prisma data model",
      ]),
      githubUrl: "#",
      liveUrl: "https://employmegh.netlify.app/",
      featured: false,
      sortOrder: 4,
    },
    {
      title: "FarmLink (PWA Prototype)",
      description:
        "Progressive web app connecting farmers directly with commercial buyers, featuring serverless APIs and custom dashboards.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify(["PWA", "Agriculture", "Web"]),
      techStack: JSON.stringify([
        "Next.js 14",
        "TypeScript",
        "Drizzle ORM",
        "SQLite",
      ]),
      features: JSON.stringify([
        "Secure serverless API routes",
        "Simulated digital payment integrations",
        "Role-based dashboards for produce discovery",
        "Inventory management",
      ]),
      githubUrl: "https://github.com/biileprince",
      liveUrl: "#",
      featured: false,
      sortOrder: 5,
    },
    {
      title: "CITSA Mobile App Backend",
      description:
        "Developed secure RESTful APIs and interactive Swagger documentation for the official CITSA mobile app, deployed on Render.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify(["Backend", "API", "Mobile"]),
      techStack: JSON.stringify([
        "Node.js",
        "Express.js",
        "MongoDB",
        "Swagger",
      ]),
      features: JSON.stringify([
        "Secure RESTful APIs",
        "Interactive Swagger documentation",
        "Deployed on Render",
      ]),
      githubUrl: "https://github.com/biileprince",
      liveUrl: "#",
      featured: false,
      sortOrder: 6,
    },
    {
      title: "Modern Food Delivery Platform",
      description:
        "A full-featured food ordering web application with restaurant-style browsing experience and seamless order management.",
      imageUrl: "/images/food-delivery-project.png",
      tags: JSON.stringify(["Web", "E-commerce", "Frontend"]),
      techStack: JSON.stringify([
        "React.js",
        "Context API",
        "React Router",
        "CSS3",
        "Responsive Design",
        "Local Storage",
      ]),
      features: JSON.stringify([
        "Dynamic food menu browsing with category filters",
        "Real-time cart management with quantity controls",
        "Mobile-first responsive interface",
        "Order summary and checkout system",
        "Interactive restaurant-style menu display",
        "Promo code integration",
      ]),
      githubUrl: "https://github.com/biileprince/Food-Delivery-App",
      liveUrl: "https://foodie-deliveryapp.netlify.app/",
      featured: false,
      sortOrder: 7,
    },
    {
      title: "SkyCommerce - Modern E-commerce Platform",
      description:
        "A responsive e-commerce platform featuring sky-themed aesthetics, product browsing, cart management, and a seamless checkout experience.",
      imageUrl: "/images/skycommerce-project.png",
      tags: JSON.stringify(["Web", "E-commerce", "Full-stack", "Responsive"]),
      techStack: JSON.stringify([
        "React.js",
        "Tailwind CSS",
        "Context API",
        "React Router",
        "Vite",
        "Responsive Design",
      ]),
      features: JSON.stringify([
        "Sky-themed UI with modern gradients and animations",
        "Product browsing with category and subcategory filters",
        "Interactive cart management with real-time updates",
        "Multi-step checkout with payment options",
        "Order tracking and history",
      ]),
      githubUrl: "https://github.com/biileprince/SkyCommerce",
      liveUrl: "https://skye-commerce.netlify.app/",
      featured: true,
      sortOrder: 8,
    },
    {
      title: "ReferX - Referral Tracking and Rewards Platform",
      description:
        "A referral management system for creating referral programs, tracking conversions, earning points, and redeeming rewards with fraud detection.",
      imageUrl: "/images/referx-project.png",
      tags: JSON.stringify([
        "Web",
        "Referral System",
        "Full-stack",
        "Responsive",
        "Authentication",
      ]),
      techStack: JSON.stringify([
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Authentication",
        "OAuth 2.0",
      ]),
      features: JSON.stringify([
        "Secure authentication with email verification",
        "Referral program creation with custom codes",
        "Real-time points tracking and reward redemption",
        "Leaderboard and referral analytics",
        "IP-based fraud detection and multi-device insights",
      ]),
      githubUrl: "https://github.com/biileprince/ReferX",
      liveUrl: "https://referx.onrender.com/rewards",
      featured: true,
      sortOrder: 9,
    },
    {
      title: "Portfolio Website (Legacy Gatsby)",
      description:
        "Legacy developer portfolio website with blog integration and contact form built on Gatsby.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify(["Web", "Frontend"]),
      techStack: JSON.stringify(["Gatsby", "GraphQL", "Styled Components"]),
      features: JSON.stringify([
        "Responsive design",
        "Blog integration",
        "Contact form",
      ]),
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
      sortOrder: 10,
    },
  ]);

  // ─── Skills ──────────────────────────────────────────────────────────────
  const skillData = [
    {
      category: "Frontend",
      name: "React.js / Next.js",
      level: 90,
      sortOrder: 1,
    },
    {
      category: "Frontend",
      name: "TypeScript / JavaScript",
      level: 85,
      sortOrder: 2,
    },
    {
      category: "Frontend",
      name: "Tailwind CSS / Bootstrap",
      level: 95,
      sortOrder: 3,
    },
    { category: "Frontend", name: "Redux", level: 80, sortOrder: 4 },

    {
      category: "Backend",
      name: "Node.js / Express.js",
      level: 90,
      sortOrder: 1,
    },
    { category: "Backend", name: "NestJS", level: 85, sortOrder: 2 },
    { category: "Backend", name: "PHP / Laravel", level: 75, sortOrder: 3 },
    {
      category: "Backend",
      name: "Socket.IO / WebSockets",
      level: 80,
      sortOrder: 4,
    },

    {
      category: "Databases",
      name: "PostgreSQL / MySQL",
      level: 85,
      sortOrder: 1,
    },
    { category: "Databases", name: "MongoDB", level: 85, sortOrder: 2 },
    { category: "Databases", name: "Prisma ORM", level: 90, sortOrder: 3 },
    { category: "Databases", name: "SQL", level: 85, sortOrder: 4 },

    {
      category: "Cloud & DevOps",
      name: "AWS (EC2, S3, Lambda)",
      level: 80,
      sortOrder: 1,
    },
    {
      category: "Cloud & DevOps",
      name: "Docker / Kubernetes",
      level: 75,
      sortOrder: 2,
    },
    {
      category: "Cloud & DevOps",
      name: "Vercel / Render",
      level: 90,
      sortOrder: 3,
    },
    { category: "Cloud & DevOps", name: "Cloudinary", level: 85, sortOrder: 4 },
  ];
  await db.insert(skills).values(skillData);

  // ─── Education ───────────────────────────────────────────────────────────
  await db.insert(education).values([
    {
      title: "BSc. Information Technology",
      subtitle: "University of Cape Coast",
      period: "Oct 2022 - Sep 2026 (Expected)",
      details: JSON.stringify([
        "Academic Standing: First Class Honors Trajectory (CGPA: 3.78+)",
        "Key Coursework: Data Structures & Algorithms, Software Engineering, Mobile & Distributed Computing, Network Computing",
        "UNIX Programming, Database Management, Object-Oriented Programming",
      ]),
      iconName: "FaGraduationCap",
      result: "First Class Honors Trajectory",
      sortOrder: 1,
    },
    {
      title: "Senior Secondary Certificate (SSCE)",
      subtitle: "Walewale Senior High Technical School",
      period: "2018 – 2021",
      details: JSON.stringify([
        "Graduated with Honors in General Arts",
        "Served as the Health Prefect",
        "Event Organizer and MC for the Red Cross Society",
      ]),
      iconName: "FaGraduationCap",
      result: "Honors Graduate",
      sortOrder: 2,
    },
  ]);

  // ─── Experience ──────────────────────────────────────────────────────────
  await db.insert(experience).values([
    {
      title: "Freelance Full-Stack Developer & Founder",
      subtitle: "AxiomCraft | Cape Coast, Ghana",
      period: "Present",
      details: JSON.stringify([
        "Founded AxiomCraft (axiomcraft.dev) to build custom web applications and robust APIs for clients.",
        "Manage end-to-end software lifecycles, from UI/UX design to backend development and cloud deployment.",
      ]),
      iconName: "FaCode",
      result: "Founder",
      sortOrder: 1,
    },
    {
      title: "Club Lead & IT Chair",
      subtitle: "CITSA | Cape Coast, Ghana",
      period: "Nov 2025 - Present",
      details: JSON.stringify([
        "Club Lead - Backend Development: Designed 12-week 'Job-Ready' programming roadmap.",
        "Instruct members on building RESTful APIs with Node.js and PostgreSQL.",
        "Lead the 'University Event Scheduling' capstone project to build a conflict-detection booking system.",
        "IT Coordination Chair: Direct the development and uptime of official site (citsaucc.org)",
        "Lead the development of internal web applications to digitize student administrative services.",
      ]),
      iconName: "FaServer",
      result: "Leadership",
      sortOrder: 2,
    },
    {
      title: "Backend Team Lead",
      subtitle: "AmaliTech-UCC Coding Club (ACC)",
      period: "Apr 2025 – Dec 2025",
      details: JSON.stringify([
        "Organized backend development sessions, earning a Citation of Honour.",
        "Guided 'Team TypeTitan' in developing full-stack applications.",
        "Provided mentorship in modern database engineering and DSA.",
      ]),
      iconName: "FaUsers",
      result: "Citation of Honour",
      sortOrder: 3,
    },
    {
      title: "Software Development Intern",
      subtitle: "Management Information System (MIS), UCC",
      period: "Aug 2025 – Oct 2025",
      details: JSON.stringify([
        "Developed a comprehensive Student Portal Management System using PHP and MySQL.",
        "Built a dual-interface portal featuring secure, role-based access control for student and admin dashboards.",
      ]),
      iconName: "FaLaptopCode",
      result: "Portal Management System",
      sortOrder: 4,
    },
  ]);

  // ─── Achievements / Certifications ───────────────────────────────────────
  await db.insert(achievements).values([
    {
      year: "Mar 2026",
      title: "Kubernetes and Cloud Native Essentials (LFS250)",
      description: "The Linux Foundation",
      iconName: "FaDocker",
      sortOrder: 1,
    },
    {
      year: "Aug 2025 - 2028",
      title: "AWS Certified Cloud Practitioner",
      description: "Amazon Web Services (AWS)",
      iconName: "FaAws",
      sortOrder: 2,
    },
    {
      year: "Jul 2025",
      title: "AWS re/Start Graduate",
      description: "Amazon Web Services (AWS)",
      iconName: "FaAws",
      sortOrder: 3,
    },
    {
      year: "2023",
      title: "Dean's Award (First Class)",
      description:
        "For achieving First Class academic standing at the University of Cape Coast.",
      iconName: "FaAward",
      sortOrder: 4,
    },
    {
      year: "2025",
      title: "Citation of Honour",
      description:
        "Recognized for exceptional leadership as Backend Co-Lead at AmaliTech Coding Club.",
      iconName: "FaAward",
      sortOrder: 5,
    },
    {
      year: "2021",
      title: "Walewale SHS Honours",
      description:
        "Certificate of Honor as Health Prefect, Instrumentalist, and MC.",
      iconName: "FaAward",
      sortOrder: 6,
    },
  ]);

  // ─── Testimonials (Placeholder - keeping empty/generic for now) ─────────
  await db.insert(testimonials).values([
    {
      name: "John Doe",
      role: "Client at AxiomCraft",
      imageUrl: "/images/avatar-3.png",
      quote:
        "Prince delivered exactly what we needed. The API is robust and the application scaled beautifully on AWS.",
      projectTitle: "Custom Enterprise Portal",
      projectPlatform: "Direct Contract",
      sortOrder: 1,
    },
  ]);

  // ─── Features (Homepage expertise cards) ─────────────────────────────────
  // We keep the existing 5 generic features as they still apply to the CV (Web Dev, Analytics, SEO, Database, Cloud)
  await db.insert(features).values([
    {
      title: "Full Stack Development",
      description:
        "Building production-grade web applications with modern frameworks (Next.js, NestJS) and scalable architectures.",
      iconName: "FaLaptopCode",
      path: "/expertise/web-development",
      sortOrder: 1,
    },
    {
      title: "Cloud Computing & DevOps",
      description:
        "Deploying and managing scalable applications in cloud environments using AWS, Docker, and Kubernetes.",
      iconName: "FaCloud",
      path: "/expertise/cloud-computing",
      sortOrder: 2,
    },
    {
      title: "Backend Architecture",
      description:
        "Designing RESTful APIs and microservices with Node.js, Express, and modern ORMs.",
      iconName: "FaServer",
      path: "/expertise/database-management",
      sortOrder: 3,
    },
  ]);

  await db.insert(expertiseContent).values([
    {
      slug: "web-development",
      title: "Full Stack Web Development",
      subtitle: "Modern frameworks and robust architectures",
      description:
        "I specialize in building complete solutions from interactive frontends to scalable backend services.",
      items: JSON.stringify([
        {
          title: "Frontend Engineering",
          description:
            "Building responsive, accessible, and highly interactive user interfaces using modern React ecosystem.",
          iconName: "FaReact",
          technologies: [
            { name: "Next.js", iconName: "SiNextdotjs" },
            { name: "Tailwind CSS", iconName: "SiTailwindcss" },
            { name: "TypeScript", iconName: "SiTypescript" },
          ],
        },
        {
          title: "Backend Architecture",
          description:
            "Designing RESTful APIs and robust scalable microservices with clean code principles.",
          iconName: "FaNodeJs",
          technologies: [
            { name: "Node.js", iconName: "SiNodedotjs" },
            { name: "NestJS", iconName: "SiNestjs" },
            { name: "Express", iconName: "SiExpress" },
          ],
        },
        {
          title: "Database Design",
          description:
            "Structuring relational and NoSQL databases for optimal query performance and data integrity.",
          iconName: "FaDatabase",
          technologies: [
            { name: "PostgreSQL", iconName: "SiPostgresql" },
            { name: "MongoDB", iconName: "SiMongodb" },
            { name: "Prisma", iconName: "SiPrisma" },
          ],
        },
        {
          title: "Real-time Applications",
          description:
            "Implementing real-time bidirection communication for features like chat and live updates.",
          iconName: "FaBolt",
          technologies: [
            { name: "Socket.IO", iconName: "SiSocketdotio" },
            { name: "WebSockets", iconName: "FaNetworkWired" },
          ],
        },
      ]),
      sortOrder: 1,
    },
    {
      slug: "cloud-computing",
      title: "Cloud Computing & DevOps",
      subtitle: "Scalable Infrastructure and Automation",
      description:
        "Deploying, scaling, and managing containerized applications across reliable cloud infrastructure.",
      items: JSON.stringify([
        {
          title: "AWS Infrastructure",
          description:
            "Architecting and managing scalable compute, storage, and networking resources on AWS.",
          iconName: "FaAws",
          technologies: [
            { name: "EC2", iconName: "FaServer" },
            { name: "S3", iconName: "FaHdd" },
            { name: "Lambda", iconName: "FaCode" },
          ],
        },
        {
          title: "Containerization",
          description:
            "Packaging applications and dependencies into isolated, reproducible containers.",
          iconName: "FaDocker",
          technologies: [
            { name: "Docker", iconName: "SiDocker" },
            { name: "Docker Compose", iconName: "SiDocker" },
          ],
        },
        {
          title: "Orchestration",
          description:
            "Automating deployment, scaling, and management of containerized applications.",
          iconName: "SiKubernetes",
          technologies: [
            { name: "Kubernetes", iconName: "SiKubernetes" },
            { name: "Helm", iconName: "SiHelm" },
          ],
        },
        {
          title: "CI/CD Pipelines",
          description:
            "Automating testing, integration, and deployment workflows for rapid iteration.",
          iconName: "FaInfinity",
          technologies: [
            { name: "GitHub Actions", iconName: "SiGithubactions" },
            { name: "Vercel", iconName: "SiVercel" },
          ],
        },
      ]),
      sortOrder: 2,
    },
    {
      slug: "database-management",
      title: "Database Architecture",
      subtitle: "Robust data modeling operations",
      description:
        "I specialize in deeply analyzing data constraints to create normalized efficient tables.",
      items: JSON.stringify([
        {
          title: "Relational Modeling",
          description:
            "Crafting optimized normalized schemas for SQL databases.",
          iconName: "FaDatabase",
          technologies: [
            { name: "PostgreSQL", iconName: "SiPostgresql" },
            { name: "MySQL", iconName: "SiMysql" },
          ],
        },
        {
          title: "NoSQL Paradigms",
          description:
            "Implementing flexible document-based models for unstructured or rapidly changing schemas.",
          iconName: "SiMongodb",
          technologies: [
            { name: "MongoDB", iconName: "SiMongodb" },
            { name: "Mongoose", iconName: "SiMongoose" },
          ],
        },
        {
          title: "Modern ORMs",
          description:
            "Utilizing modern Object-Relational Mappers for type-safe and secure database interactions.",
          iconName: "FaCodeBranch",
          technologies: [
            { name: "Prisma", iconName: "SiPrisma" },
            { name: "Drizzle", iconName: "FaCodeBranch" },
          ],
        },
        {
          title: "Data Caching",
          description:
            "Accelerating application performance through strategically placed in-memory caches.",
          iconName: "FaBolt",
          technologies: [{ name: "Redis", iconName: "SiRedis" }],
        },
      ]),
      sortOrder: 3,
    },
  ]);

  console.log("✅ Database seeded successfully with new CV data!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
