/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-18 19:38:38
 * @LastEditTime: 2021-03-22 10:08:38
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \mock-server\web\babel.config.js
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" }], // `style: true` 会加载 less 文件
  ],
};
