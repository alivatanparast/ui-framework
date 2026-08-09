import {motion, useScroll, useTransform} from 'framer-motion';
import React, {useEffect, useRef} from 'react';
import Lenis from "lenis";

export const projects = [
  {
    title: "Matthias Leidinger",
    description: "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "rock.jpg",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    color: "#BBACAF"
  },
  {
    title: "Clément Chapillon",
    description: "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves (French for ‘The tawny rocks’).",
    src: "tree.jpg",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    color: "#977F6D"
  },
  {
    title: "Zissou",
    description: "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    src: "water.jpg",
    link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#C2491D"
  },
  {
    title: "Mathias Svold and Ulrik Hasemann",
    description: "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
    src: "house.jpg",
    link: "https://www.ignant.com/2019/03/13/a-photographic-series-depicting-the-uncertain-future-of-denmarks-treasured-coastlines/",
    color: "#B62429"
  },
  {
    title: "Mark Rammers",
    description: "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote. Titled ‘Beginnings’, the mesmerizing collection of images is a visual and meditative journey into the origins of regrets and the uncertainty of stepping into new unknowns.",
    src: "cactus.jpg",
    link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
    color: "#88A28D"
  }
]

export const ParallaxCards = () => {
  const container = useRef(null);
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start start', 'end end']
  } as any)

  useEffect(() => {

    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  useEffect(() => {
    scrollYProgress.on('change', () => {
      console.log(scrollYProgress.current)
    })
  }, [])

  return (
    <main ref={container} className='relative mt-36'>
      {
        projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]}
                       targetScale={targetScale}/>
        })
      }
    </main>
  );
}

const Card = ({i, title, description, src, url, color, progress, range, targetScale}) => {
  const container = useRef(null);

  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  } as any);

  const imageScale = useTransform(scrollYProgress, [0, 1], [3, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        } as any}
        className="relative flex flex-col h-[500px] w-[1000px] rounded-2xl p-12 origin-top"
      >
        {/* Title */}
        <h2 className="text-center text-[28px] m-0">{title}</h2>

        {/* Body */}
        <div className="flex h-full mt-12 gap-12">
          {/* Description */}
          <div className="w-2/5 relative top-[10%]">
            <p className="text-base first-letter:text-[28px] first-letter:font-title">
              {description}
            </p>
            <span className="flex items-center gap-1 mt-2">
              <a
                href={url}
                target="_blank"
                className="text-xs underline cursor-pointer"
              >
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          {/* Image */}
          <div className="relative w-3/5 h-[330px] rounded-2xl overflow-hidden">
            <motion.div className="w-full h-full" style={{scale: imageScale, opacity: scrollYProgress} as any}>
              <img
                src={`/images/${src}`}
                alt="image"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Demo() {
  return (
    <>
      <ParallaxCards/>
    </>
  );
};
