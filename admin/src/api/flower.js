import fetch from './fetch';

export default {
  // 获取列表
  list(params) {
    return fetch.post('/comments', params);
  },
  getToken(){
    return fetch.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx749c0f4834e01f04&secret=0b21812492834f37d14d8676fb39434b")
  },
  // 更新
  updateMaterial(id) {
    return fetch.delete('/comments/' + id);
  }
}
