export type TokenAddress = {
  found: true;
  address: string;
};

export type TransactionAddress = {
  found: false;
  address: string;
  owner: string;
  mint: string;
};

export type SplTokenAccountResult = TokenAddress | TransactionAddress;
