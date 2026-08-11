import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import GalleryScrolling from "@/framework/section/gallery/GalleryScrolling";
import {GalleryWelcome} from "@/framework/section/gallery/GalleryWelcome";
import {GalleryElastic} from "@/framework/section/gallery/GalleryElastic";
import {GalleryGrid} from "@/framework/section/gallery/GalleryGrid";

const galleryData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1470&auto=format&fit=crop",
    alt: "Cityscape at dusk",
    title: "Cityscape at dusk",
    span: "col-span-1"
  },
  {
    id: 2,
    src: "https://ix-marketing.imgix.net/focalpoint.png?q=80&w=1470&auto=format&fit=crop",
    alt: "Portrait",
    title: "Portrait",
    span: "sm:col-span-2"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1470&auto=format&fit=crop",
    alt: "Sunlight through a forest",
    title: "Forest Path",
    span: "col-span-1"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
    alt: "Portrait of a person",
    title: "Portrait",
    span: "col-span-1"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1470&auto=format&fit=crop",
    alt: "Wildlife photography",
    title: "Wildlife",
    span: "sm:col-span-2"
  },
  {
    id: 6,
    src: "https://ix-marketing.imgix.net/bg-remove_after.png?q=80&w=1470&auto=format&fit=crop",
    alt: "Modern architecture",
    title: "Architecture",
    span: "col-span-1"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?q=80&w=1470&auto=format&fit=crop",
    alt: "Starry night sky",
    title: "Night Sky",
    span: "col-span-1"
  },
  {
    id: 8,
    src: "https://ix-marketing.imgix.net/autocompress.png?q=80&w=1287&auto=format&fit=crop",
    alt: "Street art",
    title: "Street Art",
    span: "col-span-1"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop",
    alt: "Mountain Range",
    title: "Mountain Range",
    span: "sm:col-span-2"
  },
];

const Page = () => {

  const components = [
    {component: <GalleryScrolling/>, path: "framework/section/gallery/GalleryScrolling.tsx"},
    {component: <GalleryElastic/>, path: "framework/section/gallery/ElasticGallery.tsx"},
    {component: <GalleryWelcome/>, path: "framework/section/gallery/GalleryWelcome.tsx"},
    {component: <GalleryGrid data={galleryData}/> , path: "framework/section/gallery/GalleryGrid.tsx"},

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
