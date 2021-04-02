/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-31 14:29:48
 * @LastEditTime: 2021-04-02 11:03:07
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\store\modules\interface.js
 */
export default {
  state: {
    interfaceData: {
      reqBody: [{}],
      resBody: [],
    },
  },
  mutations: {
    setInterfaceEditorData(state, data) {
      state.interfaceEditorData = data;
    },
  },
};
