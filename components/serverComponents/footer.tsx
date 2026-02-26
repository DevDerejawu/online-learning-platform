import Link from "next/link";
import FramerMotionClientWraper from "../clientComponents/framerMotionClientWraper";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-400 mt-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        <FramerMotionClientWraper
          initialX={-250}
          initialY={null}
          tag="div"
          className="sm:col-span-2 lg:col-span-1"
        >
          <Link href="/" className="text-2xl md:text-3xl hover:text-orange-400">
            LearningHub
          </Link>
          <p className="text-sm/7 mt-6">
            Online learning platform for self tuaght developers with structured
            courses of videos, projects, dotes.
          </p>
        </FramerMotionClientWraper>

        <div className="flex flex-col lg:items-center lg:justify-center">
          <FramerMotionClientWraper
            initialX={null}
            initialY={-250}
            tag="div"
            className="flex flex-col text-sm space-y-2.5"
          >
            <h2 className="font-semibold mb-5 text-white text-2xl mb-4">
              Quick links
            </h2>
            <a className="hover:text-slate-500 transition" href="#about">
              About us
            </a>
            <a className="hover:text-slate-500 transition" href="#contact">
              Contact us
            </a>
            <a href="#courses" className="hover:text-slate-500 transition">
              Our Courses
            </a>
          </FramerMotionClientWraper>
        </div>

        <FramerMotionClientWraper
          initialX={-350}
          initialY={null}
          tag="div"
          className=""
        >
          <h2 className="font-semibold text-white mb-5">
            Subscribe to our newsletter
          </h2>
          <div className="text-sm space-y-6 max-w-sm">
            <p>
              The latest videos, notes, projects and more sent to your inbox
              weekly.
            </p>
            <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-slate-900" >
              <input
                className="outline-none w-full max-w-64 py-2 rounded px-2"
                type="email"
                placeholder="Enter your email"
                disabled={true}
              />
              <button className="bg-indigo-600 px-4 disabled:cursor-not-allowed py-2 text-white rounded" disabled={true}>
                Subscribe
              </button>
            </div>
          </div>
        </FramerMotionClientWraper>
      </div>
      <div></div>
    </footer>
  );
}
