<template>
  <section class="header">
    <header class="header-box">
      <section class="logo">
        <a href="/"><img src="../assets/images/logoAvatar.png" alt="LOGO"></a>
      </section>

      <ul class="nav-dropdown">
        <li class="nav-item">
          <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  首页<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in nav"
                :key="index"
                @click.native="changeNav(item.path, index)">
                <i :class="`icon el-icon-menu`"></i> {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>

      <div class="nav-list">
        <ul class="nav-box">
          <li :class="navIndex === -1 ? 'nav-item nav-item--active' : 'nav-item'"
              @click="changeNav(-1,-1)"> 
              <i :class="`icon el-icon-s-home`"></i>首页</li>
          <li v-for="(item, index) in nav"
              :class="navIndex === index ? 'nav-item nav-item--active' : 'nav-item'"
              @click="changeNav(item.menuId, index)"
              :key="index">
            <i :class="`icon el-icon-menu`"></i> {{item.name}}
          </li>
        </ul>
      </div>
    </header>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import merge from 'webpack-merge'

  export default {
    data() {
      return {
        keyword: '',
        navIndex: -1,
        nav: [
          {name: '首页', path: '/', icon: 'el-icon-house'},
          {name: '文章', path: '/', icon: 'el-icon-house'},
          {name: '免费观影', path: '/', icon: 'el-icon-reading'},
          {name: '股票', path: '/', icon: 'el-icon-reading'},
          {name: '关于', path: '/about', icon: 'el-icon-chat-round'},
        ]
      }
    },
    created() {
      this.getMenu();
    },
    mounted() {
    },
    computed: {
      ...mapState({})
    },
    methods: {
      ...mapActions({
        showUserManager: 'user/showUserManager',
        getArticleList: 'article/getArticleList',
        getMenuList: 'menu/getMenuList',
        getMenuArticle: 'menu/getMenuArticle',
      }),

      /**
       * 切换导航栏
       */
      changeNav(menuId, index) {
        this.$router.replace({
          query: merge({})
        });
        this.navIndex = index;
        
        if(menuId === -1){
          this.getArticleList();
        }else{
           this.changeArticleMenu(menuId);
        }
      
      },
      
       /**
       * 获取菜单
       * @returns 菜单列表
       */
      async getMenu() {
        const res = await this.getMenuList();
        let temp = res.data.data;
         this.nav = [];
        for(let item of temp){
          this.nav.push(
            {
               name: item.name,
               menuId: item.id
            }
          )
        }
        
      },

      /**
       * 获取菜单下的文章
       * @param menu_id 菜单ID
       * @returns 文章列表
       */
      async changeArticleMenu(menu_id) {
        this.$router.replace({
          query: merge({}, {
            menu_id
          })
        });
        this.getArticle();
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
        const {page, desc, menu_id, keyword} = this.$route.query;

        await this.getArticleList({
          page,
          desc,
          keyword,
          menu_id
        });
      },
      /**
       * 路由调整
       * @param path 路由地址
       */
      toPath(path) {
        this.$router.push(path);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 96px;
    z-index: 5000;
    background: #fff;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .03);
    border-bottom: 1px solid #f0f0f0;
  }

  .header-box {
    width: 70%;
    box-sizing: border-box;
    margin: 0 auto;
    height: 96px;
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 96px;
    text-align: center;
    overflow: hidden;

    & img {
      width: 100px;
    }
  }

  .nav-box-dropdown {
    display: none;
  }

  .nav-list {
    display: block;
    margin: 0 24px;

    & .nav-box {
      display: flex;
      height: 96px;
      width: 100%;

      & .nav-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-items: center;
        padding: 0 24px;
        height: 96px;
        line-height: 96px;
        color: #404040;
        font-size: 20px;
        text-decoration: none;

        &:hover {
          color: #409EFF;
        }
      }

      & .icon {
        margin-right: 8px;
      }

      & .nav-item--active {
        color: #409EFF;
      }
    }
  }

  .search {
    position: relative;
    width: 480px;

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
        border-color: #409EFF;
      }

      &::placeholder {
        color: #ccc;
        font-size: 16px;
      }

      &:focus .search-icon {
        color: #409EFF;
      }
    }
  }

  .nav-dropdown {
    display: none;
  }

  @media screen and (min-width: 200px) and (max-width: 768px) {

    .header {
      box-sizing: border-box;
      padding: 0 16px;
    }
    .header-box {
      width: 100%;
    }
    .nav-dropdown {
      display: block;
      margin: 0 16px;
    }

    .nav-list {
      display: none;
      margin: 0 16px;
    }

    .search {
      width: auto;
      flex: 1;
    }
  }
</style>
