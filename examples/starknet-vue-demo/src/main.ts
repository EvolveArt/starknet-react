import { createApp } from "vue";
import { QueryClient } from "@tanstack/vue-query";
import { createStarknetVue } from "starknet-vue";
import { mainnet } from "starknet-vue-chains";
import { publicProvider } from "starknet-vue-chains/providers";

import App from "./App.vue";

const queryClient = new QueryClient();

const starknet = createStarknetVue({
  chains: [mainnet],
  provider: publicProvider(),
  queryClient,
});

const app = createApp(App);
app.use(starknet);
app.mount("#app");
