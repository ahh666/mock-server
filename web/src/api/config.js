/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-02-04 13:43:04
 * @LastEditTime: 2021-04-15 17:33:57
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\api\config.js
 */
const env = process.env.NODE_ENV;

const config = {
  development: {
    baseUrl: "http://127.0.0.1:8088",
  },
  production: {
    baseUrl: "http://127.0.0.1:8088",
  },
};

module.exports = config[env];
