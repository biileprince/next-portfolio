import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prince Yennuyar Biile — Full Stack Developer",
    template: "%s | Prince Biile",
  },
  description:
    "BSc IT student at University of Cape Coast. Full-stack developer specializing in React, Next.js, Node.js, and AWS cloud computing. Building intuitive, data-driven web applications.",
  keywords: [
    "Prince Biile", "Full Stack Developer", "React", "Next.js",
    "Node.js", "AWS", "Cloud Computing", "Web Developer Ghana",
  ],
  authors: [{ name: "Prince Yennuyar Biile" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Prince Yennuyar Biile — Full Stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and AWS cloud computing.",
    siteName: "Prince Biile Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Yennuyar Biile — Full Stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and AWS cloud computing.",
    creator: "@BiilePrince",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col noise-bg antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
