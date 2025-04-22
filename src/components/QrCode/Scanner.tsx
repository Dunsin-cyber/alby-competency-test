"use client";

import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useClient } from "@/context/index";

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = () => {
  return {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1,
    disableFlip: false,
  };
};

const Scanner = () => {
  const { openScanner, setOpenScanner, setAddress } = useClient();

  useEffect(() => {
    if (!openScanner) return;

    const config = createConfig();
    const verbose = false;

    const scanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);

    scanner.render(
      (decodedText, decodedResult) => {
        console.log("Scanned:", decodedText);
        setAddress(decodedText);
        setOpenScanner(false);
        scanner.clear().catch(console.error);
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );

    return () => {
      scanner.clear().catch((err) => {
        console.error("Failed to clear scanner:", err);
      });
    };
  }, [openScanner]);

  if (!openScanner) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <div
          id={qrcodeRegionId}
          className="w-full aspect-square rounded overflow-hidden"
        />
        <button
          onClick={() => setOpenScanner(false)}
          className="absolute top-4 right-4 text-white bg-red-600 px-3 py-1 rounded shadow"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Scanner;
