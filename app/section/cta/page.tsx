import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import CTABackgroundShader from "@/framework/section/cta/CTABackgroundShader";
import {CTASingleButton} from "@/framework/section/cta/CTASingleButton";

const Page = () => {

  const components = [
    {component: <CTABackgroundShader/>, path: "framework/section/hero/CTABackgroundShader.tsx"},
    {component: <CTASingleButton/>, path: "framework/section/hero/CTASingleButton.tsx"},

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
