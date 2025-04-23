"use client";
import Scanner from "@/components/QrCode/Scanner";
import Converter from "@/components/Receive/Converter";
import { useClient } from "@/context/index";
import { useRouter } from "@/hooks/useRouterWithProgress";
import { isLightningAddress } from "@/lib/webln";
import { ArrowLeftOutlined, ScanOutlined } from "@ant-design/icons";
import { requestProvider } from "@getalby/bitcoin-connect";
import { Button, Input, Result, Steps } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

function Payment() {
  const {
    progressBarStep,
    setProgressBarStep,
    setOpenScanner,
    address,
    setAddress,
    steps,
    setSteps,
    invoiceSats,
  } = useClient();
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!address) {
        toast.error("Please enter a valid address!");
        return;
      }

      if (!invoiceSats) {
        toast.error("Please enter a valid amount!");
        return;
      }
      // Check if the address is a valid Lightning Address or Bolt11 Invoice
      if (!isLightningAddress(address)) {
        toast.error("Invalid Lightning Address");
        return;
      }

      const params = {
        destination: address,
        amount: invoiceSats,
      };
      const provider = await requestProvider();
      if (!provider) {
        throw new Error("No WebLN provider found");
      }
      const keysendPay = await provider.keysend(params);
      console.log(keysendPay);
      setSteps(1);
      setProgressBarStep(1);
    } catch (err) {
      console.log(err);
      setProgressBarStep(1);
      setSteps(2);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 gap-5 w-full max-w-md md:max-w-3xl mx-auto">
      <div className="flex items-center justify-between w-full my-4">
        <ArrowLeftOutlined onClick={() => router("/back")} />
        <h1 className="text-2xl font-bold text-center">
          Make Payment{" "}
          <span className="text-xs align-middle ml-2">(keysend)</span>
        </h1>{" "}
        <Scanner />
        <ScanOutlined
          twoToneColor="#52c41a"
          onClick={() => setOpenScanner(true)}
        />
      </div>
      {steps === 0 && (
        <div className="flex flex-col space-y-1 w-full">
          <Steps
            direction="horizontal"
            current={progressBarStep}
            items={[
              {
                title: "LN Address and amount",
                description: "paste recepients LN address here",
              },
              {
                title: "Status",
                description: "Failure or Success",
              },
            ]}
          />
          <Input
            placeholder="paste your invoice or LN address here"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              // console.log(e);
            }}
            className="w-full"
          />
          <Converter />
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
      )}
      {steps > 0 && (
        <div className="flex flex-col items-center w-full gap-5">
          <Screens steps={steps} />
          <Button
            onClick={() => {
              setSteps(0);
            }}
            disabled={paying}
            type="primary"
            className="mt-8 w-full"
          >
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}

export default Payment;

function Screens({ steps }: { steps: number }) {
  switch (steps) {
    case 1:
      return <PaymentSuccess />;
    case 2:
      return <PaymentError />;
    default:
      return <p>Unknown status</p>;
  }
}

function PaymentSuccess() {
  const { invoiceSats } = useClient();

  return (
    <Result
      status="success"
      title="Successfully Made Payment"
      subTitle={`you paid ${invoiceSats.toLocaleString()} sats`}
    />
  );
}

function PaymentError() {
  return <Result status="warning" title="Payment Failed" />;
}
