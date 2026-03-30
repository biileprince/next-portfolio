import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ─── Profile ─────────────────────────────────────────────────────────────────

export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  avatarUrl: text("avatar_url").notNull().default(""),
  cvUrl: text("cv_url").notNull().default(""),
  heroImageUrl: text("hero_image_url").notNull().default(""),
  socialLinks: text("social_links", { mode: "json" }).notNull().default("[]"),
  typewriterWords: text("typewriter_words", { mode: "json" })
    .notNull()
    .default("[]"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  galleryImages: text("gallery_images", { mode: "json" }).notNull().default("[]"),
  tags: text("tags", { mode: "json" }).notNull().default("[]"),
  techStack: text("tech_stack", { mode: "json" }).notNull().default("[]"),
  features: text("features", { mode: "json" }).notNull().default("[]"),
  githubUrl: text("github_url").notNull().default(""),
  liveUrl: text("live_url").notNull().default(""),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull(),
  name: text("name").notNull(),
  level: integer("level").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Testimonials ────────────────────────────────────────────────────────────

export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  quote: text("quote").notNull(),
  projectTitle: text("project_title").notNull().default(""),
  projectPlatform: text("project_platform").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Experience ──────────────────────────────────────────────────────────────

export const experience = sqliteTable("experience", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  period: text("period").notNull(),
  details: text("details", { mode: "json" }).notNull().default("[]"),
  iconName: text("icon_name").notNull().default("FaFileAlt"),
  result: text("result").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Education ───────────────────────────────────────────────────────────────

export const education = sqliteTable("education", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  period: text("period").notNull(),
  details: text("details", { mode: "json" }).notNull().default("[]"),
  iconName: text("icon_name").notNull().default("FaGraduationCap"),
  result: text("result").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Achievements ────────────────────────────────────────────────────────────

export const achievements = sqliteTable("achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull().default("FaAward"),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Features (Expertise areas shown on homepage) ────────────────────────────

export const features = sqliteTable("features", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
  path: text("path").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Expertise Content (Rich detail pages) ───────────────────────────────────

export const expertiseContent = sqliteTable("expertise_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull().default(""),
  items: text("items", { mode: "json" }).notNull().default("[]"),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Messages (Contact Form) ─────────────────────────────────────────────────

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
