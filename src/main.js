import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import moment from 'moment';
import 'moment-timezone';

const app = createApp(App);

app.config.globalProperties.$moment = moment;

app.use(Antd);

app.mount("#app");
