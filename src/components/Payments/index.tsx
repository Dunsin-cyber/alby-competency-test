"use client";
import { useClient } from "@/context/index";
import { decodeInvoice } from "@/lib/lightning/decodeInvoice";
import { isBolt11Invoice, isLightningAddress } from "@/lib/webln";
import { Button, Input, Steps } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
const description = "payment with WebLN provider";

function Payment() {
  const [address, setAddress] = useState("");
  const [payToInvoice, setPayToInvoice] = useState(true);
  const { currentStep, setCurrentStep } = useClient();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!address) {
        toast.error("Please enter a valid address!");
        return;
      }

      // Check if the address is a valid Lightning Address or Bolt11 Invoice
      if (isLightningAddress(address)) {
        setPayToInvoice(false);
      } else if (isBolt11Invoice(address)) {
        const decodedInvoice = await decodeInvoice(address);
        console.log(decodedInvoice);
        setPayToInvoice(true);
      } else {
        toast.error("Invalid Lightning Address or Bolt11 Invoice!");
        return;
      }

      // TODO use enable() first from webln provider
      setCurrentStep((prev) => prev + 1);

      // const payment = await webln.sendPayment(address);
      // console.log(payment);
      // toast.success("Payment sent!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
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
      <Input
        placeholder="LNURL here"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          // console.log(e);
        }}
        className="w-full"
      />

      <Input placeholder="how many sats" className="w-full" />

      <Button
        onClick={() => handlePayment()}
        disabled={loading}
        loading={loading}
        type="primary"
        className="mt-8 w-full"
      >
        Continue
      </Button>
    </div>
  );
}

export default Payment;
