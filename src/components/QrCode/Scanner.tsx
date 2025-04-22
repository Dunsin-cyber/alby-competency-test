"use client";

import { useClient } from "@/context/index";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { QrReader } from "react-qr-reader";

const Scanner = () => {
  const [data, setData] = useState("No result");
  const { openScanner, setOpenScanner, setAddress } = useClient();
  const [permission, setPermission] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

useEffect(() => {
  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setPermission(true);
      stream.getTracks().forEach((track) => track.stop()); // Immediately stop to avoid locking camera
    } catch (err) {
      console.error("Camera permission error:", err);
      setPermission(false);
      setErrorMsg("Camera access denied. Please check your browser settings.");
    }
  };

  checkCameraPermission();
}, []);

  return (
    openScanner && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
        <div className="w-full max-w-md relative">
          {permission ? (
            <QrReader
              onResult={(result: any, error) => {
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
              videoContainerStyle={{ paddingTop: "100%" }}
            />
          ) : (
            <div className="text-white text-center p-4">{errorMsg}</div>
          )}
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
