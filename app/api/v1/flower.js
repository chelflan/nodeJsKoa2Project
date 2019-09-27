const Router = require('koa-router')

const {FlowerDao} = require('../../dao/flower')
const {Auth} = require('../../../middlewares/auth');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

//获取封装的wexin方法
const {WeChat} = require('../../lib/wechat')

//全局配置参数
const path = require('path');
const util = require('../../lib/util');
const wechat_file = path.join(__dirname,'wechat.txt');

const {
    appId,
    appSecret
} = require('../../../config/config').wx


let config={
    appId:appId,
    appSecret:appSecret,
    token:'mytestdemo',
    getAccessToken:function(){
        return util.readFileAsync(wechat_file,'utf-8');
    },
    saveAccessToken:function(data){
        return util.writeFileAsync(wechat_file,data);
    }
}

const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/v1'
})

// 创建评论
router.post('/flower', async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new FlowerValidator().validate(ctx);

    const r = await FlowerDao.createFlower(v);

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
    //查询accesstoken
    // let weChatInstance = new WeChat(config);

    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(weChatInstance);

})





module.exports = router