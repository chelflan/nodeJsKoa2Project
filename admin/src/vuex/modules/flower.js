import flower from '../../api/flower'

const state = {}
const mutations = {}
const actions = {
  // 获取列表
  async getBatchgetMaterial({state, commit},params) {

    let p = {
      type:'news',
      offest: params.offest,
      count: params.count
    };

    return flower.list(params.accessToken,p);
  },
  getFlowerList({state, commit},params){
    return flower.getFlowerList(params);
  },
  // 插入到每日一花
  async insertFlower({state, commit}, params) {
    return flower.insertFlower(params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
