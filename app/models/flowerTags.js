const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelizeFlower} = require('../../core/db')

class FlowerTags extends Model {

}

FlowerTags.init({
    tag_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tag_Name: {
        type:Sequelize.STRING,
        defaultValue: ""
    },
    tag_Order: {
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    tag_Count: {
        type:Sequelize.INTEGER,
        defaultValue: 1
    },
    tag_Alias: {
        type:Sequelize.STRING,
        defaultValue: ""
    },
    tag_Intro: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    tag_Template: {
        type:Sequelize.STRING,
        defaultValue: ""
    },
    tag_Meta: {
        type:Sequelize.STRING,
        defaultValue: ""
    }
    }, {
    sequelize: sequelizeFlower,
    tableName: 'zbp_tag'
})

module.exports = {
    FlowerTags
}