import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import MarqueeDemo from "@/framework/animation/Marquee";

const components = [
  {component: <MarqueeDemo/>, path: "framework/animation/Marquee.tsx"},
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
