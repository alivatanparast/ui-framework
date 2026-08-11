import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import MarqueeCarousel from "@/framework/element/carousel/MarqueeCarousel";

const components = [
  {component: <MarqueeCarousel/>, path: "framework/section/feature/MarqueeCarousel.tsx"},
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
