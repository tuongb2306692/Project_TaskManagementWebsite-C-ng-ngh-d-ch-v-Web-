import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {
    VueQueryPlugin,
    QueryClient,
} from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const pinia = createPinia();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: true,
            staleTime: 30000,
        },
    },
});

createApp(App)
    .use(pinia)
    .use(router)
    .use(VueQueryPlugin, { queryClient })
    .mount('#app');