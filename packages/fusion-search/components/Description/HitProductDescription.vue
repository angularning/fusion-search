<template>
  <div
    v-loading="loading"
    class="HitProductDescription"
  >
    <div class="hitProductWrap">
      <div class="publicDesTitle">
        产品概览
      </div>
      <template v-if="data.supplier_reg_cap && data.supplier_reg_cap.length>0">
        <div
          class="desNormalTitle"
        >
          供应商注册资本占比
        </div>
        <div
          class="chartWrap"
        >
          <ZbChart :options="options" />
        </div>
      </template>
      <div class="desNormalTitle">
        产品落地次数分布
      </div>
      <div class="chartWrap">
        <ZbChart
          :options="optionsLine"
          :height="'200px'"
        />
      </div>
      <div class="desNormalTitle">
        产品供应商区域分布
      </div>
      <div class="chartWrap">
        <ZbChart
          :options="optionsMap"
          :height="'200px'"
        />
      </div>
    </div>
    <SameProductList :type="'product'" :list="list" />
  </div>
</template>

<script>
import ZbChart from '../Echarts/ZbChart'
// import DescriptionTag from './DescriptionTag'
import SameProductList from './SameProductList'
// eslint-disable-next-line camelcase
import { city_group } from '../../common/city'
const geoCoordMap = {
  黑龙江省: [127.9688, 45.368],
  内蒙古自治区: [110.3467, 41.4899],
  吉林省: [125.8154, 44.2584],
  北京市: [116.4551, 40.2539],
  辽宁省: [123.1238, 42.1216],
  河北省: [114.4995, 38.1006],
  天津市: [117.4219, 39.4189],
  山西省: [112.3352, 37.9413],
  陕西省: [109.1162, 34.2004],
  甘肃省: [103.5901, 36.3043],
  宁夏回族自治区: [106.3586, 38.1775],
  青海省: [101.4038, 36.8207],
  新疆维吾尔自治区: [87.9236, 43.5883],
  西藏自治区: [91.11, 29.97],
  四川省: [103.9526, 30.7617],
  重庆市: [108.384366, 30.439702],
  山东省: [117.1582, 36.8701],
  河南省: [113.4668, 34.6234],
  江苏省: [118.8062, 31.9208],
  安徽省: [117.29, 32.0581],
  湖北省: [114.3896, 30.6628],
  浙江省: [119.5313, 29.8773],
  福建省: [119.4543, 25.9222],
  厦门市: [118.0952, 24.4867],
  江西省: [116.0046, 28.6633],
  湖南省: [113.0823, 28.2568],
  贵州省: [106.6992, 26.7682],
  云南省: [102.9199, 25.4663],
  广东省: [113.12244, 23.009505],
  广西壮族自治区: [108.479, 23.1152],
  海南省: [110.3893, 19.8516],
  上海市: [121.4648, 31.2891]
}
export default {
  name: 'HitProductDescription',
  inject: ['provideData'],
  components: {
    // DescriptionTag,
    SameProductList,
    ZbChart
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      city_group,
      loading: false,
      type: '123'
    }
  },
  computed: {
    regOrder() {
      return ['5000万以上', '1000-5000万', '500-1000万', '200-500万', '100-200万', '100万以下']
    },
    optionsMap () {
      const option = {
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter (params) {
            let val = params.value || 0
            if (Number.isNaN(val)) {
              val = 0
            }
            return params.name + ' : ' + val
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: this.getMaxCount(),
          inRange: {
            color: ['rgba(58, 114, 255, 0.2)', 'rgba(58, 114, 255, 1)']
          },
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '新动能城市成长指数',
            type: 'map',
            map: 'china',
            top: '2%',
            bottom: '8%',
            coordinateSystem: 'geo',
            aspectScale: 0.75, // 长宽比
            data: this.convertData(),
            // tooltip: {
            //   show: false
            // },
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: 'rgba(58, 114, 255, 0.01)',
                borderColor: 'rgba(58, 114, 255, 0.6)',
                borderWidth: 1
              },
              emphasis: {
                areaColor: 'rgb(10, 105, 187, 0.5)'
              }
            }
          }
        ]
      }
      return option
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
          data: this.getCaseNumName()
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
            data: this.getCaseNumValue()
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
  created() {
  },
  methods: {
    getCaseNumValue() {
      if (JSON.stringify(this.data) === '{}') return []
      return this.data.case_num.map(item => item.value)
    },
    getCaseNumName() {
      if (JSON.stringify(this.data) === '{}') return []
      return this.data.case_num.map(item => item.name)
    },
    getData() {
      if (JSON.stringify(this.data) === '{}') return []
      return this.data.supplier_reg_cap.map(item => {
        return { ...item }
      })
    },
    convertData () {
      if (JSON.stringify(this.data) === '{}') return
      const data = this.data && this.data.supplier_location
      const res = []
      for (let i = 0; i < data.length; i++) {
        const code = data[i].name
        const name = city_group[code]
        const geoCoord = geoCoordMap[name]
        if (geoCoord) {
          res.push({
            name,
            value: data[i].value
          })
        }
      }
      return res
    },
    getMaxCount () {
      if (JSON.stringify(this.data) === '{}') return
      const lists = (this.data && this.data.supplier_location).map(o => o.value)
      const max = Math.max.apply(null, lists)
      return max
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
