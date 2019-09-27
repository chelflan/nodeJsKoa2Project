import fetch from './fetch';

export default {
  // 获取列表
  list(params) {
    return fetch.post('/flower', params);
  },
  getFlowerList(params){
    return fetch.get("/flower",params)
  },
  // 更新
  updateMaterial(id) {
    return fetch.delete('/flower/' + id);
  }
}
