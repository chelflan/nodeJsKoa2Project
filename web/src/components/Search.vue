<template>
  <div class="search">
    <h1 class="search-title">
      <i class="icon el-icon-search"></i> 搜索
    </h1>
    <div class="search-box">
      <el-input
        placeholder="请输入搜索内容"
        size="small"
        clearable
        maxlength="32"
        prefix-icon="el-icon-search"
        @keyup.enter.native="getSearchArticle"
        v-model="keyword"
      ></el-input>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import merge from "webpack-merge";

export default {
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    ...mapState({})
  },
  created() {},
  methods: {
    ...mapActions({
      searchArticle: "article/searchArticle",
      getArticleList: "article/getArticleList"
    }),
    /**
     * 搜索文章
     * @returns 文章列表
     */
    async getSearchArticle() {
      const keyword = this.keyword;
      if (!keyword) {
        this.allArticle();
      } else {
        const path = this.$route.path;
        let articlePath = "/";

        if (path !== articlePath) {
          articlePath += `?keyword=${keyword}`;
          this.toPath(articlePath);
        } else {
          this.$router.replace({
            query: merge(this.$route.query, {
              keyword
            })
          });
          this.getArticle();
        }
      }
    },
    // 全部文章
    allArticle() {
      this.$router.replace({
        query: merge({})
      });
      this.getArticle();
    },
    /**
     * 获取文章
     *
     * @returns 文章列表
     */
    async getArticle() {
      const { page, desc, category_id, keyword } = this.$route.query;
      await this.getArticleList({
        page,
        desc,
        keyword,
        category_id
      });
    },
    // 路由跳转
    toPath(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  padding: 0 24px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 24px;

  & .search-title {
    display: flex;
    align-items: center;
    color: #464c5b;
    font-size: 24px;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  & .search-box {
    position: relative;
    width: auto;

    .search-icon {
      position: absolute;
      right: 8px;
      top: 8px;
      color: #aaa;
    }

    & .search-input {
      box-sizing: border-box;
      color: #404040;
      height: 36px;
      line-height: 36px;
      width: 360px;
      font-size: 16px;
      padding-right: 32px;
      padding-left: 10px;
      outline: none;
      border: 1px solid #ccc;

      &:focus {
        border-color: #409eff;
      }

      &::placeholder {
        color: #ccc;
        font-size: 16px;
      }

      &:focus .search-icon {
        color: #409eff;
      }
    }
  }
}
</style>

