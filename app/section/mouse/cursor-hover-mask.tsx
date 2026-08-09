'use client'
import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = e => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export default function Demo() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <main className="relative h-screen">
      {/* Mask Layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-[#ec4e39] text-black cursor-default"
        style={{
          WebkitMaskImage: "url('/mask.svg')",
          WebkitMaskRepeat: "no-repeat",
        } as any}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        } as any}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        <p
          className="max-w-[1000px] p-10 text-[64px] leading-[66px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          A visual designer - with skills that haven't been replaced by A.I (yet) - making good shit only if the paycheck is equally good.
        </p>
      </motion.div>

       {/*Body Content */}
      <div className="relative -z-10 flex h-full w-full items-center justify-center text-[#afa18f] text-[64px] leading-[66px] cursor-default">
        <p className="max-w-[1000px] p-10">
          I'm a <span className="text-[#ec4e39]">selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience.
        </p>
      </div>
    </main>
  );
}
