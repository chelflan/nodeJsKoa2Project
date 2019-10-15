<template>
  <section>
    <Button type="primary" @click="toPathLink('/menu/create')" icon="md-add" style="margin-bottom: 16px;">新增菜单
    </Button>

    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>
    </section>

  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        list: [],
        page: null,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: "center"
          },
          {
            title: '菜单名称',
            key: 'name'
          },
          {
            title: '菜单关键字',
            key: 'key'
          },
          {
            title: '菜单下的文章数',
            key: 'article_nums'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getMenuList();
    },
    methods: {
      ...mapActions({
        getMenuList: 'menu/getMenuList',
        destroyMenu: 'menu/destroyMenu'
      }),
      // 获取菜单
      async _getMenuList() {
        const res = await this.getMenuList();
        this.list = res.data.data;
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 更新
      update(id) {
        this.$router.push(`/menu/update/${id}`);
      },
      // 删除菜单
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此菜单吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyMenu(id);
              this.$Message.success('删除成功');

              this._getMenuList();

            } catch (e) {
              this.$Message.error(e);

            } finally {
              this.$Modal.remove();
            }

          },
          onCancel: () => {
            this.$Message.warning('取消！');
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
