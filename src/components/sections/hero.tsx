"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import {
  FaFileDownload, FaPaperPlane, FaReact,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub,
  FaAws, FaDocker, FaNodeJs,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiNestjs,
} from "react-icons/si";
import {
  slideInLeft, slideInRight, float, hoverScaleButton, fadeUp,
} from "@/lib/motion";
import type { IconType } from "react-icons";

interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

interface HeroProps {
  name: string;
  bio: string;
  cvUrl: string;
  heroImageUrl: string;
  socialLinks: SocialLink[];
  typewriterWords: string[];
}

const socialIcons: Record<string, IconType> = {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub,
};

const skillIcons: { icon: IconType; label: string }[] = [
  { icon: FaReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: FaNodeJs, label: "Node.js" },
  { icon: SiNestjs, label: "NestJS" },
  { icon: FaAws, label: "AWS" },
  { icon: FaDocker, label: "Docker" },
  { icon: SiTailwindcss, label: "Tailwind" },
];



export function Hero({ name, bio, cvUrl, heroImageUrl, socialLinks, typewriterWords }: HeroProps) {
  const [text] = useTypewriter({
    words: typewriterWords,
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 20,
    delaySpeed: 2500,
  });

  return (
    <section id="home" className="w-full pt-24 pb-28 px-4 sm:px-8 lg:px-16 border-b border-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-10">
        {/* Left */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              Welcome to my digital realm
            </p>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="gradient-text">{name}</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-muted-foreground">
              <span className="text-foreground">{text}</span>
              <Cursor cursorStyle="|" cursorColor="#60a5fa" />
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              {bio}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <motion.a
              href={cvUrl}
              download
              whileHover={hoverScaleButton}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 focus-ring"
            >
              <FaFileDownload />
              Download CV
            </motion.a>
            <motion.div whileHover={hoverScaleButton}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 border border-brand-400/50 text-brand-400 rounded-lg font-semibold hover:border-brand-400 hover:bg-brand-500/5 transition-all focus-ring"
              >
                <FaPaperPlane />
                Get in Touch
              </Link>
            </motion.div>
          </div>



          {/* Social & Skills */}
          <div className="flex flex-col xl:flex-row gap-8 pt-4">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                Find me on
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = socialIcons[social.iconName];
                  return Icon ? (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="p-3 rounded-full glass text-muted-foreground hover:text-foreground hover:border-brand-500/30 hover:shadow-glow transition-all duration-200"
                    >
                      <Icon />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
                Top Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillIcons.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    title={label}
                    className="p-3 rounded-full glass text-muted-foreground hover:text-foreground hover:border-brand-500/30 transition-all duration-200 text-xl cursor-default"
                  >
                    <Icon />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Hero Image */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 flex justify-center items-center relative"
        >
          <div className="relative z-10">
            {/* Animated gradient ring */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-500/20 via-brand-400/10 to-transparent rounded-2xl blur-xl animate-pulse" />
            
            <motion.div
              variants={float}
              animate="animate"
            >
              <Image
                src={heroImageUrl}
                alt={`${name} — Profile`}
                width={500}
                height={680}
                className="w-[280px] h-[380px] sm:w-[350px] sm:h-[480px] lg:w-[460px] lg:h-[620px] object-contain z-10 relative"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-br from-card/30 to-background/30 backdrop-blur-[2px] rounded-2xl -z-10" />
          </div>
          <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-background to-transparent rounded-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
