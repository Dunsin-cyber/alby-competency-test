"use client";
import ColourfulText from "@/components/ui/colourful-text";
import { useRouter } from "@/hooks/useRouterWithProgress";
import { Button } from "antd";
import { motion } from "motion/react";

export default function ColourfulTextDemo() {
  const router = useRouter();
  return (
    <div className="h-screen  w-full flex flex-col space-y-5 items-center justify-center relative overflow-hidden bg-black">
      <motion.img
        src="grid.jpg"
        className="h-full w-full  object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <h1 className="text-2xl px-8 md:text-3xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        Instant payments. Zero barriers. Pure Lightning with{" "}
        <ColourfulText text="Alby" /> <br />
        Libraries
      </h1>
      <Button
        onClick={() => {
          router("/wallet");
        }}
      >
        Get Started
      </Button>
    </div>
  );
}
