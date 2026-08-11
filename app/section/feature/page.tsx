import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import FeatureCarousel from "@/framework/section/feature/FeatureCarousel";
import {ScrollingFeatureShowcase} from "@/framework/section/feature/FeatureScrollShowCase";

const components = [
  {component: <FeatureCarousel/>, path: "framework/section/feature/FeatureCarousel.tsx"},
  {component: <ScrollingFeatureShowcase/>, path: "framework/section/feature/ScrollingFeatureShowcase.tsx"},
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
