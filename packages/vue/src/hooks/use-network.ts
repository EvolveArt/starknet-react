import type { Chain } from "starknet-vue-chains";

import { useStarknet } from "../context/starknet";

export interface UseNetworkResult {
  chain: Chain;
  chains: Chain[];
}

export function useNetwork(): UseNetworkResult {
  const { chain, chains } = useStarknet();
  return { chain, chains };
}
