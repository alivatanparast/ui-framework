import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import BackgroundGradient from "@/framework/background/BackgroundGradient";
import BackgroundAuroraDemo from "@/framework/background/BackgroundAurora";
import BackgroundIridescenceDemo from "@/framework/background/BackgroundIridescence";

const Page = () => {

  const components = [
    {component: <BackgroundGradient/>, path: "framework/background/BackgroundGradient.tsx"},
    {component: <BackgroundAuroraDemo/>, path: "framework/background/BackgroundAurora.tsx"},
    {component: <BackgroundIridescenceDemo/>, path: "framework/background/BackgroundIridescence.tsx"},

  ]

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
