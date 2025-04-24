import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

function Features() {
  const testimonials = [
    {
      quote:
        "Send payments instantly with a click or scroll — no invoices needed.",
      name: "Keysend Lightning Payments",
      designation: "Effortless P2P payments using WebLN’s keysend.",
      src: "/automation.jpg",
    },
    {
      quote: "Pay 100 sat every time you scroll. Programmable money made simple.",
      name: "Auto-Payment on Scroll",
      designation: "Triggers micro-payments as users interact with content.",
      src: "/pricing.jpg",
    },
    {
      quote:
        "Seamless WebLN integration for one-click wallet access and payments.",
      name: "Native WebLN Support",
      designation: "Enables seamless wallet interactions in-browser.",
      src: "/credits.jpg",
    },
    {
      quote: "Check wallet balance and connection status directly in the app.",
      name: "Live Wallet Info",
      designation: "Displays real-time user wallet metadata.",
      src: "/storage.jpg",
    },
    {
      quote: "Embed instant tips and micro-support with Simple Boost.",
      name: "Boosted Content Support",
      designation: "Easily monetize content using Lightning tips.",
      src: "/pay-int.jpg",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}

export default Features;
