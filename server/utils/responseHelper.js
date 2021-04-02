/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-23 13:49:41
 * @LastEditTime: 2021-03-23 14:39:12
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \mock-server\server\utils\responseHelper.js
 */

class ResponseHelper {
  base(error_no = null, error_info = null, data = null) {
    return {
      error_no,
      error_info,
      data,
    }
  }

  success(error_info = 'success', data = null) {
    return this.base(null, error_info, data)
  }

  fail(error_no, error_info) {
    return this.base(error_no, error_info)
  }
}

module.exports = new ResponseHelper()
