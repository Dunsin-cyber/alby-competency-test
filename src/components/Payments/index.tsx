"use client";
import { initWebLN } from "@/lib/webln";
import { Button, Input, Steps } from "antd";
// import { isLightningAddress } from "lnurl";
import { useClient } from "@/context/index";
import { useState } from "react";
import toast from "react-hot-toast";

const description = "payment with WebLN provider";

function Payment() {
  const [address, setAddress] = useState("");
  const [payToInvoice, setPayToInvoice] = useState(true);
  const { currentStep, setCurrentStep } = useClient();

  const handlePayment = async () => {
    // if (!isLightningAddress(address)) {
    //   toast.error("Invalid Lightning Address!");
    //   return;
    // }
    setCurrentStep((prev) => prev + 1);
    setPayToInvoice(false);

    try {
      const webln = await initWebLN();
      const payment = await webln.sendPayment(address);
      console.log(payment);
      toast.success("Payment sent!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 gap-5 w-full max-w-md md:max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Make Payment</h1>
      <Steps
        direction="horizontal"
        current={currentStep}
        items={
          payToInvoice
            ? [
                {
                  title: "LN invoice",
                  description,
                },
                {
                  title: "Preview",
                  description,
                },
              ]
            : [
                {
                  title: "LN Address",
                  description,
                },
                {
                  title: "Amount in Sats",
                  description,
                },
                {
                  title: "Send Payment",
                  description,
                },
                {
                  title: "Preview",
                  description,
                },
              ]
        }
      />
      <Input placeholder="LNURL here" className="w-full" />

      <Input placeholder="how many sats" className="w-full" />

      <Button
        onClick={() => handlePayment()}
        type="primary"
        className="mt-8 w-full"
      >
        Continue
      </Button>
    </div>
  );
}

export default Payment;
