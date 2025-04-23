import { NextRequest } from "next/server";
import { decode } from "bolt11";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lnAddress = searchParams.get("lnAddress");
  const amount = searchParams.get("amount"); // in sats

  if (!lnAddress || !amount) {
    return new Response(
      JSON.stringify({ error: "Missing lnAddress or amount" }),
      {
        status: 400,
      }
    );
  }

  try {
    const [name, domain] = lnAddress.split("@");
    const lnurlpUrl = `https://${domain}/.well-known/lnurlp/${name}`;

    const lnurlRes = await fetch(lnurlpUrl);
    if (!lnurlRes.ok) throw new Error("Failed to resolve LNURLp");

    const lnurlData = await lnurlRes.json();
    const callback = lnurlData.callback;
    const minSendable = lnurlData.minSendable;
    const maxSendable = lnurlData.maxSendable;

    const msats = parseInt(amount) * 1000;

    if (msats < minSendable || msats > maxSendable) {
      return new Response(
        JSON.stringify({ error: "Amount out of range for recipient" }),
        {
          status: 400,
        }
      );
    }

    const invoiceRes = await fetch(`${callback}?amount=${msats}`);
    const invoiceData = await invoiceRes.json();
    if (invoiceData.status === "ERROR") throw new Error(invoiceData.reason);

    const decoded = decode(invoiceData.pr);

    return new Response(
      JSON.stringify({
        invoice: invoiceData.pr,
        description:
          invoiceData.description ||
          decoded.tags.find((t) => t.tagName === "description")?.data,
        amount: msats / 1000,
        expiry: decoded.timeExpireDate,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Invoice generation error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
