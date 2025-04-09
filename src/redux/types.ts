
export interface UserDetails {
    email: string;
    id: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}


export interface TokenDetail {
    address: `0x${string}`;
    name: string;
    symbol: string;
    price: string;
}

export interface Token {
    token1: TokenDetail
    token2: TokenDetail
}



