"use client";
import React from "react";
import { useRouter } from "@/hooks/useRouterWithProgress";
import { useWebLN } from "@/webln/provider";
import { Button } from "antd";
import toast from "react-hot-toast";
import Transactions from "../Transactions";

function Wallet() {
  const router = useRouter();
  const { enable, isLoading, balance } = useWebLN();

  return (
    <div className="flex flex-col justify-center items-center py-8">
      {/* balance */}
      <h1 className="text-2xl font-bold">Wallet</h1>
      {typeof balance === "number" ? (
        <div className="flex space-x-3  items-center justify-center p-4 rounded-md ">
          <p className="text-5xl font-bold text-green-600">{balance}</p>
          <p className="text-lg text-green-600">sats</p>
        </div>
      ) : (
        <Button
          onClick={enable}
          disabled={isLoading}
          loading={isLoading}
          className="bg-slate-950 text-white rounded-full px-4 py-2 my-3"
        >
          Connect Wallet
        </Button>
      )}
      {/* action buttons */}
      <div className="flex space-x-4 my-8">
        <button
          onClick={() => router("/make-payment")}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Send Sats
          </span>
        </button>
        <button
          onClick={() => router("/receive")}
          className="cursor-pointer shadow-[inset_0_0_0_2px_#616467] text-black px-6 py-3 rounded-full tracking-widest font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
        >
          Recieve
        </button>
      </div>

      {/* transactions */}
      <div className="flex flex-col justify-center items-center space-y-3">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-sm text-gray-500">
          No transactions yet. 
          Send or receive some sats to see them here.
        </p>
        {/* <Transactions /> */}
      </div>
      {/* <FloatingDock
        items={links}
        className="fixed bottom-4 left-0 right-0 z-50"
      /> */}
    </div>
  );
}

export default Wallet;
