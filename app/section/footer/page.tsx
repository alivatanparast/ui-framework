import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import {CinematicFooter} from "@/framework/section/footer/CinematicFooter";
import Footer4Col from "@/framework/section/footer/Footer4Col";
import FooterNewsletter from "@/framework/section/footer/FooterNewsletter";

const components = [
  {component: <CinematicFooter/>, path: "framework/section/footer/CinematicFooter.tsx",},
  {component: <Footer4Col/>, path: "framework/section/footer/Footer4Col.tsx"},
  {component: <FooterNewsletter/>, path: "framework/section/footer/FooterNewsletter.tsx"}
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
