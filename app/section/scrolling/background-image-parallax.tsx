import {useEffect, useRef} from "react";
import Lenis from "lenis";
import {motion, useScroll, useTransform} from "framer-motion";

export const Intro = () => {

  const container = useRef();

  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0", "80vh"])

  return (
    <div className='relative flex items-center justify-center h-screen overflow-hidden'>

      <motion.div ref={container} style={{y}} className='w-full'>
        <img src='/images/house.jpg' className='w-full h-screen object-cover relative'/>
      </motion.div>

    </div>
  );
}

export const Description = () => {

  const container = useRef();

  const {scrollYProgress} = useScroll({
    target: container,
    offset: ["start end", 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className='relative flex items-center justify-center h-screen overflow-hidden'
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >

      <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
        <motion.div style={{y}} className='relative w-full h-full'>
          <img src='/images/cactus.jpg' alt="image" className='object-cover w-full'/>
        </motion.div>
      </div>

    </div>
  );
}

export default function Demo() {

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <main className='flex flex-col  '>

      <Intro/>

      <div className='h-screen bg-red-200'/>

      <Description/>

      <div className='h-screen bg-red-200'/>

    </main>
  );
}
