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
            count:10
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
          const res = await this.getFlowerList({
            offest: this.currentPage,
            count: this.count

          });

          console.log(res,"----结果---res")
         }
      }
    }
</script>

<style scoped>

</style>
