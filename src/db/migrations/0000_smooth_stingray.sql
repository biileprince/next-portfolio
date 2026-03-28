CREATE TABLE `achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon_name` text DEFAULT 'FaAward' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `education` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`period` text NOT NULL,
	`details` text DEFAULT '[]' NOT NULL,
	`icon_name` text DEFAULT 'FaGraduationCap' NOT NULL,
	`result` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `experience` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`period` text NOT NULL,
	`details` text DEFAULT '[]' NOT NULL,
	`icon_name` text DEFAULT 'FaFileAlt' NOT NULL,
	`result` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `expertise_content` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`items` text DEFAULT '[]' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `expertise_content_slug_unique` ON `expertise_content` (`slug`);--> statement-breakpoint
CREATE TABLE `features` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon_name` text NOT NULL,
	`path` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`bio` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`avatar_url` text DEFAULT '' NOT NULL,
	`cv_url` text DEFAULT '' NOT NULL,
	`hero_image_url` text DEFAULT '' NOT NULL,
	`social_links` text DEFAULT '[]' NOT NULL,
	`typewriter_words` text DEFAULT '[]' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`tech_stack` text DEFAULT '[]' NOT NULL,
	`features` text DEFAULT '[]' NOT NULL,
	`github_url` text DEFAULT '' NOT NULL,
	`live_url` text DEFAULT '' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`name` text NOT NULL,
	`level` integer DEFAULT 0 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`quote` text NOT NULL,
	`project_title` text DEFAULT '' NOT NULL,
	`project_platform` text DEFAULT '' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
