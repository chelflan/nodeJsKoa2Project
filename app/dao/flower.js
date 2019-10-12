const {Flower} = require('../models/flower')

class FlowerDao {
    // 创建评论
    static async createFlower(v) {

        const flower = new Flower();

        flower.log_Title = v.get('body.title');
        flower.log_Intro = v.get('body.digest');
        flower.log_Content = v.get('body.content');
        flower.log_PostTime = v.get('body.update_time');
        flower.media_id = v.get('body.media_id');


        // 检测是否存在文章
        const hasFlower = await Flower.findOne({
            where: {
                media_id: v.get('body.media_id')
            }
        });

        // 如果存在，抛出存在信息
        if (hasFlower) {
            throw new global.errs.Existing( v.get('body.title')+'---这篇文章已存在');
        }

        return flower.save();
    }

    // 根据media_id来查询结果
    static async queryFlowerByMd(id) {
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