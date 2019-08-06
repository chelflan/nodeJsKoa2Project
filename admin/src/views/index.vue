<template>
  <div>
    <h1 style="text-align: center;margin-top: 100px">{{ msg }}</h1>
    <div style="width: 100%;height: 300px;border:1px solid rgb(180,180,180)" id="echarts"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Index',
    data () {
      return {
        msg: 'Welcome to Your Backstage',
        echarts1_option: {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      }
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('echarts'));
      // 绘制图表，this.echarts1_option是数据
      myChart.setOption(this.echarts1_option);
    },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
