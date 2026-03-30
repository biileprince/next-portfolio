import Link from "next/link";
import { FaCode, FaGithub, FaLinkedin, FaTwitter, FaRegEnvelope } from "react-icons/fa";

const footerNavItems = [
  { title: "Home", path: "/" },
  { title: "Projects", path: "/projects" },
  { title: "Resume", path: "/resume" },
  { title: "Skills", path: "/skills" },
  { title: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: FaGithub, link: "https://github.com/biileprince", label: "GitHub" },
  { icon: FaLinkedin, link: "https://www.linkedin.com/in/prince-biile-75343b244", label: "LinkedIn" },
  { icon: FaTwitter, link: "https://x.com/BiilePrince", label: "Twitter" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-lg pb-20 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <FaCode className="text-brand-400" />
              Prince Y. Biile
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Full-stack developer specializing in modern web technologies and
              cloud solutions. Turning ideas into functional digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <nav className="space-y-2.5" aria-label="Footer navigation">
              {footerNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:biileprinceyennuyar5@gmail.com"
                className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors text-sm group"
              >
                <FaRegEnvelope className="text-brand-400 group-hover:text-brand-300" />
                biileprinceyennuyar5@gmail.com
              </a>
              <div className="flex gap-3 mt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-brand-500/30 hover:shadow-glow transition-all duration-200"
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Prince Yennuyar Biile. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
