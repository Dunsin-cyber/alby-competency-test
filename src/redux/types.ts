
export interface UserDetails {
    email: string;
    id: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface InvoiceDetails {
    millisatoshis: string;
    satoshis: number;
    description: string;
    timeLeft: number;
    hash: string;
    lnurl: string
}

export interface WalletDetails {
  node: {
    alias?: string;
    pubkey?: string;
  };
  methods: string[];
  supports: string[];
  version: string;
}
