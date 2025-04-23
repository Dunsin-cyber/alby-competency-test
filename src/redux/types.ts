
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
}

export interface WalletDetails {
    id: string;
    name: string;
    balance: number;
}
