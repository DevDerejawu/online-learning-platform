"use client";
import FramerMotionClientWraper from "./framerMotionClientWraper";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import DesctopNavLinks from "../serverComponents/desctopNavLinks";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navlinks = [
    {
      href: "#about",
      text: "About",
    },
    {
      href: "#courses",
      text: "Courses",
    },
    {
      href: "#contact",
      text: "Contact",
    },
  ];
  return (
    <>
      <FramerMotionClientWraper
        initialX={-200}
        initialY={null}
        className="sticky top-0 z-50 flex items-center justify-between w-full h-18 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        tag="nav"
      >
        <DesctopNavLinks />
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden active:scale-90 transition"
        >
          <MenuIcon className="size-6.5" />
        </button>
      </FramerMotionClientWraper>

      <div
        className={`fixed inset-0 pt-4 z-[100] backdrop-blur flex flex-col items-center justify-start text-lg gap-8 lg:hidden transition-transform duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {navlinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onNavigate={() => setIsMenuOpen(false)}
          >
            {link.text}
          </Link>
        ))}
        <button
          onClick={() => setIsMenuOpen(false)}
          className=" absolute top-4 right-4 active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
        >
          <XIcon />
        </button>
        <div className="md:hidden space-x-3">
          <Link
            href="/login"
            className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md active:scale-95"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
