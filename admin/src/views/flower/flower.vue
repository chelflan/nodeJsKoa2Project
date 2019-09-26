<template>
    <div>
      每日更新
      <Button @click="_getToken">点击</Button>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
    export default {
        name: "flower",
        data(){
          return{

          }
        },
       created(){
          this._getToken();
       },
      methods:{
        ...mapActions({
          getBatchgetMaterial: 'flower/getBatchgetMaterial',
          updateMaterial: 'flower/updateMaterial',
          getToken: 'flower/getToken',
        }),
        async _getBatchgetMaterial(){
          const res = await this.getBatchgetMaterial({
            offset: 0,
            count:2
          });

         },
        async _getToken(){
          const res = await this.getToken();
          console.log(res,"-------res")
         }
      }
    }
</script>

<style scoped>

</style>
