"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { getIcon } from "@/lib/icons";
import { staggerContainer, staggerItem, hoverLift } from "@/lib/motion";

interface ExpertiseItem {
  title: string;
  description: string;
  iconName: string;
  technologies: { name: string; iconName: string }[];
}

interface ExpertiseClientProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    items: ExpertiseItem[];
  };
}

export function ExpertiseClient({ data }: ExpertiseClientProps) {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={data.title} subtitle={data.subtitle} />

        {data.description && (
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 -mt-6">
            {data.description}
          </p>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {data.items.map((item, idx) => {
            const Icon = getIcon(item.iconName);
            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                whileHover={hoverLift}
                className="glass rounded-xl p-6 flex flex-col h-full hover:border-brand-500/30 hover:shadow-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4">
                  <Icon className="text-2xl text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {item.technologies?.map((tech) => {
                    const TechIcon = getIcon(tech.iconName);
                    return (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-brand-500/5 text-brand-400 border border-brand-500/10"
                      >
                        <TechIcon className="text-xs" />
                        {tech.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
