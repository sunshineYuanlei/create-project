import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import i18n from './language'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(store);
app.use(i18n);
app.use(ElementPlus);
app.mount("#app");
