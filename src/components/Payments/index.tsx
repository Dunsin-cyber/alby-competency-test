"use client";
import Scanner from "@/components/QrCode/Scanner";
import { useClient } from "@/context/index";
import { useRouter } from "@/hooks/useRouterWithProgress";
import { decodeInvoice } from "@/lib/lightning/decodeInvoice";
import { isBolt11Invoice, isLightningAddress } from "@/lib/webln";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addInvoice } from "@/redux/slice/InvoiceSlice";
import { InvoiceDetails } from "@/redux/types";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ScanOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Input, Result, Steps, Typography } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import {getTimeLeftString} from "@/lib/timeLeft";

const { Paragraph, Text } = Typography;

const description = "payment with WebLN provider";

function Payment() {
  const [payToInvoice, setPayToInvoice] = useState(true);
  const {
    currentStep,
    setCurrentStep,
    setOpenScanner,
    address,
    setAddress,
    steps,
    setSteps,
  } = useClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [decodedResults, setDecodedResults] = useState([]);

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
        const params: InvoiceDetails = {
          millisatoshis: decodedInvoice.millisatoshis,
          satoshis: decodedInvoice.satoshis,
          description: decodedInvoice.tags[1].data as string,
          hash: decodedInvoice.tags[0].data as string,
          timeLeft: decodedInvoice.timeExpireDate,
        };
        dispatch(addInvoice(params));
        setPayToInvoice(true);
        setSteps(1);
        setCurrentStep(1);
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

  //

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
      {steps === 0 && (
        <div className="flex flex-col space-y-1 w-full">
          <Steps
            direction="horizontal"
            current={currentStep}
            items={
              payToInvoice
                ? [
                    {
                      title: "Address / Invoice",
                      description: "paste your invoice or LN address here",
                    },
                    {
                      title: "Preview",
                      description,
                    },
                  ]
                : [
                    {
                      title: "LN Address",
                      description: "paste your invoice or LN address here",
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
            placeholder="paste your invoice or LN address here"
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
      )}
      {steps > 0 && (
        <div className="flex flex-col items-center w-full gap-5">
          <Screens steps={steps} />
          <Button
            onClick={() => {
              setSteps((prev) => prev - 1);
            }}
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
      return <PaymentPreview />;
    case 2:
      return <PaymentSuccess />;
    case 3:
      return <PaymentError />;
    default:
      return <p>Unknown status</p>;
  }
}

function PaymentPreview() {
  const invoice = useAppSelector((state) => state.invoice);
  return (
    <Result
      icon={<SmileOutlined />}
      title={`${invoice?.satoshis.toLocaleString()} sats`}
      subTitle={`you are about to pay the above amount for ${invoice?.description}`}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            This transaction has:
          </Text>
        </Paragraph>
        <Paragraph>
          <CheckCircleOutlined className="site-result-demo-success-icon" />  
            {" " + getTimeLeftString(invoice?.timeLeft)} to expire
        </Paragraph>
        <Paragraph>
          <CheckCircleOutlined className="site-result-demo-success-icon" /> 
            {" "}   a payment hash of : {invoice?.hash.slice(0, 20)}...
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
