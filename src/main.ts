import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

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

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
