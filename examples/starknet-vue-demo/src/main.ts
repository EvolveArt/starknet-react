import { createApp } from "vue";
import { QueryClient } from "@tanstack/vue-query";
import { createStarknetVue, braavos, ready, injected, scanObjectForWallets } from "starknet-vue";
import { mainnet } from "starknet-vue-chains";
import { publicProvider } from "starknet-vue-chains/providers";

import App from "./App.vue";

const queryClient = new QueryClient();

// Create connectors
const recommendedConnectors = [ready(), braavos()];
const injectedWallets = scanObjectForWallets(globalThis as any);
const injectedConnectors = injectedWallets.map(wallet => injected({ id: wallet.id }));
const allConnectors = [
  ...recommendedConnectors,
  ...injectedConnectors.filter(c => !recommendedConnectors.find(r => r.id === c.id))
].sort((a, b) => a.id.localeCompare(b.id));

const starknet = createStarknetVue({
  chains: [mainnet],
  provider: publicProvider(),
  queryClient,
  connectors: allConnectors,
  autoConnect: true,
});

const app = createApp(App);
app.use(starknet);
app.mount("#app");
