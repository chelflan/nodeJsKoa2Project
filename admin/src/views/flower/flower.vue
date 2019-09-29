<template>
    <div>
      每日更新
      <Button @click="_getFlowerList">点击</Button>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
    export default {
        name: "flower",
        data(){
          return{
            currentPage:0,
            count:10,
            accessToken:""
          }
        },
       created(){
          this._getFlowerList();
       },
      methods:{
        ...mapActions({
          getBatchgetMaterial: 'flower/getBatchgetMaterial',
          updateMaterial: 'flower/updateMaterial',
          getFlowerList: 'flower/getFlowerList',
        }),
        async _getFlowerList(){
          const res = await this.getFlowerList();
          console.log(res,"res");
          // this.accessToken = JSON.parse(res.data.data).access_token;
          // console.log(this.accessToken,"this.accessToken");
          // this._getBatchgetMaterial(this.accessToken);
         },
        async _getBatchgetMaterial(accessToken){
          const res = await this.getBatchgetMaterial({
            accessToken:accessToken,
            type:'news',
            offest: this.currentPage,
            count: this.count
          });

          console.log(res,"----结果---getBatchgetMaterial")
         }
      }
    }
</script>

<style scoped>

</style>
