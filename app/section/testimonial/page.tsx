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

const components = [
  {component: <TestimonialsCarousel/>, path: "framework/section/testimonial/TestimonialsCarousel.tsx"},
  {component: <TestimonialMarquee/>, path: "framework/section/testimonial/TestimonialMarquee.tsx"},
  {component: <TestimonialGrid/>, path: "framework/section/testimonial/Marquee.tsx"},
  {component: <TestimonialOffWhiteGrid/>, path: "framework/section/testimonial/Marquee.tsx"},
  {component: <TestimonialSideBySide/>, path: "framework/section/testimonial/TestimonialSideBySide.tsx"},
  {component: <TestimonialSimpleCentered/>, path: "framework/section/testimonial/TestimonialSimpleCentered.tsx"},
  {component: <TestimonialWithBackgroundImage/>, path: "framework/section/testimonial/TestimonialWithBackgroundImage.tsx"},
  {component: <TestimonialWithLargeAvatar/>, path: "framework/section/testimonial/TestimonialWithLargeAvatar.tsx"},
  {component: <TestimonialWithOverlappingImage/>, path: "framework/section/testimonial/TestimonialWithOverlappingImage.tsx"},
  {component: <TestimonialWithStarRating/>, path: "framework/section/testimonial/TestimonialWithStarRating.tsx"},
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
