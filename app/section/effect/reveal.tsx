"use client";
import {motion, useInView} from "framer-motion";
import React, {useRef} from "react";
import {RevealLinks} from "./reveal-links";

interface Props {
  children: JSX.Element;
  width?: 'fit-content' | '100%'
}

export const Reveal = ({children, width = 'fit-content'}: Props) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {once: false, amount: 0.3});

  return (
    <div ref={ref}
         style={{width}}
         className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: {opacity: 0, y: 20},
          visible: {opacity: 1, y: 0},
        }}
        initial="hidden"
        whileInView='visible'
        // animate={isInView ? "visible" : "hidden"}
        transition={{duration: 0.5, delay: 0.25}}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: {left: '100%'},
          visible: {left: 0},
        }}
        initial="visible"
        whileInView='hidden'
        // animate={isInView ? "hidden" : "visible"}
        transition={{duration: 0.5, ease: 'easeIn'}}
        className='absolute inset-0 bg-green-200'
      >
      </motion.div>


    </div>
  );
}

export default function Demo() {
  return (
    <div className='flex flex-col gap-8 bg-gray-500'>

      <Reveal>
        <p className='font-bold text-6xl text-white'>
          Ali vatanparast
        </p>
      </Reveal>

      <Reveal>
        <p className='font-bold text-2xl text-white'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua
        </p>
      </Reveal>

      <div className='h-[30vh] bg-red-200'/>
      <div className='h-[30vh] bg-red-200'/>
      <div className='h-[30vh] bg-blue-200'/>
      <div className='h-[30vh] bg-blue-200'/>
      <div className='h-[30vh] bg-green-200'/>
      {/*<div className='h-[30vh] bg-green-200'/>*/}
      {/*<div className='h-[30vh] bg-yellow-200'/>*/}

    </div>
  );
};