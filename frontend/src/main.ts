import { createApp } from 'vue';
import i18n from './i18n';
import router from './router';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';



import './style.css';
import App from './App.vue';

const app = createApp(App);

// Use plugin with optional defaults
app.use(VCalendar, {})

app.use(i18n);
app.use(router);
app.mount('#app');
