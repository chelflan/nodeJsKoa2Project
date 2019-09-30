//wechat.js主要代码
// var WeChatEasy = require("koa-easywechat");

var Promise = require('bluebird');//导入这个模块来调用Promise，来实现数据继续往下传
var request = Promise.promisify(require('request'));//因为我们用到了Promise，所以在调用request的时候需要这样导入

const baseUrl="https://api.weixin.qq.com/";
const WxApi={
    accessToken:baseUrl+"cgi-bin/token?grant_type=client_credential"
}

class WeChat{
    constructor(opts){
        this.appId=opts.appId;
        this.appSecret=opts.appSecret;
        this.getAccessToken=opts.getAccessToken;
        this.saveAccessToken=opts.saveAccessToken;
        this.init();//初始化
    }

    async init(){
        //获取access_token
        let data=await this.getAccessToken();
        //判断读取的内容是否存在、是否为空字符串，如果是的话进行更新
        if(data && data.length!=0){
            data=JSON.parse(data);
            //判断是否合法
            if(!this.isValidAccessToken(data)){
                data=await this.updateAccessToken();
            }
        }else{
            data=await this.updateAccessToken();
        }
        this.access_token=data.access_token;
        this.expires_in=data.expires_in;
        this.saveAccessToken(JSON.stringify(data));
    }

    isValidAccessToken(data){
        if(!data || !data.access_token || !data.expires_in){
            return false;
        }
        return new Date().getTime() < data.expires_in ?  true : false;
    }

    updateAccessToken(){
        return new Promise(async (resolve,reject)=>{
            var appId=this.appId;
            var appSecret=this.appSecret;

            // var res = await ap.use(WxApi.accessToken+"&appid="+appId+"&secret="+appSecret);
            var res = await this.requetToken(WxApi.accessToken+"&appid="+appId+"&secret="+appSecret);
            console.log(res,"res")
            var data = res;
            data.expires_in = new Date().getTime() + (data.expires_in-20)*1000;
            resolve(data);
        });
    }

    requetToken(url){
        return new Promise(function (resolve, reject) {
            request({url: url, json: true}, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var data = body;
                    resolve(data);
                } else {
                    reject()
                }
            });
        })
    }

    getMaterialCount(accessToken){
        let url = "https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token="+accessToken;
        return new Promise(function (resolve, reject) {
            request({url: url, json: true}, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject()
                }
            });
        })
    }

    getMaterialList(accessToken){
        // let url = "https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token="+accessToken;
        let url = "https://api.weixin.qq.com/cgi-bin/material/get_material?access_token="+accessToken;
        let data = {
            type:"news",
            offset:0,
            count:10
        }


       let bb = {
            "media_id":"GvnDcC2QjGEN4AUqdM7DyXCH1ZiwO_gBY1xV0qu-z0Y"
        }

        return new Promise(function (resolve, reject) {
            request({url: url,method:"POST",formData:bb,json: true}, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject()
                }
            });
        })
    }

}

module.exports = {
    WeChat
}