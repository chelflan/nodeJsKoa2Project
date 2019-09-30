import fetch from './fetch';

export default {
  // 获取列表
  list(accessToken,params) {
    return fetch.postOne('https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token='+accessToken, params);
  },
  getFlowerList(params){
    return fetch.get("/flower",params)
  },
  // 插入到每日一花
  insertFlower(param) {
    return fetch.postOne('/dailyFlower',params);
  }
}
