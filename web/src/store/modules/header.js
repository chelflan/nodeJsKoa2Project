/**
 * index
 */

const state = {
  indexNav: -1,
}

const mutations = {
  // 设置index
  SET_INDEX(state, index) {
    state.indexNav = index;
  }
}
const getters = {
  indexNav(state) {
    return state.indexNav;
  }
}
const actions = {
  /**
   * 设置index
   * @param {*} state 
   * @param {*} index 
   */
  setIndex(state, index) {
    state.commit('SET_INDEX', index)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
