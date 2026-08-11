import React from "react";

import TestimonialMarquee from "@/framework/section/testimonial/TestimonialMarquee";
import TestimonialGrid from "@/framework/section/testimonial/TestimonialGrid";
import TestimonialOffWhiteGrid from "@/framework/section/testimonial/TestimonialOffWhiteGrid";
import TestimonialSideBySide from "@/framework/section/testimonial/TestimonialSideBySide";
import PreviewDialog from "@/components/PreviewDialog";
import TestimonialSimpleCentered from "@/framework/section/testimonial/TestimonialSimpleCentered";
import TestimonialsCarousel from "@/framework/section/testimonial/TestimonialsCarousel";
import TestimonialWithBackgroundImage from "@/framework/section/testimonial/TestimonialWithBackgroundImage";
import TestimonialWithLargeAvatar from "@/framework/section/testimonial/TestimonialWithLargeAvatar";
import TestimonialWithOverlappingImage from "@/framework/section/testimonial/TestimonialWithOverlappingImage";
import TestimonialWithStarRating from "@/framework/section/testimonial/TestimonialWithStarRating";
import TestimonialColumn from "@/framework/section/testimonial/TestimonialColumn";
import TestimonialScrollReel from "@/framework/section/testimonial/TestimonialScrollReel";

const TESTIMONIALS = [
  {
    quote: "Big effort - high quality. Best Framer content out there.",
    author: "Jan Dittrich",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Jan Dittrich",
  },
  {
    quote:
      "I'm building a new website and it's absolutely ridiculous how valuable your content has been.",
    author: "Michael Riddering",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Michael Riddering",
  },
  {
    quote: "Way too much value for free to be honest.",
    author: "James Traf",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of James Traf",
  },
];

const components = [
  {component: <TestimonialsCarousel/>, path: "framework/section/testimonial/TestimonialsCarousel.tsx"},
  {component: <TestimonialMarquee/>, path: "framework/section/testimonial/TestimonialMarquee.tsx"},
  {component: <TestimonialGrid/>, path: "framework/section/testimonial/Marquee.tsx"},
  {component: <TestimonialOffWhiteGrid/>, path: "framework/section/testimonial/Marquee.tsx"},
  {component: <TestimonialSideBySide/>, path: "framework/section/testimonial/TestimonialSideBySide.tsx"},
  {component: <TestimonialSimpleCentered/>, path: "framework/section/testimonial/TestimonialSimpleCentered.tsx"},
  {
    component: <TestimonialWithBackgroundImage/>,
    path: "framework/section/testimonial/TestimonialWithBackgroundImage.tsx"
  },
  {component: <TestimonialWithLargeAvatar/>, path: "framework/section/testimonial/TestimonialWithLargeAvatar.tsx"},
  {
    component: <TestimonialWithOverlappingImage/>,
    path: "framework/section/testimonial/TestimonialWithOverlappingImage.tsx"
  },
  {component: <TestimonialWithStarRating/>, path: "framework/section/testimonial/TestimonialWithStarRating.tsx"},
  {component: <TestimonialColumn/>, path: "framework/section/testimonial/TestimonialColumn.tsx"},
  {
    component: <TestimonialScrollReel testimonials={TESTIMONIALS}/>,
    path: "framework/section/testimonial/TestimonialScrollReel.tsx"
  },
]

const Page = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {components.map((x, i) => (
        <PreviewDialog
          key={i}
          sourcePath={x.path}
        >
          {x.component}
        </PreviewDialog>
      ))}
    </div>
  );
};

export default Page;
