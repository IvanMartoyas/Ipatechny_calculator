import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from '@/store/store.js';

createApp(App).use(store).use(router).mount('#app');

//styles...............
import './assets/css/main.css';
import './assets/css/table.css';





