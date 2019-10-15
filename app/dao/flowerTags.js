const {FlowerTags} = require('../models/flowerTags')

class FlowerTagsDao {
    // 创建评论
    static async createFlowerTags(v) {

        // 检测是否存在文章
        const hasFlower = await FlowerTags.findOne({
            where: {
                tag_Name: v //v.get('body.tagsName')
            }
        });

        const flowerTags = new FlowerTags();
        // 如果存在，抛出存在信息
        if (hasFlower) {
            // throw new global.errs.Existing( v.get('body.title')+'---这篇文章已存在');
            flowerTags.tag_Count = flowerTags.tag_Count+1;
        }

    
        flowerTags.tag_Name = v;//v.get('body.tagsName');

        return flowerTags.save();
    }

    // 根据media_id来查询结果
    static async queryFlowerByMd(id) {
        const flowerTags = await FlowerTags.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        if (!flowerTags) {
            throw new global.errs.NotFound('没有找到相关评论');

        }
        flowerTags.destroy()
    }

    // 列表
    static async getFlowerList(page = 1) {
        const pageSize = 10;
        const flowerTags = await FlowerTags.scope('bh').findAndCountAll({
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
            data: flowerTags.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: flowerTags.count,
                total: flowerTags.count,
                total_pages: Math.ceil(flowerTags.count / 10),
            }
        };
    }
}

module.exports = {
    FlowerTagsDao
}