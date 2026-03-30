// ─── Domain Types ────────────────────────────────────────────────────────────

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  avatarUrl: string;
  cvUrl: string;
  heroImageUrl: string;
  socialLinks: SocialLink[];
  typewriterWords: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  tags: string[];
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  sortOrder: number;
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  level: number;
  sortOrder: number;
}

export interface SkillsByCategory {
  [category: string]: Skill[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
  projectTitle: string;
  projectPlatform: string;
  sortOrder: number;
}

export interface Experience {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  details: string[];
  iconName: string;
  result: string;
  sortOrder: number;
}

export interface Education {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  details: string[];
  iconName: string;
  result: string;
  sortOrder: number;
}

export interface Achievement {
  id: number;
  year: string;
  title: string;
  description: string;
  iconName: string;
  sortOrder: number;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  iconName: string;
  path: string;
  sortOrder: number;
}

export interface ExpertiseContent {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  items: ExpertiseItem[];
  sortOrder: number;
}

export interface ExpertiseItem {
  title: string;
  description: string;
  iconName: string;
  technologies: ExpertiseTech[];
}

export interface ExpertiseTech {
  name: string;
  iconName: string;
}

// ─── Contact Form ────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NavItem {
  title: string;
  path: string;
  iconName: string;
}
