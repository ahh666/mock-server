/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-26 11:21:30
 * @LastEditTime: 2021-04-01 14:27:25
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\mixins\interfaceInfo.js
 */

export default {
  computed: {
    info() {
      return this.$store.state.interfaceModule.interfaceData;
    },
  },
};
