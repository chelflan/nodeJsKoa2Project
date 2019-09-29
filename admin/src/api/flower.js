import fetch from './fetch';

export default {
  // 获取列表
  list(accessToken,params) {
    return fetch.postOne('https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token='+accessToken, params);
  },
  getFlowerList(params){
    return fetch.get("/flower",params)
  },
  // 更新
  updateMaterial(id) {
    return fetch.delete('/flower/' + id);
  }
}
