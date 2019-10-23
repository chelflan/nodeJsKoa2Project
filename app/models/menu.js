const moment = require('moment');

const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义文章模型
class Menu extends Model {

}

// 初始菜单模型
Menu.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 菜单名
    name: Sequelize.STRING,
    // 菜单键
    key: Sequelize.STRING,
    // 菜单父级ID，默认为0
    parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize,
    tableName: 'menu'
})

module.exports = {
    Menu
}
