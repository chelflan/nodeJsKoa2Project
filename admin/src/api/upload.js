import fetch from './fetch';

export default {
  // 上传
  uploadImg(params) {
    debugger
    return fetch.upload('http://up-z2.qiniu.com', params)
  }
}
