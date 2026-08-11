import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import HeroSection from "@/framework/section/hero/HeroGrid";
import HeroWithBanner from "@/framework/section/hero/HeroWithBanner";
import {HeroCarousel} from "@/framework/section/feature/HeroCarsouel";
import HeroShader from "@/framework/section/hero/HeroShader";
import {HeroWithLogo} from "@/framework/section/hero/HeroWithLogo";

const images = [
  {
    src: 'https://www.loremfaces.net/256/id/1.jpg',
    alt: 'Professional portrait of a woman',
  },
  {
    src: 'https://www.loremfaces.net/256/id/5.jpg',
    alt: 'Scenic landscape with mountains and a lake',
  },
  {
    src: 'https://www.loremfaces.net/256/id/4.jpg',
    alt: 'Artistic photo of a girl with flowers',
  },
  {
    src: 'https://www.loremfaces.net/256/id/3.jpg',
    alt: 'A dog wearing sunglasses',
  },
  {
    src: 'https://www.loremfaces.net/256/id/2.jpg',
    alt: 'Creative shot of a person from behind',
  },
];


const Page = () => {

  const components = [
    {component: <HeroSection/>, path: "framework/section/hero/HeroGrid.tsx"},
    {component: <HeroWithBanner/>, path: "framework/section/hero/HeroWithBanner.tsx"},
    {component: <HeroWithLogo/>, path: "framework/section/hero/HeroWithLogo.tsx"},
    {component: <HeroShader/>, path: "framework/section/hero/HeroShader.tsx"},
    {
      component: <HeroCarousel
        title={<>
          Edit Your <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Photos </span> on the
          Go
        </>}
        subtitle="Use all our AI-powered photo editing tools on your phone, available for all iOS and Android."
        images={images}
        appStoreLink="#"
        googlePlayLink="#"/>, path: "framework/section/feature/HeroCarousel.tsx"
    },
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
