/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-31 14:22:12
 * @LastEditTime: 2021-03-31 15:42:52
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\store\index.js
 */

import { createStore } from "vuex";

import interfaceModule from "./modules/interface";

export default createStore({
  state: {},
  mutations: {},
  modules: {
    interfaceModule,
  },
});
