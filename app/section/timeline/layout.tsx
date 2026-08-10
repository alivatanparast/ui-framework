import React from "react";

export default function TestimonialLayout({
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
