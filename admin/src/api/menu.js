import fetch from './fetch';

export default {
  // 获取菜单列表
  list(params) {
    return fetch.get('/menu', params)
  },

  // 更新菜单
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/menu/' + id, params)
  },

  // 删除菜单
  destroy(id) {
    return fetch.delete('/menu/' + id)
  },

  // 菜单详情
  detail(params) {
    const {id} = params;
    delete params.id;
    return fetch.get('/menu/' + id, params);
  },

  // 创建菜单
  create(params) {
    return fetch.post('/menu', params);
  },

  // 查询菜单ID下的所有文章列表
  article(params) {
    const {id} = params;
    delete params.id;

    return fetch.get('/menu/' + id + '/article', params);
  }
}
