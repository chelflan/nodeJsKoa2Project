const Router = require('koa-router');

const {
    MenuValidator,
    PositiveIdParamsValidator
} = require('../../validators/menu');

const {MenuDao} = require('../../dao/menu');
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

/**
 * 创建菜单
 */
router.post('/menu', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new MenuValidator().validate(ctx);


    await MenuDao.createMenu(v);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('创建菜单成功')
})


/**
 * 删除文章
 */
router.delete('/menu/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取菜单ID参数
    const id = v.get('path.id');
    // 删除菜单
    await MenuDao.destroyMenu(id);

    ctx.response.status = 200;
    ctx.body = res.success('删除菜单成功');
})


/**
 * 更新菜单
 */
router.put('/menu/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取菜单ID参数
    const id = v.get('path.id');
    // 更新菜单
    await MenuDao.updateMenu(id, v);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.success('更新菜单成功');
})

/**
 * 获取所有的菜单
 */
router.get('/menu', async (ctx) => {

    // 获取菜单下关联的文章
    const categoryList = await MenuDao.getMenuList();

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(categoryList);
})

/**
 * 获取菜单详情
 */
router.get('/menu/:id', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取参数
    const id = v.get('path.id');
    // 获取菜单
    const menu = await MenuDao.getMenu(id);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(menu);
})

/**
 * 获取一个菜单下的文章
 */
router.get('/menu/:id/article', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 菜单ID
    const category_id = v.get('path.id');
    // 页面
    const page = v.get('query.page');
    // 排序
    const desc = v.get('query.desc');
    // 获取菜单
    const menu = await MenuDao.getMenuArticle(category_id, page, desc);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(menu);
})

module.exports = router
