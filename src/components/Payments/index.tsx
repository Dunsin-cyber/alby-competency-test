"use client";
import { initWebLN } from "@/lib/webln";
import { Button, Input } from "antd";
// import { isLightningAddress } from "lnurl";
import { useState } from "react";
import toast from "react-hot-toast";

function Payment() {
  const [address, setAddress] = useState("");

  const handlePayment = async () => {
    // if (!isLightningAddress(address)) {
    //   toast.error("Invalid Lightning Address!");
    //   return;
    // }

    try {
      const webln = await initWebLN();
     const payment = await webln.sendPayment(address);
     console.log(payment)
      toast.success("Payment sent!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 space-y-8 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">Make Payment</h1>
      <Input placeholder="LNURL here" className="w-full" />
      <Button onClick={() => handlePayment()} type="primary" className="w-full">
        Continue
      </Button>
    </div>
  );
}

export default Payment;
