import menu from '../../api/menu'

const state = {}
const mutations = {}
const actions = {
  // 获取分类列表
  async getMenuList({state, commit}, params) {
    return menu.list(params);
  },

  // 获取分类详情
  async getMenu({state, commit}, params) {
    return menu.detail(params);
  },

  // 获取分类下的文章
  async getMenuArticle({state, commit}, params) {
    return menu.article(params);
  },

  // 创建分类
  async createMenu({state, commit}, params) {
    return menu.create(params);
  },

  // 更新分类
  async updateMenu({state, commit}, params) {
    return menu.update(params);
  },

  // 删除分类
  async destroyMenu({state, commit}, id) {
    return menu.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
