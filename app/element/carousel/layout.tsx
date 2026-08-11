import React from "react";

export default function HeroPageLayout({
                                            children,
                                          }: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-8 px-16">
      <main>{children}</main>
    </div>
  );
}
