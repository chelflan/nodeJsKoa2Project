import flower from '../../api/flower'

const state = {}
const mutations = {}
const actions = {
  // 获取评论列表
  async getBatchgetMaterial({state, commit}, params) {
    return flower.list(params);
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
