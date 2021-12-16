import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import PrimeVue from "primevue/config";

const app = createApp(App);
app.use(store);
app.use(VueAxios, axios);
app.use(PrimeVue);
app.mount("#app");
