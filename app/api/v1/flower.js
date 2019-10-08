const Router = require('koa-router')

const {FlowerDao} = require('../../dao/flower')
const {Auth} = require('../../../middlewares/auth');
const {FlowerValidator} = require('../../validators/flower')

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

//获取封装的wexin方法
const {WeChat} = require('../../lib/wechat')

//全局配置参数
const path = require('path');
const util = require('../../lib/util');
const wechat_file = path.join(__dirname,'../../lib/wechat.txt');

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

    const offest = ctx.query.offest;
    const count = ctx.query.count;

    //查询accesstoken
    let weChatInstance = new WeChat(config);

    //获取access_token
    let wechatParam = await util.readFileAsync(wechat_file,'utf-8');
   //  //获取素材总数
   //  let allCount = await weChatInstance.getMaterialCount(JSON.parse(wechatParam).access_token);
   // //获取图文素材
    let list = await weChatInstance.getMaterialList(JSON.parse(wechatParam).access_token,offest,count);
    console.log(list,"list")
    // 返回结果
    ctx.response.status = 200;
    ctx.body = res.json(list);

})

router.post('/dailyFlower', async (ctx) => {

    // const title = ctx.query.title;
    // const content = ctx.query.content;

    // 通过验证器校验参数是否通过
    const v = await new FlowerValidator().validate(ctx);

    const r = await FlowerDao.createFlower(v);
    // 返回结果
    ctx.response.status = 200;
    // ctx.body = res.json();
    ctx.body = res.success('创建成功')

})


module.exports = router