"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {RevealLinks} from "../effect/reveal-links";

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
                                               sentence = "True Focus",
                                               manualMode = false,
                                               blurAmount = 5,
                                               borderColor = "green",
                                               glowColor = "rgba(0, 255, 0, 0.6)",
                                               animationDuration = 0.5,
                                               pauseBetweenAnimations = 1,
                                             }) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Automatic word focus
  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  // Update focus rectangle
  useEffect(() => {
    const activeEl = wordRefs.current[currentIndex];
    const containerEl = containerRef.current;
    if (!activeEl || !containerEl) return;

    const parentRect = containerEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  // Manual hover
  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      className="relative flex gap-4 justify-center items-center flex-wrap"
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <motion.span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="relative text-[3rem] font-black cursor-pointer"
            style={{ filter: `blur(${isActive ? 0 : blurAmount}px)` }}
            animate={{ filter: `blur(${isActive ? 0 : blurAmount}px)` }}
            transition={{ duration: animationDuration }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </motion.span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
      >
        {/* Corner borders */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map(
          (corner) => {
            const styleMap: Record<string, React.CSSProperties> = {
              "top-left": {
                top: -10,
                left: -10,
                borderRight: 0,
                borderBottom: 0,
              },
              "top-right": {
                top: -10,
                right: -10,
                borderLeft: 0,
                borderBottom: 0,
              },
              "bottom-left": {
                bottom: -10,
                left: -10,
                borderRight: 0,
                borderTop: 0,
              },
              "bottom-right": {
                bottom: -10,
                right: -10,
                borderLeft: 0,
                borderTop: 0,
              },
            };
            return (
              <span
                key={corner}
                className="absolute w-4 h-4 border-[3px] rounded-[3px]"
                style={{
                  borderColor: borderColor,
                  filter: `drop-shadow(0 0 4px ${borderColor})`,
                  ...styleMap[corner],
                }}
              />
            );
          }
        )}
      </motion.div>
    </div>
  );
};

export default function Demo() {
  return (
    <>
      <TrueFocus
        sentence="True Focus"
        manualMode={false}
        blurAmount={5}
        borderColor="red"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />

    </>
  );
};
