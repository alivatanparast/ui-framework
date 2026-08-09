"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import classNames from "classnames";
import {AuroraText} from "../text/aurora-text";

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: any
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
  borderWidth?: number
}

export const BorderBeam = ({
                             className,
                             size = 50,
                             delay = 0,
                             duration = 6,
                             colorFrom = "#ffaa40",
                             colorTo = "#9c40ff",
                             transition,
                             style,
                             reverse = false,
                             initialOffset = 0,
                             borderWidth = 1,
                           }: BorderBeamProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent
        [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]
        [mask-composite:intersect] [mask-clip:padding-box,border-box]"
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className={classNames(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className
        )}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          ...style,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  )
}

export default function Demo() {
  return (
    <div className="relative w-96 h-96 rounded-xl border border-gray-600 overflow-hidden">
      <BorderBeam
        size={80}
        duration={10}
        colorFrom="#00f5d4"
        colorTo="#ff0f7b"
        borderWidth={3}
      />
      <div className="flex h-full items-center justify-center text-white">
        Animated Border ✨
      </div>
    </div>
  );
};


