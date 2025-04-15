import Navbar from "../Navbar";
import HowItWorks from "./Features";
import Intro from "./Intro";
import Map from "./LightningChannels";

export default function Home() {
  return (
    <div className="flex flex-col h-screen pb-20 space-y-6 px-[2%]">
      <div className=" mt-3">
        <Navbar />
      </div>
      <Intro />
      <HowItWorks />
      <Map />
    </div>
  );
}
