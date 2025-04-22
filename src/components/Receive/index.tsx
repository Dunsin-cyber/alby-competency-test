"use client";
import { useRouter } from "@/hooks/useRouterWithProgress";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Input, QRCode, Typography, theme } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Converter from "./Converter";

const { Paragraph, Text } = Typography;

function Recieve() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [generated, setGenerated] = useState<boolean>(false);

  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [sats, setSats] = useState<number | string>("");
  const [fiat, setFiat] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      const data = await res.json();
      setBtcPrice(data.bitcoin.usd);
    };
    fetchPrice();
  }, []);

  const handleSatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSats(value);
    if (btcPrice && !isNaN(+value)) {
      setFiat(((+value / 100000000) * btcPrice).toFixed(2));
    } else {
      setFiat("");
    }
  };

  const handleFiatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFiat(value);
    if (btcPrice && !isNaN(+value)) {
      setSats(((+value / btcPrice) * 100000000).toFixed(0));
    } else {
      setSats("");
    }
  };

  return (
    <div className="flex flex-col items-center py-8 gap-5 w-full max-w-md md:max-w-3xl mx-auto">
      <div className="flex items-center justify-between w-full my-4">
        <ArrowLeftOutlined onClick={() => router("/back")} />
        <h1 className="text-2xl font-bold text-center">Generate Invoice</h1>
        <div />
      </div>
      {!generated ? (
        <div className="flex flex-col items-center w-full gap-5">
          <div className="flex flex-col font-bold space-y-1 w-full">
            {/* <p>Amount</p>
            <Input
              placeholder="Amount in Satoshi..."
              value={sats}
              onChange={(e) => {
                setSats(e.target.value);
              }}
              className="w-full"
            /> */}
            <Converter/>
          </div>
          <div className="flex flex-col font-bold space-y-1 w-full">
            <p>Description</p>
            <Input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description"
              className="w-full"
            />
          </div>
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
