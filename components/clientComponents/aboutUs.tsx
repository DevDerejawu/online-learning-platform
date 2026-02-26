"use client";

import { motion, Variants } from "framer-motion";

const fadeUp:Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

type fadeUpType ={
  hidden: {opacity:number, y:number},
  visible: ()=>void
}

const AboutUs = () => {
  return (
    <section className="w-full bg-slate-950 py-20 px-6" id="about">
      <div className="mx-auto max-w-5xl text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6 text-3xl font-bold text-white md:text-5xl"
        >
          About Us
        </motion.h2>

        {/* Paragraph 1 */}
        <motion.p
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-6 max-w-3xl text-lg text-slate-300 md:text-xl"
        >
          We are a remote-first, worldwide online learning platform built for
          self-taught developers who want a clear and structured path into
          full-stack development.
        </motion.p>

        {/* Paragraph 2 */}
        <motion.p
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-6 max-w-3xl text-lg text-slate-400"
        >
          Our curriculum is carefully designed to guide learners from the very
          basics to advanced full-stack concepts — step by step, start to
          finish — without confusion or unnecessary complexity.
        </motion.p>

        {/* Paragraph 3 */}
        <motion.p
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-3xl text-lg text-slate-400"
        >
          The platform is completely free and accessible to anyone, anywhere.
          We believe high-quality education should not be limited by location
          or financial barriers.
        </motion.p>

        {/* Mission Card */}
        <motion.div
          variants={fadeUp}
          custom={0.4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <h3 className="mb-3 text-xl font-semibold text-white">
            Our Mission
          </h3>
          <p className="text-slate-300">
            Our mission is to help motivated developers by providing a clear,
            practical, and structured learning experience that enables them to
            build real-world skills and confidently grow into full-stack
            developers.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
