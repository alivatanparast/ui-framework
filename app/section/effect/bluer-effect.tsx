"use client"

import {useRef} from "react"
import {
  AnimatePresence,
  motion,
  type MotionProps,
  useInView,
  type Variants,
} from "framer-motion"
import classNames from "classnames"

type MarginType = Parameters<typeof useInView>[1]["margin"]

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  inView?: boolean
  inViewMargin?: MarginType
  blur?: string
}

export const BluerEffect = ({
                           children,
                           className,
                           variant,
                           duration = 0.4,
                           delay = 0,
                           offset = 6,
                           direction = "down",
                           inView = false,
                           inViewMargin = "-50px",
                           blur = "6px",
                           ...props
                         }: BlurFadeProps) => {
  const ref = useRef(null)
  const inViewResult = useInView(ref, {once: true, margin: inViewMargin})
  const isInView = !inView || inViewResult

  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  }

  const combinedVariants = variant || defaultVariants

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={classNames(className)}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}


const images = Array.from({length: 9}, (_, i) => {
  const isLandscape = i % 2 === 0
  const width = isLandscape ? 800 : 600
  const height = isLandscape ? 600 : 800
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`
})

export default function Demo() {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((imageUrl, idx) => (
          <BluerEffect key={imageUrl} delay={1.5 + idx * 0.5} inView>
            <img
              className="mb-4 size-full rounded-lg object-contain"
              src={imageUrl}
              alt={`Random stock image ${idx + 1}`}
            />
          </BluerEffect>
        ))}
      </div>
    </section>
  )
}
