"use client";
import { useEffect, useRef } from "react";
import { requestProvider } from "@getalby/bitcoin-connect";
import toast from "react-hot-toast";

export default function AutoScrollPay() {
  const isSending = useRef(false);

  useEffect(() => {
    const handleScroll = async () => {
      if (isSending.current) return;
      isSending.current = true;

      try {
        const provider = await requestProvider();
        await provider.enable();

        await provider.keysend({
          destination: "skillfulcloud228426@getalby.com", // <- your test pubkey or receiver node pubkey
          amount: 1,
        });

        toast.success("Paid 1 sat!");
      } catch (err) {
        console.error("Auto-scroll payment failed", err);
        const error = err.message || "Auto-payment Failed"
        toast.error(error);
      } finally {
        // Wait a bit before allowing another payment
        setTimeout(() => {
          isSending.current = false;
        }, 3000); // Throttle: 3 seconds between scroll triggers
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null; // No UI needed
}
