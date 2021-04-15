/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-18 19:38:38
 * @LastEditTime: 2021-04-15 13:22:10
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import api from "./api";
import * as utils from "./utils";
import someui from "./someui";
import "./assets/style/common.less";

const app = createApp(App);
app.config.globalProperties.$api = api;
app.config.globalProperties.$utils = utils;
someui(app);

app.use(router).use(store).mount("#app");
