import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import HeroSection from "@/framework/section/hero/HeroGrid";
import HeroWithBanner from "@/framework/section/hero/HeroWithBanner";

const components = [
  {component: <HeroSection/>, path: "framework/section/hero/HeroGrid.tsx"},
  {component: <HeroWithBanner/>, path: "framework/section/hero/HeroWithBanner.tsx"},
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
