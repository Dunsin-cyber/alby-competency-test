"use client";
import { requestProvider } from "@getalby/bitcoin-connect";
import React, { createContext, useContext, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { addWallet } from "@/redux/slice/WalletSlice"; 


type WebLNContextType = {
  webln: any;
  isLoading: boolean;
  error: string | null;
  enable: () => Promise<void>;
  disconnect: () => void;
  getInfo: () => any;
  sendPayment: (invoice: string) => Promise<void>;
  makeInvoice: (amount: number, description: string) => Promise<string>;
  getBalance: any;
  balance: number | null;
};

const WebLNContext = createContext<WebLNContextType | undefined>(undefined);

export function WebLNProvider({ children }: { children: React.ReactNode }) {
  const [webln, setWebln] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
   const dispatch = useAppDispatch();

  const enable = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const provider = await requestProvider();

      if (!provider) {
        throw new Error("No WebLN provider found");
      }

      await provider.enable();
      setWebln(provider);

      await getBalance();
      const info = await getInfo();
       dispatch(addWallet(info));
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

  // const keySendPayment = async () => {}

  const sendPayment = async (invoice: string) => {
    if (!webln) {
      setError("WebLN not enabled");
      return;
    }
    try {
      return await webln.sendPayment(invoice);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      throw err;
    }
  };

  const getBalance = async () => {
    if (!webln) {
      setError("WebLN not enabled");
      return;
    }
    try {
      const bb = await webln.getBalance();
      console.log("balance", bb);
      setBalance(bb.balance);
      return bb;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      throw err;
    }
  };

  const makeInvoice = async (amount: number, description: string) => {
    if (!webln) {
      setError("WebLN not enabled");
      throw new Error("WebLN not enabled");
    }
    try {
      const args = {
        amount: amount,
        defaultMemo: description,
      };
      const invoice = await webln.makeInvoice(args);
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
    getBalance,
    balance,
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
