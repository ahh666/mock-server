/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-31 14:29:48
 * @LastEditTime: 2021-04-12 16:13:57
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\store\modules\interface.js
 */
export default {
  state: {
    interfaceData: {},
    mockFormula: undefined,
  },
  mutations: {
    setInterfaceEditorData(state, data) {
      state.interfaceEditorData = data;
    },
    setMockFormula(state, formula) {
      state.mockFormula = formula;
    },
  },
};
