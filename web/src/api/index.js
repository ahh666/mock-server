/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-18 20:02:02
 * @LastEditTime: 2021-04-15 14:56:01
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \web\src\api\index.js
 */
import BaseApi from "./base";
class Api {
  constructor(base) {
    this.handler = base;
  }
  projectList() {
    return this.handler.get("/webServer/projectList");
  }
  createProject(data) {
    return this.handler.post("/webServer/createProject", data);
  }
  delProject(data) {
    return this.handler.post("/webServer/delProject", data);
  }

  interfaceList(params) {
    return this.handler.get("/webServer/interfaceList", { params });
  }
  createInterface(data) {
    return this.handler.post("/webServer/createInterface", data);
  }
  delInterface(data) {
    return this.handler.post("/webServer/delInterface", data);
  }
  updateInterface(data) {
    return this.handler.post("/webServer/updateInterface", data);
  }
  about() {
    return this.handler.get("/webServer/about");
  }
}

class RequestBase extends BaseApi {
  async transformResponse(res) {
    const { error_no, error_info } = res;
    if (error_no !== null) {
      return error_info;
    }
    return res;
  }
  get(...args) {
    return super.get(...args).then(this.transformResponse);
  }
  post(...args) {
    return super.post(...args).then(this.transformResponse);
  }
}

export default new Api(new RequestBase());
