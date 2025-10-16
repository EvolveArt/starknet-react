import type { Address, Chain } from "starknet-vue-chains";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import {
  type BlockNumber,
  BlockTag,
  type CallOptions,
  num,
  shortString,
} from "starknet";
import { formatUnits } from "viem";

import { type UseQueryProps, type UseQueryResult, useQuery } from "../query";

import { type StarknetTypedContract, useContract } from "./use-contract";
import { useInvalidateOnBlock } from "./use-invalidate-on-block";
import { useNetwork } from "./use-network";

const DEFAULT_FETCH_INTERVAL = 5_000;

export type Balance = {
  decimals: number;
  symbol: string;
  formatted: string;
  value: bigint;
};

export type UseBalanceProps = {
  /** The contract's address. Defaults to the native currency. */
  token?: MaybeRefOrGetter<Address | undefined>;
  /** The address to fetch balance for. */
  address?: MaybeRefOrGetter<Address | undefined>;
  /** Whether to watch for changes. */
  watch?: boolean;
  /** Block identifier used when performing call. */
  blockIdentifier?: BlockNumber;
  /** Whether the query is enabled. */
  enabled?: MaybeRefOrGetter<boolean>;
  /** Refetch interval in milliseconds. */
  refetchInterval?: number;
};

export type UseBalanceResult = UseQueryResult<Balance, Error | null>;

type TAbi = typeof balanceABIFragment;
type Contract = StarknetTypedContract<TAbi>;

/**
 * Fetch the balance for the provided address and token.
 *
 * If no token is provided, the native currency is used.
 */
export function useBalance({
  token: token_,
  address: address_,
  refetchInterval: refetchInterval_,
  watch = false,
  enabled: enabled_ = true,
  blockIdentifier = BlockTag.LATEST,
}: UseBalanceProps = {}) {
  const { chain } = useNetwork();

  const address = computed(() => toValue(address_));
  // Only fallback to native currency if token parameter was not provided at all
  const tokenWasProvided = arguments.length > 0 && 'token' in arguments[0];
  const token = computed(() => {
    const tokenValue = toValue(token_);
    if (tokenValue !== undefined) return tokenValue;
    return tokenWasProvided ? undefined : chain.nativeCurrency.address;
  });

  const { contract } = useContract({
    abi: balanceABIFragment,
    address: token.value,
  });

  const queryKey_ = computed(() =>
    queryKey({ chain, token: token.value, address: address.value, blockIdentifier }),
  );

  const enabled = computed(
    () => Boolean(toValue(enabled_) && contract && address.value),
  );

  const refetchInterval =
    refetchInterval_ ??
    (blockIdentifier === BlockTag.PRE_CONFIRMED && watch
      ? DEFAULT_FETCH_INTERVAL
      : undefined);

  useInvalidateOnBlock({
    enabled: Boolean(enabled.value && watch),
    queryKey: queryKey_.value,
  });

  return useQuery({
    enabled,
    refetchInterval,
    queryKey: queryKey_,
    queryFn: () => {
      const addr = address.value;
      const cntr = contract;

      if (!addr) throw new Error("address is required");
      if (!cntr) throw new Error("contract is required");

      return fetchBalance({ chain, contract: cntr, token: token.value, address: addr, blockIdentifier });
    },
  });
}

function queryKey({
  chain,
  token,
  address,
  blockIdentifier,
}: {
  chain: Chain;
  token?: string;
  address?: string;
  blockIdentifier?: BlockNumber;
}) {
  return [
    {
      entity: "balance",
      chainId: chain?.name,
      token,
      address,
      blockIdentifier,
    },
  ] as const;
}

async function fetchBalance({
  chain,
  token,
  address,
  contract,
  blockIdentifier,
}: {
  chain: Chain;
  token?: string;
  address: string;
  contract: Contract;
  blockIdentifier?: BlockNumber;
}): Promise<Balance> {
  const options: CallOptions = {
    blockIdentifier,
  };

  const isNativeCurrency = token === chain.nativeCurrency.address;

  let symbol = chain.nativeCurrency.symbol;
  if (!isNativeCurrency) {
    const symbol_ = await contract.withOptions(options).symbol();
    symbol = shortString.decodeShortString(num.toHex(symbol_));
  }

  let decimals = chain.nativeCurrency.decimals;
  if (!isNativeCurrency) {
    const decimals_ = await contract.withOptions(options).decimals();
    decimals = Number(decimals_);
  }

  const balanceOf = (await contract
    .withOptions(options)
    .balanceOf(address)) as bigint;

  const formatted = formatUnits(balanceOf, decimals);

  return {
    value: balanceOf,
    decimals: decimals,
    symbol: symbol,
    formatted: formatted,
  };
}

const balanceABIFragment = [
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "balanceOf",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "symbol",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::felt252",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "decimals",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u8",
      },
    ],
    state_mutability: "view",
  },
] as const;
