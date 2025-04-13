"use client";
import React from "react";
import ColorfulText from "./ColourfulText"

export default function BackgroundBeamsDemo() {
  return (
    <div className="min-h-screen w-full rounded-md bg-black relative flex flex-col items-center justify-center antialiased">
      <ColorfulText/>
    </div>
  );
}
