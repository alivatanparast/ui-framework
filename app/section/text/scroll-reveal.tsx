import React, {useMemo, ReactNode, RefObject, useRef} from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import {RevealLinks} from "../effect/reveal-links";

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: number; // normalized scroll progress (0-1)
  wordAnimationEnd?: number; // normalized scroll progress (0-1)
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
                                                     children,
                                                     scrollContainerRef,
                                                     enableBlur = true,
                                                     baseOpacity = 0.1,
                                                     baseRotation = 3,
                                                     blurStrength = 4,
                                                     containerClassName = '',
                                                     textClassName = '',
                                                     rotationEnd = 1,
                                                     wordAnimationEnd = 1
                                                   }) => {
  // Split text into words and spaces
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, i) => {
      if (word.match(/^\s+$/)) return word; // keep spaces as-is
      return (
        <motion.span
          key={i}
          className="inline-block word mr-[2px]" // small margin for spacing
        >
          {word}
        </motion.span>
      );
    });
  }, [children]);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef ? scrollContainerRef.current : undefined,
  });

  // Rotation for container
  const rotate = useTransform(scrollYProgress, [0, rotationEnd], [baseRotation, 0]);

  // Opacity & blur for words
  const opacity = useTransform(scrollYProgress, [0, wordAnimationEnd], [baseOpacity, 1]);
  const blur = useTransform(scrollYProgress, [0, wordAnimationEnd], [enableBlur ? blurStrength : 0, 0]);
  const blurStyle = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.h2
      className={`my-5 ${containerClassName}`}
      style={{ rotate }}
    >
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
      >
        {splitText.map((word) =>
          typeof word === 'string'
            ? word // leave spaces as strings
            : React.cloneElement(word as React.ReactElement, {
              style: { opacity, filter: blurStyle },
            })
        )}
      </p>
    </motion.h2>
  );
};


export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={containerRef}
        style={{ height: '100vh', padding: '100px' }}
      >
        <div className='h-[40vh]'></div>
        <div className='h-[40vh]'></div>

        <ScrollReveal
          scrollContainerRef={containerRef}
          baseOpacity={0.2}
          baseRotation={20}
          blurStrength={6}
          containerClassName="text-center"
          textClassName="text-blue-600"
          rotationEnd={0.9} // rotation completes at 50% scroll
          wordAnimationEnd={0.9} // words fully visible at 70% scroll
        >
          Hello world! This is a scroll reveal with Framer Motion.
          Hello world! This is a scroll reveal with Framer Motion.
          Hello world! This is a scroll reveal with Framer Motion.
          Hello world! This is a scroll reveal with Framer Motion.
          Hello world! This is a scroll reveal with Framer Motion.
        </ScrollReveal>

        <div className='h-[40vh]'></div>
        <div className='h-[40vh]'></div>

      </div>
    </>
  );
};

