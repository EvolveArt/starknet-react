import { type BlockNumber, BlockTag, type ProviderInterface } from "starknet";

import { useStarknet } from "../context/starknet";
import { type UseQueryResult, useQuery } from "../query";

/** Arguments for `useBlockNumber`. */
export type UseBlockNumberProps = {
  /** Identifier for the block to fetch. */
  blockIdentifier?: BlockNumber;
  /** Whether the query is enabled. */
  enabled?: boolean;
  /** Refetch interval in milliseconds. */
  refetchInterval?: number;
};

/** Value returned from `useBlockNumber`. */
export type UseBlockNumberResult = UseQueryResult<number | undefined, Error | null>;

/**
 * Hook for fetching the current block number.
 *
 * @remarks
 *
 * Control if and how often data is refreshed with `refetchInterval`.
 */
export function useBlockNumber({
  blockIdentifier = BlockTag.LATEST,
  enabled,
  refetchInterval,
}: UseBlockNumberProps = {}) {
  const { provider } = useStarknet();

  return useQuery({
    queryKey: queryKey({ blockIdentifier }),
    queryFn: queryFn({ provider, blockIdentifier }),
    enabled,
    refetchInterval,
  });
}

function queryKey({ blockIdentifier }: { blockIdentifier: BlockNumber }) {
  return [{ entity: "blockNumber", blockIdentifier }] as const;
}

function queryFn({
  provider,
  blockIdentifier,
}: {
  provider: ProviderInterface;
  blockIdentifier: BlockNumber;
}) {
  return async () => {
    const block = await provider.getBlock(blockIdentifier);
    if (block.status !== "PENDING") {
      return block.block_number;
    }
    return undefined;
  };
}
