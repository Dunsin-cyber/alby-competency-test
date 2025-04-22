"use client";

import { useState } from "react";
import {  QrReader } from "react-qr-reader";
import { useClient } from "@/context/index";
import toast from "react-hot-toast";

const Scanner = () => {
  const [data, setData] = useState("No result");
  const { openScanner, setOpenScanner, setAddress } = useClient();

  return (
    openScanner && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
        <div className="w-full max-w-md relative">
          <QrReader
            onResult={(result:any, error) => {
              if (result?.text) {
                console.log("Scanned QR Code:", result.text);
                setAddress(result.text);
                setOpenScanner(false);
                // You can lift this up via props or context if needed
              }

              if (error) {
                console.info("QR Scan Error:", error);
                toast.error("Error scanning QR code");
              }
            }}
            constraints={{ facingMode: "environment" }}
            containerStyle={{ width: "100%" }}
          />
          <button
            className="absolute top-4 right-4 text-white text-lg bg-red-600 px-3 py-1 rounded"
            onClick={() => setOpenScanner(false)}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default Scanner;
