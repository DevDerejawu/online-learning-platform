import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Copyright from "../components/serverComponents/copyright";
import { TooltipProvider } from "@/components/ui/tooltip";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Free Online Learning Platform | HTML, CSS, JavaScript, Next.js, Supabase",

  description:
    "A free online learning platform focused on full stack web development. Learn HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, TypeScript, Next.js, Node.js, Express.js, MySQL, Supabase, Recharts, and Shadcn/UI through structured lessons, notes, exercises, and projects.",

  keywords: [
    "free online learning platform",
    "learn web development",
    "HTML CSS JavaScript tutorial",
    "Next.js learning platform",
    "Tailwind CSS course",
    "TypeScript tutorial",
    "Node.js Express.js backend",
    "MySQL database course",
    "Supabase tutorial",
    "Shadcn UI",
    "full stack developer roadmap",
  ],

  openGraph: {
    title:
      "Free Online Learning Platform | Full Stack Web Development",

    description:
      "Learn modern full stack web development for free using HTML, CSS, JavaScript, Next.js, Supabase, and industry-ready tools.",

    type: "website",
    locale: "en_US",
    siteName: "Free Online Learning Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen">
        <TooltipProvider>
          <div className="bg-slate-950 text-slate-100 w-full min-h-screen">
            {children}
            <Copyright />
          </div>
        </TooltipProvider>
       
      </body>
    </html>
  );
}