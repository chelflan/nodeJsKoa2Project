const {Menu} = require('../models/menu')
const {Article} = require('../models/article')
const {ArticleDao} = require('../dao/article')
const {Sequelize, Op} = require('sequelize')

class MenuDao {
    // 创建分类
    static async createMenu(v) {
        // 查询是否存在重复的分类
        const hasMenu = await Menu.findOne({
            where: {
                key: v.get('body.key'),
                deleted_at: null
            }
        });

        if (hasMenu) {
            throw new global.errs.Existing('分类已存在');
        }
        ;

        const menu = new Menu();
        menu.name = v.get('body.name');
        menu.key = v.get('body.key');
        menu.parent_id = v.get('body.parentId');

        menu.save();
    }

    // 删除分类
    static async destroyMenu(id) {
        // 查询分类
        const menu = await Menu.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        if (!menu) {
            throw new global.errs.NotFound('没有找到相关分类');

        }
        menu.destroy()
    }

    // 获取分类详情
    static async getMenu(id) {
        const menu = await Menu.scope('bh').findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        if (!menu) {
            throw new global.errs.NotFound('没有找到相关分类');
        }

        return menu
    }

    // 更新分类
    static async updateMenu(id, v) {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            throw new global.errs.NotFound('没有找到相关分类');
        }
        menu.name = v.get('body.name');
        menu.key = v.get('body.key');
        menu.parent_id = v.get('body.parent_id');

        menu.save();
    }

    // 分类列表
    static async getMenuList() {
        const menu = await Menu.scope('bh').findAll({
            where: {
                deleted_at: null
            }
        });

        // 统计每个分类下有多少文章
        const ids = [];
        menu.forEach(item => {
            ids.push(item.id);
        });
        const article = await MenuDao._getArticle(ids);

        menu.forEach(item => {
            MenuDao._setArticle(item, article)
        })

        return menu;

    }

    // 获取每个分类下有多少文章
    static async _getArticle(ids) {
        return await Article.scope('bh').findAll({
            where: {
                category_id: {
                    [Op.in]: ids
                }
            },
            group: ['category_id'],
            attributes: ['category_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
    }

    // 设置每个分类下的文章总数
    static _setArticle(menu, article) {
        let count = 0;
        article.forEach(item => {
            if (parseInt(menu.id) === parseInt(item.category_id)) {
                count = item.get('count')
            }
        })
        menu.setDataValue('article_nums', count);

        return menu
    }

    // 获取一个分类下的文章
    static async getMenuArticle(category_id, page = 1, desc = 'created_at') {
        const pageSize = 10;

        const article = await Article.scope('iv').findAndCountAll({
            limit: pageSize,//每页10条
            offset: (page - 1) * pageSize,
            where: {
                deleted_at: null,
                category_id
            },
            order: [
                [desc, 'DESC']
            ]
        });

        const categoryIds = [];
        const articleIds = [];

        const r = article.rows;
        r.forEach(article => {
            articleIds.push(article.id);
            categoryIds.push(article.category_id);
        });


        // // 获取每篇文章评论
        const comments = await ArticleDao._getArticleComments(articleIds);
        r.forEach(article => {
            ArticleDao._setArticleComments(article, comments)
        });

        // 获取每篇文章分类详情
        const menu = await ArticleDao._getArticleMenuDetail(categoryIds);
        r.forEach(article => {
            ArticleDao._setArticleCategoryDetail(article, menu)
        });

        return {
            data: r,
            // 分页
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: article.count,
                total: article.count,
                total_pages: Math.ceil(article.count / 10),
            }
        };
    }
}

module.exports = {
    MenuDao
}