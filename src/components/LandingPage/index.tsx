import HowItWorks from "./Features";
import Intro from "./Intro";
import Navbar from "../Navbar";
import Map from "./LightningChannels";
import ColourfulText from "@/components/ui/colourful-text";

export default function Home() {
  return (
    <div className="flex flex-col h-screen pb-20 space-y-6 px-[2%]">
      <div className="flex justify-between items-center mt-5">
        <div className="text-3xl font-bold z-2 font-sans">
          <ColourfulText text="ACT" />
        </div>
        <Navbar />
      </div>
      <Intro />
      <HowItWorks />
      <Map />
    </div>
  );
}
