import type { Metadata } from "next";
import Image from "next/image";
import { FaPhoneAlt, FaRegEnvelope, FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import { getProfile } from "@/lib/queries/profile";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Prince Yennuyar Biile for project inquiries, collaborations, or tech discussions.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-400 mb-3">
            Get in Touch
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-surface-50">
            Let&apos;s Build Something Great
          </h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="glass rounded-xl p-8">
            <div className="flex flex-col gap-6">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src="/images/contactImg.jpg"
                  alt="Contact"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-surface-100">
                  {profile?.name || "Prince Yennuyar Biile"}
                </h3>
                <p className="text-surface-400">
                  {profile?.title || "Full Stack Developer & IT Student"}
                </p>
                <p className="text-surface-400 text-sm leading-relaxed">
                  Let&apos;s collaborate on innovative tech solutions! Reach out for opportunities, projects, or tech discussions.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3 text-surface-400">
                    <FaPhoneAlt className="text-brand-400 shrink-0" />
                    <span className="text-sm">{profile?.phone || "+233 555 902 675"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-surface-400">
                    <FaRegEnvelope className="text-brand-400 shrink-0" />
                    <span className="text-sm break-all">
                      {profile?.email || "biileprinceyennuyar5@gmail.com"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-700/30">
                  <h4 className="text-xs uppercase tracking-wider text-surface-400 mb-3 font-medium">
                    Connect with me
                  </h4>
                  <div className="flex gap-3">
                    {[
                      { icon: FaLinkedinIn, link: "https://www.linkedin.com/in/prince-biile-75343b244" },
                      { icon: FaFacebookF, link: "https://web.facebook.com/prince.biile/" },
                      { icon: FaTwitter, link: "https://x.com/BiilePrince" },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-surface-700/50 border border-surface-600/30 text-surface-300 hover:text-white hover:border-brand-500/30 transition-all"
                      >
                        <social.icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
