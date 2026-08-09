import React, {useEffect, useRef} from "react";
import Lenis from "lenis";
import {motion, useScroll, useTransform} from "framer-motion";

export const PerspectiveSectionTransition = () => {

  const container = useRef();

  const {scrollYProgress} = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <div ref={container} className='relative h-[200vh]'>
      <Section01 scrollYProgress={scrollYProgress}/>
      <Section02 scrollYProgress={scrollYProgress}/>
    </div>
  );
}

export const Section01 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <motion.div style={{scale, rotate, borderRadius} as any}
                className='h-screen bg-blue-200 flex items-center justify-center'>
      <img src='/images/rock.jpg' className='h-1/2 w-1/2 object-cover rounded-2xl'/>
    </motion.div>
  );
}

export const Section02 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div style={{scale, rotate, borderRadius} as any}
                className='h-screen bg-red-200 flex items-center justify-center'>
      <img src='/images/house.jpg' className='h-1/2 w-1/2 object-cover rounded-2xl'/>
    </motion.div>
  );

}

export default function Demo() {
  return (
    <>
      <PerspectiveSectionTransition/>
    </>
  );
};