const Router = require('koa-router')

const {CommentsDao} = require('../../dao/comments')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

// 创建评论
router.post('/flower', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new CommentsValidator().validate(ctx);

    const r = await CommentsDao.createComments(v);

    const data = {
        id: r.getDataValue('id'),
        article_id: r.getDataValue('article_id'),
        parent_id: r.getDataValue('parent_id'),
        nickname: r.getDataValue('nickname'),
        content: r.getDataValue('content'),
        created_at: r.getDataValue('created_at')
    };

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(data);
})

// 获取列表
router.get('/flower', async (ctx) => {
    const page = ctx.query.page;
    let commentsList = await CommentsDao.getCommentsList(page);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(commentsList);

})





module.exports = router