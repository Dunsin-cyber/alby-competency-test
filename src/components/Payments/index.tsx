"use client";
import Scanner from "@/components/QrCode/Scanner";
import { useClient } from "@/context/index";
import { useRouter } from "@/hooks/useRouterWithProgress";
import { decodeInvoice } from "@/lib/lightning/decodeInvoice";
import { isBolt11Invoice, isLightningAddress } from "@/lib/webln";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ScanOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Input, Result, Steps, Typography } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

const { Paragraph, Text } = Typography;

const description = "payment with WebLN provider";

function Payment() {
  const [payToInvoice, setPayToInvoice] = useState(true);
  const { currentStep, setCurrentStep, setOpenScanner, address, setAddress } = useClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        <h1 className="text-2xl font-bold text-center">Make Payment</h1>
        <Scanner />
        <ScanOutlined
          twoToneColor="#52c41a"
          onClick={() => setOpenScanner(true)}
        />
      </div>
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
      {!payToInvoice && (
        <Input placeholder="how many sats" className="w-full" />
      )}
      {/* {payToInvoice && <PaymentPreview />} */}
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

function PaymentPreview() {
  // get details from redux state
  return (
    <Result
      icon={<SmileOutlined />}
      title="30,000 sats"
      subTitle="you are about to pay the above amount for bread"
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            This transaction:
          </Text>
        </Paragraph>
        <Paragraph>
          <CheckCircleOutlined className="site-result-demo-success-icon" /> will
          expire in 20 minutes
        </Paragraph>
        <Paragraph>
          <CheckCircleOutlined className="site-result-demo-success-icon" /> has
          a payment hash of : temp1p5qwz9upp5frn2ewcm48...
        </Paragraph>
      </div>
    </Result>
  );
}

function PaymentSuccess() {
  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
  );
}

function PaymentError() {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  );
}
