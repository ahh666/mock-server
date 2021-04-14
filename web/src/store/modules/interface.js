/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-31 14:29:48
 * @LastEditTime: 2021-04-14 14:57:04
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\store\modules\interface.js
 */
export default {
  state: {
    interfaceData: {},
  },
  mutations: {
    setInterfaceEditorData(state, data) {
      state.interfaceEditorData = data;
    },
  },
};
