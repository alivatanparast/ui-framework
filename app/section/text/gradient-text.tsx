"use client";

import {motion} from "framer-motion";
import React, {ReactNode} from "react";
import {AuroraText} from "./aurora-text";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];       // gradient colors
  animationSpeed?: number; // duration in seconds
  showBorder?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
                                                            children,
                                                            className = "",
                                                            colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
                                                            animationSpeed = 8,
                                                            showBorder = false,
                                                          }) => {
  // Gradient string for inline style
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
    >
      {showBorder && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: animationSpeed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="absolute inset-0 rounded-[1.25rem] z-[-1] bg-black"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="inline-block relative z-10"
        style={gradientStyle}
        animate={
          showBorder
            ? {} // already animating border gradient
            : {backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]}
        }
        transition={
          showBorder
            ? {}
            : {duration: animationSpeed, repeat: Infinity, ease: "linear"}
        }
      >
        {children}
      </motion.div>
    </div>
  );
};


export default function Demo() {
  return (
    <GradientText
      colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
      animationSpeed={10}
      showBorder={false}
      className="text-6xl font-bold"
    >
      Add a splash of color!
    </GradientText>
  );
};
