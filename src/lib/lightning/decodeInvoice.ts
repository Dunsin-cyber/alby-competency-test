"use server";

import bolt11 from "bolt11";

export const decodeInvoice = async (invoice: string) => {
  try {
    const decoded = bolt11.decode(invoice);

    // Convert to a plain serializable object
    const result = {
      millisatoshis: decoded.millisatoshis,
      satoshis: decoded.satoshis,
      network: decoded.network,
      paymentRequest: decoded.paymentRequest,
      payeeNodeKey: decoded.payeeNodeKey,
      timeExpireDate: decoded.timeExpireDate,
      timestamp: decoded.timestamp,
      tags: decoded.tags.map((tag) => ({
        tagName: tag.tagName,
        data: tag.data,
      })),
    };

    return result;
  } catch (err) {
    console.error("Invalid BOLT11 invoice:", err);
    return null;
  }
};
