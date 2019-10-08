const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelizeFlower} = require('../../core/db')

class Flower extends Model {

}

Flower.init({
    log_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    log_CateID: {
    type:Sequelize.INTEGER,
    defaultValue: 2
    },
    log_AuthorID: {
        type:Sequelize.INTEGER,
        defaultValue: 1
    },
    log_Tag: {
        type:Sequelize.STRING,
        defaultValue: "wechat"
    },
    log_Status: {
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    log_Type: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    log_Alias: {
        type:Sequelize.STRING,
        defaultValue: "dailyflower"
    },
    log_IsTop: {
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    log_IsLock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    log_Title: {
        type: Sequelize.STRING
    },
    log_Intro: Sequelize.STRING,
    log_Content: Sequelize.STRING,
    log_PostTime: {
        type: Sequelize.INTEGER,
        defaultValue:new Date().getTime()/1000
        // get() {
        //     return moment(new Date().getTime());
        // }
    },
    log_CommNums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    log_ViewNums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    log_Template: {
        type:Sequelize.STRING,
        defaultValue: ""
    },
    log_Meta: {
        type: Sequelize.STRING,
        defaultValue: 0
    }
    }, {
    sequelize: sequelizeFlower,
    tableName: 'zbp_post'
})

module.exports = {
    Flower
}