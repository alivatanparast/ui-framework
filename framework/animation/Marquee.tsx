'use client'

import {cn} from "@/lib/utils";
import {useState} from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

export function Marquee({
                          children,
                          vertical = false,
                          repeat = 5,
                          pauseOnHover = false,
                          reverse = false,
                          className,
                          applyMask = true,
                          ...props
                        }: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  const marqueeX = `
    @keyframes marquee-x {
      from { transform: translateX(0); }
      to { transform: translateX(calc(-100% - var(--gap))); }
    }
  `;

  const marqueeY = `
    @keyframes marquee-y {
      from { transform: translateY(0); }
      to { transform: translateY(calc(-100% - var(--gap))); }
    }
  `;

  // event handlers only used when pauseOnHover === true
  const onEnter = pauseOnHover ? () => setIsPaused(true) : undefined;
  const onLeave = pauseOnHover ? () => setIsPaused(false) : undefined;

  return (
    <div
      {...props}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "group relative flex w-full overflow-hidden p-2 [--duration:10s] [--gap:12px] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {/* Inline keyframes */}
      <style>
        {`
          ${marqueeX}
          ${marqueeY}

          .animate-marquee-horizontal {
            animation: marquee-x var(--duration) linear infinite;
          }
          .animate-marquee-vertical {
            animation: marquee-y var(--duration) linear infinite;
          }
        `}
      </style>

      {/* repeated items */}
      {Array.from({length: repeat}).map((_, index) => (
        <div
          key={`item-${index}`}
          // control animationDirection and animationPlayState via inline style - reliable
          style={{
            animationDirection: reverse ? "reverse" : "normal",
            // camelCase used for React inline style
            animationPlayState: isPaused ? "paused" : "running",
          }}
          className={cn(
            "flex shrink-0 min-w-max [gap:var(--gap)]",
            {
              "animate-marquee-horizontal flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
            }
          )}
        >
          {children}
        </div>
      ))}

      {/* Optional mask gradient (flips based on reverse/direction) */}
      {applyMask && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/60 from-5% via-transparent via-50% to-white/60 to-95% dark:from-gray-800/60 dark:via-transparent dark:to-gray-800/60",
            vertical
              ? reverse
                ? "bg-gradient-to-t"
                : "bg-gradient-to-b"
              : reverse
                ? "bg-gradient-to-l"
                : "bg-gradient-to-r"
          )}
        />
      )}
    </div>
  );
}


export default function Demo() {
  return (
    <div className='w-[800px]'>

      <Marquee reverse pauseOnHover>
        <div className="flex gap-8 text-xl h-32">
          <span>🚀 Fast</span>
          <span>💻 Modern</span>
          <span>⚡ Smooth</span>
          <span>🎨 Stylish</span>
        </div>
      </Marquee>
    </div>
  )
}