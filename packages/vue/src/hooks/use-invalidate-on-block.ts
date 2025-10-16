import { type QueryKey, useQueryClient } from "@tanstack/vue-query";
import { ref, watch } from "vue";

import { useBlockNumber } from "./use-block-number";

/**
 * Invalidate the given query on every new block.
 */
export function useInvalidateOnBlock({
  enabled = true,
  queryKey,
}: {
  enabled?: boolean;
  queryKey: QueryKey;
}) {
  const queryClient = useQueryClient();

  const prevBlockNumber = ref<number | undefined>();

  const { data: blockNumber } = useBlockNumber({
    enabled,
  });

  watch(blockNumber, (newBlockNumber) => {
    if (!prevBlockNumber.value) {
      prevBlockNumber.value = newBlockNumber;
      return;
    }

    if (newBlockNumber !== prevBlockNumber.value) {
      queryClient.invalidateQueries({ queryKey }, { cancelRefetch: false });
      prevBlockNumber.value = newBlockNumber;
    }
  });
}
