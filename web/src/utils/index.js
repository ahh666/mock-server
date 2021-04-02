/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-25 09:53:26
 * @LastEditTime: 2021-04-01 17:15:39
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\utils\index.js
 */

/**
 * @description: tag 颜色匹配
 */
export const tagColor = (type) => {
  return type === "get" ? "blue" : "green";
};

export const dataTypeValidator = (data) => {
  return Object.prototype.toString.call(data).match(/ (.*?)]/)[1];
};
