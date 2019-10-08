const Sequelize = require('sequelize')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const {
    dbNameFlower,
    hostFlower,
    portFlower,
    userFlower,
    passwordFlower
} = require('../config/config').databaseDailyFlower

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        // create_time && update_time
        timestamps: true,
        // delete_time
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        // 把驼峰命名转换为下划线
        underscored: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['password', 'updated_at', 'deleted_at', 'created_at']
                }
            },
            iv: {
                attributes: {
                    exclude: ['content', 'password', 'updated_at', 'deleted_at']
                }
            }
        }
    }
})

const sequelizeFlower = new Sequelize(dbNameFlower, userFlower, passwordFlower, {
    dialect: 'mysql',
    host:hostFlower,
    port:portFlower,
    logging: true,
    timezone: '+08:00'
})

// 创建模型
sequelize.sync({
    force: false
})

sequelizeFlower.sync({
    force: false
})

module.exports = {
    sequelize,
    sequelizeFlower
}
