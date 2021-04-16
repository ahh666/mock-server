/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-18 19:42:36
 * @LastEditTime: 2021-04-16 11:01:24
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\vue.config.js
 */
const isProd = process.env.NODE_ENV === "production";
module.exports = {
  productionSourceMap: !isProd,
  devServer: {
    port: 8001,
  },
};
