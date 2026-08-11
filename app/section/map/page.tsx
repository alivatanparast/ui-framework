import React from "react";
import PreviewDialog from "@/components/PreviewDialog";
import GalleryScrolling from "@/framework/section/gallery/GalleryScrolling";
import {MapConnections} from "@/framework/section/map/MapConnections";

const dotes = [
  {
    start: {
      lat: 64.2008,
      lng: -149.4937,
      label: "Fairbanks"
    },
    end: {
      lat: 34.0522,
      lng: -118.2437,
      label: "Los Angeles"
    },
  },
  {
    start: {
      lat: 64.2008,
      lng: -149.4937,
      label: "Fairbanks"
    },
    end: {
      lat: -15.7975,
      lng: -47.8919,
      label: "Brasília"
    },
  },
  {
    start: {
      lat: -15.7975,
      lng: -47.8919,
      label: "Brasília"
    },
    end: {
      lat: 38.7223,
      lng: -9.1393,
      label: "Lisbon"
    },
  },
  {
    start: {
      lat: 51.5074,
      lng: -0.1278,
      label: "London"
    },
    end: {
      lat: 28.6139,
      lng: 77.209,
      label: "New Delhi"
    },
  },
  {
    start: {
      lat: 28.6139,
      lng: 77.209,
      label: "New Delhi"
    },
    end: {
      lat: 43.1332,
      lng: 131.9113,
      label: "Vladivostok"
    },
  },
  {
    start: {
      lat: 28.6139,
      lng: 77.209,
      label: "New Delhi"
    },
    end: {
      lat: -1.2921,
      lng: 36.8219,
      label: "Nairobi"
    },
  },
]

const Page = () => {

  const components = [
    {
      component: <MapConnections dots={dotes}/>, path: "framework/section/map/MapConnections.tsx"
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
