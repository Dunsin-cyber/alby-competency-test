"use client";

import React, { createContext, useContext, useState } from "react";
import { requestProvider } from "webln";
// import {
//   // Button,
//   // PayButton,
//   // init,
//   // launchModal,
//   // launchPaymentModal,
//   // closeModal,
//   requestProvider,
//   // typeof WebLNProvider as WebLNProviderType,
//   // WebLNProvider
//   // Connect,
//   // SendPayment,
// } from "@getalby/bitcoin-connect-react";
// import  type  {WebLNProviders} from "@getalby/bitcoin-connect-react";

type WebLNContextType = {
  webln: any;
  isLoading: boolean;
  error: string | null;
  enable: () => Promise<void>;
  disconnect: () => void;
  getInfo: () => any;
  sendPayment: (invoice: string) => Promise<void>;
  makeInvoice: (amount: number) => Promise<string>;
};

const WebLNContext = createContext<WebLNContextType | undefined>(undefined);

export function WebLNProvider({ children }: { children: React.ReactNode }) {
  const [webln, setWebln] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enable = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = await requestProvider();
      setWebln(provider);
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : "Failed to enable WebLN");
      setWebln(null);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setWebln(null);
    setError(null);
  };

  const getInfo = async () => {
    if (!webln) {
      setError("WebLN not enabled");
      return null;
    }
    try {
      return await webln.getInfo();
    } catch (err) {
      console.log("the error", err);
      setError(
        err instanceof Error ? err.message : "Failed to get wallet info"
      );
      return null;
    }
  };

  const sendPayment = async (invoice: string) => {
    if (!webln) {
      setError("WebLN not enabled");
      return;
    }
    try {
      await webln.sendPayment(invoice);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      throw err;
    }
  };

  //  const getBalance = async () => {
  //   if (!webln) {
  //     setError("WebLN not enabled");
  //     return;
  //   }
  //   try {
  //     return await webln.getBalance();
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Payment failed");
  //     throw err;
  //   }
  // };

  const makeInvoice = async (amount: number) => {
    if (!webln) {
      setError("WebLN not enabled");
      throw new Error("WebLN not enabled");
    }
    try {
      const invoice = await webln.makeInvoice(amount);
      return invoice.paymentRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invoice creation failed");
      throw err;
    }
  };

  const value = {
    webln,
    isLoading,
    error,
    enable,
    disconnect,
    getInfo,
    sendPayment,
    makeInvoice,
  };

  return (
    <WebLNContext.Provider value={value}>{children}</WebLNContext.Provider>
  );
}

export function useWebLN() {
  const context = useContext(WebLNContext);
  if (!context) {
    throw new Error("useWebLN must be used within a WebLNProvider");
  }
  return context;
}
