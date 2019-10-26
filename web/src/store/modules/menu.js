import menu from '../../api/menu'
import article from './article'

const state = {
  // 菜单列表
  menuList: []
};

const mutations = {
  // 设置菜单列表
  SET_MENU_LIST(state, list) {
    state.menuList = list
  }
};

const actions = {

  /**
   * 获取菜单列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async getMenuList({state, commit}, params) {
    let res = await menu.list(params);
    commit('SET_MENU_LIST', res.data.data);

    return res;
  },

  /**
   * 查询菜单ID下的所有文章列表
   * @param state
   * @param commit
   * @param params
   * @returns {Promise<void>}
   */
  async getMenuArticle({state, commit}, id) {
    return await menu.article(id);

  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
