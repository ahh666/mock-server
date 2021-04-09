/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-22 10:13:26
 * @LastEditTime: 2021-04-09 14:31:34
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\someui.js
 */
import {
  Menu,
  Button,
  Card,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Tabs,
  Tree,
  Table,
  Switch,
  Tooltip,
  message,
} from "ant-design-vue";

export default (app) => {
  app
    .use(Menu)
    .use(Button)
    .use(Card)
    .use(Modal)
    .use(Form)
    .use(Input)
    .use(Select)
    .use(Tag)
    .use(Tabs)
    .use(Tree)
    .use(Switch)
    .use(Tooltip)
    .use(Table);

  app.config.globalProperties.$msg = message;
};
