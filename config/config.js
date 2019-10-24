module.exports = {
    environment: 'dev',
    database: {
        dbName: 'myblog',
        host: '139.155.24.81',
        port: 3380,
        user: 'user',
        password: 'user'
    },
    databaseDailyFlower: {
        dbNameFlower: 'dailyflower',
        hostFlower: '139.155.24.81',
        portFlower: 3380,
        userFlower: 'user',
        passwordFlower: 'user'
    },
    security: {
        secretKey: "secretKey",
        // 过期时间 秒
        expiresIn: 60 * 600
    },
    wx: {
        appId: 'wx749c0f4834e01f04',
        appSecret: '0b21812492834f37d14d8676fb39434b',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}
