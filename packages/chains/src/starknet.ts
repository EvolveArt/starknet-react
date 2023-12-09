import { Chain } from "./types";

// Starknet chain ids are generated as follows:
//
// 1. Take the name of the network as string (SN_MAIN, SN_GOERLI, SN_GOERLI2).
// 2. Encode it as Starknet short string.
//
// For example, `encodeShortString('SN_MAIN')` returns `0x535f4d41494e`, which
// is the chain id.

export const mainnet = {
  id: BigInt("0x534e5f4d41494e"),
  network: "mainnet",
  name: "Starknet",
  nativeCurrency: {
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },

  rpcUrls: {
    alchemy: {
      http: ["https://starknet-mainnet.g.alchemy.com/v2"],
    },
    blast: {
      http: ["https://starknet-mainnet.blastapi.io"],
    },
    infura: {
      http: ["https://starknet-mainnet.infura.io/v3"],
    },
    lava: {
      http: ["https://g.w.lavanet.xyz:443/gateway/strk/rpc-http"],
    },
    nethermind: {
      http: ["https://rpc.nethermind.io/mainnet-juno"],
    },
    default: {
      http: [],
    },
    public: {
      http: ["https://rpc.starknet.lava.build"],
    },
  },
  explorers: {
    starkCompass: ["https://www.starkcompass.com"],
    starkscan: ["https://starkscan.co"],
    viewblock: ["https://viewblock.io/starknet"],
    voyager: ["https://voyager.online"],
  },
} as const satisfies Chain;

export const goerli = {
  id: BigInt("0x534e5f474f45524c49"),
  network: "goerli",
  name: "Starknet Testnet",
  nativeCurrency: {
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  testnet: true,
  rpcUrls: {
    alchemy: {
      http: ["https://starknet-goerli.g.alchemy.com/v2"],
    },
    blast: {
      http: ["https://starknet-testnet.blastapi.io"],
    },
    infura: {
      http: ["https://starknet-goerli.infura.io/v3"],
    },
    lava: {
      http: ["https://g.w.lavanet.xyz:443/gateway/strkt/rpc-http"],
    },
    nethermind: {
      http: ["https://rpc.nethermind.io/goerli-juno"],
    },
    default: {
      http: [],
    },
    public: {
      http: ["https://rpc.starknet-testnet.lava.build"],
    },
  },
  explorers: {
    starkCompass: ["https://www.starkcompass.com/testnet"],
    starkscan: ["https://testnet.starkscan.co"],
    voyager: ["https://goerli.voyager.online"],
    viewblock: ["https://viewblock.io/starknet"],
  },
} as const satisfies Chain;
