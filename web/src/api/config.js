/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-02-04 13:43:04
 * @LastEditTime: 2021-03-19 10:23:09
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \mock-server\web\src\api\config.js
 */
const env = process.env.NODE_ENV;

const config = {
  development: {
    baseUrl: "http://127.0.0.1:8088",
  },
  production: {
    baseUrl: "https://api.ahh.yananart.cn",
  },
};

module.exports = config[env];
