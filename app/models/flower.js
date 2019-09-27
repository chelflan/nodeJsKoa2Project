const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize1} = require('../../core/db')

class Flower extends Model {

}

Flower.init({
    log_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //
    log_CateID: {
    type:Sequelize.INTEGER,
    defaultValue: 2
    },
    //
    log_AuthorID: {
        type:Sequelize.INTEGER,
        defaultValue: 1
    },
    //
    log_Tag: {
        type:Sequelize.STRING,
        defaultValue: ""
    },
    //
    log_Status: {
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    // 评论父级ID，默认为0
    log_Type: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    log_Alias: {
        type:Sequelize.STRING,
        defaultValue: ""
    },
    // 文章ID
    log_IsTop: {
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    // 评论父级ID，默认为0
    log_IsLock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    log_Title: {
        type: Sequelize.STRING
    },
    log_Intro: Sequelize.STRING,
    // 文章ID
    log_Content: Sequelize.STRING,
    // 评论父级ID，默认为0
    log_PostTime: {
        type: Sequelize.INTEGER,
        get() {
            return moment(new Date().getTime());
        }
    },
    log_CommNums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    log_ViewNums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // 文章ID
    log_Template: {
        type:Sequelize.STRING,
        defaultValue: ""
    },
    log_Meta: {
        type: Sequelize.STRING,
        defaultValue: 0
    }
}, {
    sequelize: sequelize1,
    tableName: 'zbp_post'
})

module.exports = {
    Flower
}