"use client"
import React, {useCallback, useEffect} from "react"
import {motion, useMotionTemplate, useMotionValue} from "framer-motion"
import classNames from 'classnames';

interface MagicCardProps {
  children?: React.ReactNode
  className?: string
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
}

export function MagicCard({
                            children,
                            className,
                            gradientSize = 200,
                            gradientColor = "rgba(172,171,171,0.22)",
                            gradientOpacity = 0.8,
                            gradientFrom = "#9E7AFF",
                            gradientTo = "#FE8BBB",
                          }: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)
  const reset = useCallback(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [gradientSize, mouseX, mouseY])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    const handleGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        reset()
      }
    }

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") {
        reset()
      }
    }

    window.addEventListener("pointerout", handleGlobalPointerOut)
    window.addEventListener("blur", reset)
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut)
      window.removeEventListener("blur", reset)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [reset])

  return (
    <div
      className={classNames("group relative rounded-[inherit] transition-all duration-200 ease-linear", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerEnter={reset}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
          ${gradientFrom}, 
          ${gradientTo}, 
          transparent 100%
          )
          `,
          opacity: gradientOpacity,
        }}
      />

      <div className="bg-gray-800 absolute inset-[2px] rounded-[inherit]" />

      <motion.div
        className="pointer-events-none absolute inset-[2px] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />

      <div className="relative">{children}</div>
    </div>
  )
}

export default function Demo() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-950 p-10">
      <MagicCard className="w-80 h-48 p-6 text-white rounded-md">
        <h2 className="text-xl font-bold">Magic Card ✨</h2>
        <p className="text-sm opacity-80">
          Hover over me to see the magic gradient follow your cursor.
        </p>
      </MagicCard>
    </main>
  );
};