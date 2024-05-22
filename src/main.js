import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import pinia from "@/store/index.js";
import vuexx from "@/store/vuex/index.js";
import * as echarts from "echarts";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.config.globalProperties.getEnv = import.meta.env;
//全局挂载echarts
app.config.globalProperties.$echarts = echarts;
app.use(ElementPlus).use(router).use(pinia).use(vuexx).use(echarts);
app.mount("#app");
