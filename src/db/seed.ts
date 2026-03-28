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
    email: "prince.biile@stu.ucc.edu.gh",
    phone: "0555902675",
    avatarUrl: "/images/princeimg.jpg",
    cvUrl: "/PrinceBiile_CV.pdf", // Assume this is uploaded/updated manually
    heroImageUrl: "/images/biileprince.png",
    socialLinks: JSON.stringify([
      { platform: "GitHub", url: "https://github.com/biileprince", iconName: "FaGithub" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/prince-biile-75343b244", iconName: "FaLinkedinIn" },
      { platform: "Freelance", url: "https://www.axiomcraft.dev/", iconName: "FaGlobe" },
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
      description: "Developed a comprehensive full-stack web application for UCC to digitize university catering services with role-based workflow and automated invoice generation.",
      imageUrl: "/images/Project2.jpg", // Placeholder until exact image is linked
      tags: JSON.stringify(["Web", "Full-stack", "Enterprise"]),
      techStack: JSON.stringify(["React 19", "TypeScript", "Node.js", "PostgreSQL", "Nodemailer"]),
      features: JSON.stringify([
        "Role-based workflow (Requester, Approver, Finance)",
        "Complex state machine for approvals",
        "Automated email triggers (Resend/Nodemailer)",
        "Robust invoice generation",
        "Reduced request processing time dramatically",
      ]),
      githubUrl: "https://github.com/biileprince",
      liveUrl: "#",
      featured: true,
      sortOrder: 1,
    },
    {
      title: "Local Service Finder",
      description: "Developing a comprehensive service booking platform connecting customers with verified professionals, featuring real-time interactive calendar bookings.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify(["Web", "Microservices", "Full-stack"]),
      techStack: JSON.stringify(["Next.js 16", "NestJS", "TypeScript", "Docker", "PostgreSQL"]),
      features: JSON.stringify([
        "Dual-role dashboard system",
        "Real-time interactive calendar bookings",
        "Secure JWT-based authentication",
        "Containerized backend architecture",
      ]),
      githubUrl: "https://github.com/biileprince",
      liveUrl: "#",
      featured: true,
      sortOrder: 2,
    },
    {
      title: "NextCommerse (Multi-Vendor)",
      description: "A multi-vendor e-commerce platform allowing students and independent sellers to list products, manage orders, and accept secure Paystack payments.",
      imageUrl: "/images/skycommerce-project.png",
      tags: JSON.stringify(["Web", "E-commerce", "Payments"]),
      techStack: JSON.stringify(["Next.js 16", "Prisma", "TypeScript", "Paystack"]),
      features: JSON.stringify([
        "Multi-vendor listing and order management",
        "Secure Paystack payment integration",
        "Complete buyer checkout flow with retries",
        "Automatic guest-to-authenticated cart merging",
      ]),
      githubUrl: "https://github.com/biileprince",
      liveUrl: "#",
      featured: true,
      sortOrder: 3,
    },
    {
      title: "Employ.me",
      description: "Job marketplace connecting employers with job seekers in Ghana, featuring real-time messaging and content moderation.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify(["Web", "Marketplace", "Real-time"]),
      techStack: JSON.stringify(["React", "Node.js", "Socket.IO", "MongoDB"]),
      features: JSON.stringify([
        "3-tier user system with dedicated dashboards",
        "Job application status tracking",
        "Real-time candidate messaging via Socket.IO",
        "Strict two-tier content moderation system",
      ]),
      githubUrl: "https://github.com/biileprince",
      liveUrl: "#",
      featured: false,
      sortOrder: 4,
    },
    {
      title: "FarmLink (PWA Prototype)",
      description: "Progressive web app connecting farmers directly with commercial buyers, featuring serverless APIs and custom dashboards.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify(["PWA", "Agriculture", "Web"]),
      techStack: JSON.stringify(["Next.js 14", "TypeScript", "Drizzle ORM", "SQLite"]),
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
      description: "Developed secure RESTful APIs and interactive Swagger documentation for the official CITSA mobile app, deployed on Render.",
      imageUrl: "/images/Project2.jpg",
      tags: JSON.stringify(["Backend", "API", "Mobile"]),
      techStack: JSON.stringify(["Node.js", "Express.js", "MongoDB", "Swagger"]),
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
  ]);

  // ─── Skills ──────────────────────────────────────────────────────────────
  const skillData = [
    { category: "Frontend", name: "React.js / Next.js", level: 90, sortOrder: 1 },
    { category: "Frontend", name: "TypeScript / JavaScript", level: 85, sortOrder: 2 },
    { category: "Frontend", name: "Tailwind CSS / Bootstrap", level: 95, sortOrder: 3 },
    { category: "Frontend", name: "Redux", level: 80, sortOrder: 4 },
    
    { category: "Backend", name: "Node.js / Express.js", level: 90, sortOrder: 1 },
    { category: "Backend", name: "NestJS", level: 85, sortOrder: 2 },
    { category: "Backend", name: "PHP / Laravel", level: 75, sortOrder: 3 },
    { category: "Backend", name: "Socket.IO / WebSockets", level: 80, sortOrder: 4 },
    
    { category: "Databases", name: "PostgreSQL / MySQL", level: 85, sortOrder: 1 },
    { category: "Databases", name: "MongoDB", level: 85, sortOrder: 2 },
    { category: "Databases", name: "Prisma ORM", level: 90, sortOrder: 3 },
    { category: "Databases", name: "SQL", level: 85, sortOrder: 4 },
    
    { category: "Cloud & DevOps", name: "AWS (EC2, S3, Lambda)", level: 80, sortOrder: 1 },
    { category: "Cloud & DevOps", name: "Docker / Kubernetes", level: 75, sortOrder: 2 },
    { category: "Cloud & DevOps", name: "Vercel / Render", level: 90, sortOrder: 3 },
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
        "UNIX Programming, Database Management, Object-Oriented Programming"
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
      description: "For achieving First Class academic standing at the University of Cape Coast.",
      iconName: "FaAward",
      sortOrder: 4,
    },
    {
      year: "2025",
      title: "Citation of Honour",
      description: "Recognized for exceptional leadership as Backend Co-Lead at AmaliTech Coding Club.",
      iconName: "FaAward",
      sortOrder: 5,
    },
    {
      year: "2021",
      title: "Walewale SHS Honours",
      description: "Certificate of Honor as Health Prefect, Instrumentalist, and MC.",
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
      quote: "Prince delivered exactly what we needed. The API is robust and the application scaled beautifully on AWS.",
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
      description: "Building production-grade web applications with modern frameworks (Next.js, NestJS) and scalable architectures.",
      iconName: "FaLaptopCode",
      path: "/expertise/web-development",
      sortOrder: 1,
    },
    {
      title: "Cloud Computing & DevOps",
      description: "Deploying and managing scalable applications in cloud environments using AWS, Docker, and Kubernetes.",
      iconName: "FaCloud",
      path: "/expertise/cloud-computing",
      sortOrder: 2,
    },
    {
      title: "Backend Architecture",
      description: "Designing RESTful APIs and microservices with Node.js, Express, and modern ORMs.",
      iconName: "FaServer",
      path: "/expertise/database-management",
      sortOrder: 3,
    },
  ]);

  // Expertise Content (keep generic placeholders or clear them for brevity, 
  // I will just add one detail page as an example so the schema succeeds)
  await db.insert(expertiseContent).values([
    {
      slug: "web-development",
      title: "Full Stack Web Development",
      subtitle: "Modern frameworks and robust architectures",
      description: "I specialize in building complete solutions from interactive frontends to scalable backend services.",
      items: JSON.stringify([]),
      sortOrder: 1,
    }
  ]);

  console.log("✅ Database seeded successfully with new CV data!");
}

seed()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
