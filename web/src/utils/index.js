/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-25 09:53:26
 * @LastEditTime: 2021-04-09 14:58:54
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\utils\index.js
 */

import Clipboard from "clipboard";
import { message } from "ant-design-vue";
/**
 * @description: tag 颜色匹配
 */
export const tagColor = (type) => {
  return type === "get" ? "blue" : "green";
};

// 获取数据类型
export const dataTypeValidator = (data) => {
  return Object.prototype.toString.call(data).match(/ (.*?)]/)[1];
};

// 复制内容到剪切板
export const copyStringToClipboard = (btnClass, copyString) => {
  const cli = new Clipboard(btnClass, {
    text() {
      return copyString || "你复制了个寂寞";
    },
  });
  cli.on("success", () => {
    message.success("复制成功");
    cli.destroy();
  });
  cli.on("error", (e) => {
    message.error("复制失败:", e);
    cli.destroy();
  });
};

// 数据格式转换为 mock 公式，数据源格式参考：
export const initPreviewData = (dataSource) => {
  if (!dataSource) {
    return;
  }
  let mock = {};
  dataSource.forEach((item) => {
    let properties = item.name;
    if (item.type === "Array" && item.minRange) {
      properties = `${item.name}|${item.minRange}-${item.maxRange}`;
    }
    mock[properties] = mockdataFormat(item);
  });
  return mock;
};
// 专门用来格式化mock数据的
const mockdataFormat = (dataSource) => {
  // 数据类型为 null，直接返回null
  if (dataSource.type === "Null") {
    return null;
  }
  // 数据类型为 Object, 则递归
  if (dataSource.type === "Object") {
    return initPreviewData(dataSource.items);
  }
  // 数据类型为 Array
  if (dataSource.type === "Array") {
    const arrItem = dataSource.items[0];
    // 数组元素为对象，则需要重新遍历一遍
    if (arrItem.type === "Object") {
      return [initPreviewData(arrItem.items)];
    }
    // 为非对象，则正常操作（不考虑为数组的情况）
    return [arrItem.mock || "@string"];
  }
  // 没有mock字段，则默认为 string
  if (!dataSource.mock) {
    return "@string";
  }
  if (dataSource.mock) {
    return dataSource.mock;
  }
};
