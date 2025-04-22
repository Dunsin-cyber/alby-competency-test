"use client";
import { useClient } from "@/context/index";
import { useRouter } from "@/hooks/useRouterWithProgress";
import { decodeInvoice } from "@/lib/lightning/decodeInvoice";
import { isBolt11Invoice, isLightningAddress } from "@/lib/webln";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Input, QRCode, Typography, theme } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

const { Paragraph, Text } = Typography;

const description = "payment with WebLN provider";

function Recieve() {
  const [payToInvoice, setPayToInvoice] = useState(true);
  const { currentStep, setCurrentStep, setOpenScanner, address, setAddress } =
    useClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [generated, setGenerated] = useState(false);

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

  const [decodedResults, setDecodedResults] = useState([]);
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  return (
    // <Scanner/>
    <div className="flex flex-col items-center py-8 gap-5 w-full max-w-md md:max-w-3xl mx-auto">
      <div className="flex items-center justify-between w-full my-4">
        <ArrowLeftOutlined onClick={() => router("/back")} />
        <h1 className="text-2xl font-bold text-center">Generate Invoice</h1>
        <div />
      </div>
      {!generated ? (
        <div className="flex flex-col items-center w-full gap-5 w-full">
          <div className="flex flex-col font-bold space-y-1 w-full">
            <p>Amount</p>
            <Input
              placeholder="Amount in Satoshi..."
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                // console.log(e);
              }}
              className="w-full"
            />
          </div>
          <div className="flex flex-col font-bold space-y-1 w-full">
            <p>Description</p>
            <Input placeholder="Description" className="w-full" />
          </div>

          {/* {payToInvoice && <PaymentPreview />} */}
          <Button
            onClick={() => setGenerated(true)}
            disabled={loading}
            loading={loading}
            type="primary"
            className="mt-8 w-full"
          >
            Continue
          </Button>
        </div>
      ) : (
        <SuccessScreen />
      )}
    </div>
  );
}

export default Recieve;

const { useToken } = theme;

function SuccessScreen() {
  const { token } = useToken();
  const handleCopy = async () => {
    try {
      const link = `${window.location.origin}/pay-invoice/`;
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <QRCode
        size={250}
        value="https://ant.design/"
        color={token.colorSuccessText}
      />
      <Button type="primary" size="large" key="console" onClick={handleCopy}>
        Copy to Clipboard
      </Button>
      <Text>waiting for payment...</Text>
    </div>
  );
}
