<template>
  <div class="HitProductDescription" v-loading="loading">
    <div class="hitProductWrap">
      <div class="publicDesTitle">产品概览</div>
      <div class="desNormalTitle">
        供应商注册资本占比
      </div>
      <div class="chartWrap">
        <ZbChart :options="options" />
      </div>
      <div class="desNormalTitle">
        产品落地次数分布
      </div>
      <div class="chartWrap">
        <ZbChart :options="optionsLine" :height="'200px'" />
      </div>
    </div>
    <SameProductList :list="[1, 2, 3, 4]" />
  </div>
</template>

<script>
import ZbChart from '../Echarts/ZbChart'
import DescriptionTag from './DescriptionTag'
import SameProductList from './SameProductList'
// eslint-disable-next-line camelcase
import { city_group } from '../../common/city'

export default {
  name: 'HitProductDescription',
  inject: ['provideData'],
  props: {},
  data() {
    return {
      city_group,
      loading: false,
      list: [
        { release_date: '2018Q2', count: 146 },
        { release_date: '2018Q3', count: 1477 },
        { release_date: '2018Q4', count: 1638 },
        { release_date: '2019Q1', count: 890 },
        { release_date: '2019Q2', count: 912 },
        { release_date: '2019Q3', count: 1410 },
        { release_date: '2019Q4', count: 1487 },
        { release_date: '2020Q1', count: 542 },
        { release_date: '2020Q2', count: 917 },
        { release_date: '2020Q3', count: 1393 },
        { release_date: '2020Q4', count: 1759 },
        { release_date: '2021Q1', count: 793 },
        { release_date: '2021Q2', count: 0 }
      ],
      type: '123'
    }
  },
  components: {
    DescriptionTag,
    SameProductList,
    ZbChart
  },
  computed: {
    regOrder() {
      return ['5000万以上', '1000-5000万', '500-1000万', '200-500万', '100-200万', '100万以下']
    },
    optionsLine() {
      const option = {
        grid: {
          top: '8%',
          left: '3%',
          right: '10%',
          bottom: '5',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            margin: 10,
            color: '#B3B9C6'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#B3B9C6'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: this.list.map((x) => x.release_date)
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              margin: 10,
              color: '#B3B9C6'
            },

            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E1E9FF',
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#B3B9C6'
              }
            }
          }
        ],
        series: [
          {
            type: 'line',
            showAllSymbol: true,
            symbol: 'emptyCircle',
            smooth: true,
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: '#3A72FF' // 线条颜色
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#3A72FF' },
                    { offset: 1, color: 'rgba(41, 98, 237, 0)' }
                  ]
                }
              }
            },
            itemStyle: {
              color: '#ffffff',
              borderColor: 'rgba(58,114,255,1)',
              borderWidth: 1
            },
            data: this.list.map((item) => item.count)
          }
        ]
      }
      return option
    },
    options() {
      const legendData = this.getData()
      // if (this.reg) {
      //   legendData.sort((a, b) => this.regOrder.indexOf(a) - this.regOrder.indexOf(b))
      // }
      const option = {
        color: ['#3CD3A7', '#F8C51E', '#E89B55', '#3A72FF'],
        grid: {
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter(params) {
            let val = params.value || 0
            if (Number.isNaN(val)) {
              val = 0
            }
            return params.name + ' : ' + val + `(${params.percent}%)`
          }
        },
        legend: [
          {
            orient: 'vertical',
            top: 'middle',
            right: '1%',
            textStyle: {
              color: '#4A4A4A',
              fontSize: 10
            },
            itemHeight: 10,
            data: legendData,
            icon: 'roundRect'
          }
        ],
        series: [
          // 主要展示层的
          {
            radius: ['0%', '50%'],
            center: ['35%', '50%'],
            type: 'pie',
            label: {
              normal: {
                position: 'outside',
                color: '#000',
                fontSize: 12,
                formatter: '{d}%'
              }
            },
            labelLine: {
              show: false,
              length: 2,
              length2: 4
            },
            data: this.getData()
          }
        ]
      }
      return option
    }
  },
  methods: {
    getData() {
      return [
        { name: '北京市', value: 25 },
        { name: '浙江', value: 17 },
        { name: '江苏', value: 5 },
        { name: '上海市', value: 4 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.chartWrap {
  border: 1px #eee solid;
  border-radius: 4px;
  margin: 10px 0;
}
.HitProductDescription {
  .hitProductWrap {
    background: #ffffff;
    padding: 20px;

    .publicDesTitle {
      font-size: 14px;
      font-weight: bold;
      padding-bottom: 12px;
      border-bottom: 1px #eee solid;
    }

    .desNormalTitle {
      color: rgba(179, 185, 198, 1);
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>
