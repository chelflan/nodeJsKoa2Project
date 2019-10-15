<template>
  <div>
    <Row style="margin-bottom: 3px;">
      <Button type="primary" @click="_getFlowerList">刷新</Button>
      <Button @click="handleSelectAll(true)">全选</Button>
      <Button @click="handleSelectAll(false)">全不选</Button>
      <Button @click="patchInsert">批量插入</Button>
    </Row>
    <Row>
      <Table border :columns="columns" :data="flowerList"  ref="selection" @on-select-all="selectAll" @on-select-all-cancel="cancelAll">
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
    data() {
      return {
        selectData:[],
        page: {
          currentPage: 1,
          count: 10,
          total: 0
        },
        flowerList: [],
        accessToken: "",
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
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
    created() {
      this._getFlowerList();
    },
    methods: {
      ...mapActions({
        getBatchgetMaterial: 'flower/getBatchgetMaterial',
        insertFlower: 'flower/insertFlower',
        getFlowerList: 'flower/getFlowerList',
      }),
      selectAll(selection){
        this.selectData = selection;
      },
      cancelAll(selection){
        this.selectData = selection;
      },
      patchInsert(){
        if(this.selectData.length == 0){
          this.$Message.warning("只支持当前页全部数据一起出入");
          return;
        }
        for(let item of this.selectData){
          this.insertFlowerSingel(item);
        }
      },
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },
      async _getFlowerList() {
        const res = await this.getFlowerList({
          type: 'news',
          offest: (this.page.currentPage - 1) * this.page.count,
          count: this.page.count
        });
        this.page.total = res.data.data.total_count;
        let data = res.data.data.item;
        this.flowerList = [];
        for (let item of data) {
          this.flowerList.push({
            media_id: item.media_id,
            update_time: item.update_time,
            author: item.content.news_item[0].author,
            // content:"<p><img src=\"http://img01.store.sogou.com/net/a/04/link?appid=100520029&url="+item.content.news_item[0].thumb_url.replace('http','https')+"\"/></p></br>"+this.getChinese(item.content.news_item[0].content)+"</br><a style='color: #f7f110;text-decoration: #fff' target='_blank' href="+item.content.news_item[0].url+">为了更好的体验,请点击查看原文>>>>>>>>>></a>",
            // content:"<img src=\""+item.content.news_item[0].thumb_url.replace('http','https')+"\"/>"+this.getChinese(item.content.news_item[0].content)+"</br><a style='color: #f7f110;text-decoration: #fff' target='_blank' href="+item.content.news_item[0].url+">为了更好的体验,请点击查看原文>>>>>>>>>></a>",
            content: this.formatPara(item.content.news_item[0]),
            digest: item.content.news_item[0].digest,
            title: item.content.news_item[0].title,
            url: item.content.news_item[0].url,
            thumb_url: item.content.news_item[0].thumb_url,
            tag: "",
          });
        }
      },
      formatPara(itemData) {
        let strValue = itemData.content;
        let title = itemData.title;
        let url = itemData.url;
        if (strValue != null && strValue != "") {

          let reg = /[\u4e00-\u9fa5]/g;
          // let chinesePara = strValue.match(reg).join("");


          strValue = strValue.replace(/\<[^>]*\>(([^<])*)/g, function () {

            return arguments[1];

          });

          strValue = strValue.substring(0, strValue.length - 1);

          let chinesePara = strValue;

          if(title.indexOf("-") == -1){
            return "";
          }
          title = title.split("-")[1].match(reg).join("");

          let para = "";


          para += "<div style='text-align: center;overflow: auto;'><img title="+title+" alt="+title+" src=http://img01.store.sogou.com/net/a/04/link?appid=100520029&url="+itemData.thumb_url+"></div>"

          let doubleTitle = title + title;

          chinesePara = chinesePara.replace(doubleTitle, "");

          let arrPara = chinesePara.split(title);

          let len = arrPara.length;
          if (len <= 1) {
            return "";
          }
          if (arrPara[len - 1].indexOf("--END--") != -1) {
            arrPara[len - 1] = "<p style='color: #dd6161'>" + arrPara[len - 1].split("--END--")[1] + "</p>";
          }

          for (let i = 1; i < len; i++) {
            // if(arrPara[i].search(/形态特征|繁殖方式|生长习性|主要价值|来源/i) != -1 || i == 1){

            if (arrPara[i].search(/花语|花外之音/i) != -1 || arrPara[i].length < 15) {
              continue;
            }
            if (arrPara[i].search(/来源/i) != -1) {
              para += arrPara[i];
              continue;
            }
            arrPara[i] = arrPara[i].replace(new RegExp('&nbsp;', "g"), "");
            arrPara[i] = "<a  target='_blank' href=" + url + " style='color:yellow;text-decoration: underline'>" + title + "</a>" + arrPara[i];
            para += "<p style='line-height: 22px;letter-spacing: 2px;text-indent: 2em;'>" + arrPara[i] + "</p>"
          }

          para += "<div style='color: #24be48;'><hr><a style='color: #24be48;text-decoration: underline;font-size: large;padding: 15px;display: inline-block;' target='_blank' href=" + url + ">【查看原文】为了更好的体验,请点击查看原文</a><hr></div>"
          // para += "<div style='text-align: center;margin-right: 30px'><img src=https://img01.store.sogou.com/net/a/04/link?appid=100520029&url="+itemData.thumb_url.replace("http","https")+"></div>"
          para += "<div style='text-align: center;'><img style='display:none;' src='http://upload.chelflan.cn/Fiahr1gGcyN3tXiPDoTup5ZXSlmc' style='width: 300px;'></div>"
          para += "<div style='text-align: center;font-size: 13px;'><img src='http://upload.chelflan.cn/Fn64eg8NsS_4FgXdQlt_pWAZKzZH' style='width: 300px;'><p style='color: #24be48;'>更多精彩请关注【每日一花 Daily Flower】公众号</p></div>"

          return para;
        }
        else
          return "";
      },
      view(row) {
        window.open(row.url);
      },
      handlePage(curentPage) {
        this.page.currentPage = curentPage;
        this._getFlowerList();
      },
      insertFlowerSingel(row) {
        // const res = await this.insertFlower(row);
        const res = this.insertFlower(row);

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
