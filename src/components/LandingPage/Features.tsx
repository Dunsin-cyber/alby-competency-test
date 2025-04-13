import React from 'react'
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

function Features() {
     const testimonials = [
       {
         quote:
           "Ensures trustless, tamper-proof transactions between energy producers and consumers",
         name: "Smart Contract Automation",
           designation: "Develops secure, self-executing contracts for energy trades.",
           src:"/automation.jpg"
       },
       {
         quote: "Dynamic energy pricing based on demand and supply, optimizing cost efficiency.",
         name: "Real-Time Pricing",
           designation: "Optimizes pricing through demand-supply analytics.",
           src:"/pricing.jpg"
        },
       {
         quote: "Users earn, trade, and redeem energy credits via blockchain-based tokens.",
         name: "Tokenized Energy Credits",
        designation: "Manages blockchain-based energy credit transactions.",
        src: "/credits.jpg"
        },
       {
         quote:
           "Secure and immutable data storage using blockchain.",
         name: "Decentralized Storage",
        designation: "Ensures data integrity with tamper-proof records.",
        src:"/storage.jpg"
        },
       {
         quote: "Supports crypto and stablecoin payments for frictionless transactions.",
         name: "Seamless Payment Integration",
         src: "/pay-int.jpg",
        designation: "Facilitates instant and borderless energy payments."
        },
     ];
 
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}

export default Features