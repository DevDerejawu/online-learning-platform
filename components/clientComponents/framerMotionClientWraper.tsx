"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type propMotionType = {
  children: ReactNode;
  initialX: number | null;
  initialY: number | null;
  className: string;
  tag: keyof React.JSX.IntrinsicElements;
  opacity?: number;
};

const FramerMotionClientWraper = ({
  children,
  initialX,
  initialY,
  className,
  tag,
  opacity = 0,
}: propMotionType) => {

  const initialPos = {
    x: initialX ?? 0, 
    y: initialY ?? 0,
    opacity: opacity
  };
  const animatePos = {
    x: 0,
    y: 0,
    opacity: 1
  };
  const MotionTag = (motion as any)[tag];
  return (
    <MotionTag
      initial={initialPos}
      whileInView={animatePos}
       viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default FramerMotionClientWraper;
