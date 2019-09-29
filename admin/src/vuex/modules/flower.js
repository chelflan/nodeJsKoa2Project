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
  getFlowerList(){
    return flower.getFlowerList();
  },
  // 更新
  async updateMaterial({state, commit}, id) {
    return flower.updateMaterial(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
