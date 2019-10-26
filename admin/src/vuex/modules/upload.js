import upload from '../../api/upload'

const state = {}
const mutations = {}
const actions = {
  // 获取文章列表
  async uploadImg({state, commit}, params) {
    return upload.uploadImg(params);
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
