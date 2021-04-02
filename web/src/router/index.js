/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-18 19:38:38
 * @LastEditTime: 2021-03-24 15:37:37
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\router\index.js
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/project/:pid",
    component: () => import("../views/project"),
    children: [
      {
        path: "interface/:iid",
        component: () => import("../views/interface"),
      },
    ],
  },
  {
    path: "/setting",
    component: () => import("../views/Setting.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
