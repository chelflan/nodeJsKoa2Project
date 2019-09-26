const {Flower} = require('../models/flower')

class FlowerDao {
    // 创建评论
    static async createFlower(v) {

        const flower = new Flower();

        flower.nickname = v.get('body.nickname');
        flower.email = v.get('body.email');
        flower.content = v.get('body.content');
        flower.article_id = v.get('body.article_id');
        flower.parent_id = v.get('body.parent_id');

        return flower.save();
    }

    // 删除评论
    static async destroyFlower(id) {
        const flower = await Flower.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        if (!flower) {
            throw new global.errs.NotFound('没有找到相关评论');

        }
        flower.destroy()
    }

    // 列表
    static async getFlowerList(page = 1) {
        const pageSize = 10;
        const flower = await Flower.scope('bh').findAndCountAll({
            limit: pageSize,//每页10条
            offset: (page - 1) * pageSize,
            where: {
                deleted_at: null
            },
            order: [
                ['created_at', 'DESC']
            ]
        })

        return {
            data: flower.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: flower.count,
                total: flower.count,
                total_pages: Math.ceil(flower.count / 10),
            }
        };
    }
}

module.exports = {
    FlowerDao
}