import { createApp } from 'vue';
import App from './App.vue';

import router from './router';


import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .mount("#app");