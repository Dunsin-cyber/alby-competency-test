

export const isLightningAddress = (input: string) =>
  /^[^@]+@[^@]+\.[^@]+$/.test(input);


export const isBolt11Invoice = (input: string) =>
  /^ln(bc|tb|bcrt)[0-9]{1,}[a-z0-9]+$/.test(input.toLowerCase());
