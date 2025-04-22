"use server";

import bolt11 from "bolt11";

export const decodeInvoice =  async(invoice: string) => {
  try {
    const decoded =  bolt11.decode(invoice);
    return decoded;
  } catch (err) {
    console.error("Invalid BOLT11 invoice:", err);
    return null;
  }
};
