const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');

const catchError = require('./middlewares/exception')


var path = require('path')//我们用文件来存储access_token所以需要把path模块导入进来
var wechat = require('./wechat/g')//这个是微信获取access_token的代码逻辑
var util = require('./app/lib/util')//这个辅助代码的实现

//在这里我们需要新建一个文件夹config，里面新建一个wechat.txt
var wechat_file = path.join(__dirname, './config/wechat.txt')
const {
    appId,
    appSecret
} = require('./config/config').wx


//这个是配置文件
var config = {
    wechat: {
        appID: appId,
        appSecret: appSecret,
        token: 'vhmake',
        getAccessToken: function () {
            //通过这个来实现获取access_token
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data)
            //通过这个来保存access_token
            return util.writeFileAsync(wechat_file,data)
        }
    }
}

var app = new Koa()//实例化框架

app.use(wechat(config.wechat))//调用中间件，来实现里面的微信逻辑

app.use(cors())
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(3000)
