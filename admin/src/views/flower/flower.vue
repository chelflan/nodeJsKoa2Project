<template>
    <div>
      <Row style="margin-bottom: 3px;">
        <Button type="primary" @click="_getFlowerList">刷新</Button>
      </Row>
      <Row>
        <Table border :columns="columns" :data="flowerList">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <!--<Button type="error" size="small" @click="destroy(row.id)">删除</Button>-->
            <Button type="primary" size="small" @click="view(row)">查看</Button>
            <Button type="primary" size="small" @click="insertFlowerSingel(row)">插入</Button>
          </template>
        </Table>

        <section class="page">
          <Page :total="page.total" :page-size="page.count" :current="page.currentPage" show-total
                @on-change="handlePage"></Page>
        </section>
      </Row>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
    export default {
        name: "flower",
        data(){
          return{
            page: {
              currentPage:1,
              count:10,
              total:0
            },
            flowerList:[],
            accessToken:"",
            columns: [
              {
                title: '标题',
                key: 'title',
                align: "center"
              },
              // {
              //   title: '摘要',
              //   key: 'digest'
              // },
              // {
              //   title: '封面',
              //   key: 'thumb_url'
              // },
              {
                title: '作者',
                key: 'author',
                align: "center"
              },
              {
                title: '操作',
                slot: 'action',
                align: 'center'
              }
            ]
          }
        },
       created(){
          this._getFlowerList();
       },
      methods:{
        ...mapActions({
          getBatchgetMaterial: 'flower/getBatchgetMaterial',
          insertFlower: 'flower/insertFlower',
          getFlowerList: 'flower/getFlowerList',
        }),
        async _getFlowerList(){
          const res = await this.getFlowerList({
            type:'news',
            offest: (this.page.currentPage - 1)*this.page.count,
            count: this.page.count
          });
          this.page.total = res.data.data.total_count;
          let data = res.data.data.item;
          this.flowerList = [];
          for(let item of data){
            this.flowerList.push({
              media_id:item.media_id,
              update_time:item.update_time,
              author:item.content.news_item[0].author,
              content:item.content.news_item[0].content,
              digest:item.content.news_item[0].digest,
              title:item.content.news_item[0].title,
              url:item.content.news_item[0].url,
              thumb_url:item.content.news_item[0].thumb_url
            });
          }
         },
        view(row){
          window.open(row.url);
        },
        handlePage(curentPage){
          this.page.currentPage = curentPage;
          this._getFlowerList();
        },
        insertFlowerSingel(row){
          // const res = await this.insertFlower(row);
          const res = this.insertFlower(row);
          console.log(row,"row")
        }
      }
    }
</script>

<style scoped>
  .page {
    padding: 32px 0;
    text-align: center;
  }
 </style>
