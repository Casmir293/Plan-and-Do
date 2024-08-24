import "./assets/main.css";

// Pinia
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/**
 * NOTE TO ADD VUETIFY ICON
 * Terminal-- npm install @mdi/font
 * main.js-- import "@mdi/font/css/materialdesignicons.css";
 * add this line in the vuetify object--  
 icons: {
    defaultSet: "mdi",
  },
 */

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vue Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(Toast);

app.mount("#app");
