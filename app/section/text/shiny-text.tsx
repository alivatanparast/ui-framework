"use client";

import { motion } from "framer-motion";
import React from "react";
import {RevealLinks} from "../effect/reveal-links";
import ResetWrapper from "../../components/ResetWrapper";

interface ShinyTextProps {
  text: string;
  color?: string;       // base text color
  shineColor?: string;  // shine highlight color
  disabled?: boolean;   // stops animation
  speed?: number;       // animation duration in seconds
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
                                               text,
                                               color = "rgba(181, 181, 181, 0.65)", // default base gray
                                               shineColor = "rgba(255, 255, 255, 0.8)", // default white shine
                                               disabled = false,
                                               speed = 5,
                                               className = "",
                                             }) => {
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 40%, ${shineColor} 50%, ${color} 60%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
      animate={
        disabled
          ? {}
          : { backgroundPosition: ["200% 0", "-200% 0"] }
      }
      transition={
        disabled
          ? {}
          : { duration: speed, repeat: Infinity, ease: "linear" }
      }
    >
      {text}
    </motion.span>
  );
};

export default function Demo() {
  return (
    <>
      <ResetWrapper>
        <ShinyText
          text="Gold Shine!"
          // color="#b59c2a"
          // shineColor="#f0f"
          speed={5}
          className="text-6xl font-bold"
        />
      </ResetWrapper>

    </>
  );
};
