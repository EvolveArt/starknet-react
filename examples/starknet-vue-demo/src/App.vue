<template>
  <main class="app">
    <h1>starknet-vue demo</h1>

    <section class="card">
      <h2>Connection</h2>
      <p>
        <strong>Status:</strong>
        <span v-if="account.isConnected">Connected</span>
        <span v-else>Disconnected</span>
      </p>
      <p><strong>Address:</strong> {{ account.address ?? "—" }}</p>
      <p><strong>Chain:</strong> {{ network.chain.name }}</p>

      <div v-if="availableConnectors.length" class="connectors">
        <button
          v-for="connector in availableConnectors"
          :key="connector.id"
          @click="() => connect(connector)"
          :disabled="account.isConnected && connector.id === account.connector?.id"
        >
          {{ connector.name }}
        </button>
      </div>
      <p v-else class="hint">
        No wallet detected. Install a supported Starknet wallet or enable one in your browser.
      </p>

      <div class="actions">
        <button @click="disconnect" :disabled="account.isDisconnected">
          Disconnect
        </button>
      </div>
    </section>

    <section v-if="account.isConnected" class="card">
      <h2>Balances</h2>

      <div class="balance-grid">
        <div class="balance-item">
          <p class="balance-label">Native Token ({{ network.chain.nativeCurrency.symbol }})</p>
          <p v-if="nativeBalance.isPending.value" class="balance-value loading">Loading...</p>
          <p v-else-if="nativeBalance.isError.value" class="balance-value error">Error loading balance</p>
          <p v-else-if="nativeBalance.data.value" class="balance-value">
            {{ nativeBalance.data.value.formatted }} {{ nativeBalance.data.value.symbol }}
          </p>
          <p v-else class="balance-value">—</p>
        </div>

        <div class="balance-item">
          <p class="balance-label">USDC Balance</p>
          <p v-if="usdcBalance.isPending.value" class="balance-value loading">Loading...</p>
          <p v-else-if="usdcBalance.isError.value" class="balance-value error">Error loading balance</p>
          <p v-else-if="usdcBalance.data.value" class="balance-value">
            {{ usdcBalance.data.value.formatted }} {{ usdcBalance.data.value.symbol }}
          </p>
          <p v-else class="balance-value">—</p>
        </div>
      </div>
    </section>

    <section v-if="account.isConnected" class="card">
      <h2>Approve USDC</h2>
      <p class="hint">Approve 1 USDC to vault on {{ network.chain.name }}</p>

      <div class="tx-info">
        <p v-if="txData"><strong>Transaction Hash:</strong> {{ txData.transaction_hash }}</p>
        <p v-if="txIsPending" class="status pending">⏳ Transaction pending...</p>
        <p v-if="txIsError" class="status error">❌ Error: {{ txError?.message }}</p>
      </div>

      <div class="actions">
        <button @click="approveUSDC" :disabled="txIsPending || !account.isConnected">
          {{ txIsPending ? 'Approving...' : 'Approve USDC' }}
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import {
  braavos,
  ready,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useInjectedConnectors,
  useNetwork,
  useSendTransaction,
} from "starknet-vue";
import { type Abi, cairo } from "starknet";

const account = useAccount();
const network = useNetwork();
const { connectors } = useInjectedConnectors({
    recommended: [ready(), braavos()],
    includeRecommended: "always",
    order: "alphabetical",
  });
const { connectAsync } = useConnect();
const { disconnectAsync } = useDisconnect();

const availableConnectors = computed(() => connectors);

const connect = (connector = availableConnectors.value[0]) => {
  if (!connector) return;
  connectAsync({ connector }).catch((err) => console.error("Connect failed", err));
};

const disconnect = () => {
  disconnectAsync().catch((err) => console.error("Disconnect failed", err));
};

// Balances
const nativeBalance = useBalance({
  address: () => account.address,
  watch: true,
  enabled: () => !!account.address,
});

const USDC_ADDRESS = "0x053C91253BC9682c04929cA02ED00b3E423f6710D2ee7e0D5EBB06F3eCF368A8";

const usdcBalance = useBalance({
  address: () => account.address,
  token: USDC_ADDRESS,
  watch: true,
  enabled: () => !!account.address,
});

// Debug
watch(() => account.address, (newAddr) => {
  console.log("Account address changed:", newAddr);
  console.log("Native balance enabled:", !!newAddr);
  console.log("Native balance isLoading:", nativeBalance.isLoading);
  console.log("Native balance isPending:", nativeBalance.isPending);
  console.log("Native balance isSuccess:", nativeBalance.isSuccess);
  console.log("Native balance data:", nativeBalance.data);
  console.log("Native balance data value:", nativeBalance.data?.value);
}, { immediate: true });

// USDC Approve
const VAULT_ADDRESS = "0x040e346ed730df66b602892db0d412af32c09a5625e77067a3dc390481cf89eb";

const {
  sendAsync,
  data: txData,
  isPending: txIsPending,
  isError: txIsError,
  error: txError
} = useSendTransaction({});

const approveUSDC = async () => {
  if (!account.address) return;

  const amount = cairo.uint256(1_000_000n); // 1 USDC (6 decimals)

  const approveCall = [{
    contractAddress: USDC_ADDRESS,
    entrypoint: "approve",
    calldata: [
      VAULT_ADDRESS,
      amount.low,
      amount.high,
    ],
  }];

  try {
    const result = await sendAsync(approveCall);
    console.log("Transaction sent successfully:", result);
  } catch (err) {
    console.error("Failed to send transaction:", err);
  }
};
</script>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  min-height: 100vh;
  padding: 2rem;
  background: #0f111a;
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  min-width: 320px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}

h1 {
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #81e6d9;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

p {
  margin: 0.25rem 0;
}

.connectors {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1rem 0;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

button {
  flex: 1 1 140px;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  background: rgba(255, 255, 255, 0.1);
  color: #f5f5f5;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  transform: translateY(-1px);
}

.hint {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.tx-info {
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-size: 0.9rem;
  word-break: break-all;
}

.status {
  font-weight: 600;
  margin-top: 0.5rem;
}

.status.pending {
  color: #fbbf24;
}

.status.error {
  color: #f87171;
}

.balance-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.balance-item {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.balance-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}

.balance-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #81e6d9;
}

.balance-value.loading {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.balance-value.error {
  color: #f87171;
  font-size: 0.9rem;
}
</style>
