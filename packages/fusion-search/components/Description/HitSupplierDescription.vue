<template>
  <div
    v-loading="loading"
    class="HitSupplierDescription"
  >
    <div
      class="hitProductWrap"
    >
      <div class="publicDesTitle">
        服务概览
      </div>
      <div class="desNormalTitle">
        服务地区
      </div>
      <div class="locationTag">
        <DescriptionTag
          :list="locations"
        />
      </div>
      <!--      <div class="desNormalTitle">-->
      <!--        服务领域-->
      <!--      </div>-->
      <!--      <div class="locationTag">-->
      <!--        <DescriptionTag-->
      <!--          :list="list"-->
      <!--        />-->
      <!--      </div>-->
      <div
        class="publicDesTitle"
        style="margin-top: 20px;"
      >
        采购分析
      </div>
      <div class="desNormalTitle">
        合作业主区域分布
      </div>
      <div class="chartWrap">
        <ZbChart :options="options" />
      </div>
      <div class="desNormalTitle">
        服务产品主要分类（次）
      </div>
      <div class="chartWrap">
        <ZbChart
          :options="optionsSupplier"
          :height="'200px'"
        />
      </div>
    </div>
    <SameProductList
      :type="'supplier'"
      :list="list"
    />
  </div>
</template>

<script>
import ZbChart from '../Echarts/ZbChart'
import DescriptionTag from './DescriptionTag'
import SameProductList from './SameProductList'

// eslint-disable-next-line camelcase
import { city_group } from '../../common/city'

export default {
  name: 'HitSupplierDescription',
  inject: ['provideData'],
  components: {
    SameProductList,
    DescriptionTag,
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
      loading: false
    }
  },
  computed: {
    regOrder() {
      return ['5000万以上', '1000-5000万', '500-1000万', '200-500万', '100-200万', '100万以下']
    },
    optionsSupplier() {
      const option = {
        grid: {
          top: '2%',
          left: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          axisLabel: 'none',
          axisTick: 'none',
          axisLine: 'none',
          splitLine: 'none'
        },
        yAxis: [{
          type: 'category',
          axisTick: 'none',
          axisLine: 'none',
          splitLine: 'none',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#222',
              fontSize: '12'
            }
          },
          data: this.getDataSupplier() && this.getDataSupplier().map(item => item.name)
        }, {
          axisTick: 'none',
          axisLine: 'none',
          splitLine: 'none',
          axisLabel: {
            textStyle: {
              color: '#3A72FF',
              fontSize: '12'
            }
          },
          data: this.getDataSupplier() && this.getDataSupplier().map(item => item.value)
        }],
        series: [
          {
            name: '总量',
            type: 'bar',
            barWidth: 8,
            data: this.getMaxCountSupplier(),
            barGap: '-100%',
            silent: true,
            itemStyle: {
              barBorderRadius: 4,
              color: 'rgba(58, 114, 255, 0.09)'
            }
          },
          {
            type: 'bar',
            itemStyle: {
              barBorderRadius: 4,
              color: '#3A72FF'
            },
            barWidth: 8,
            silent: true,
            data: this.getDataSupplier() && this.getDataSupplier().map(item => {
              return { name: item.name, value: item.value }
            })
          }
        ]
      }
      return option
    },
    options() {
      const legendData = this.getData()
      if (this.reg) {
        legendData.sort((a, b) => this.regOrder.indexOf(a) - this.regOrder.indexOf(b))
      }
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
    },
    locations() {
      if (JSON.stringify(this.data) === '{}' || this.data === '') return []
      return (this.data && this.data.service_area).map(item => {
        if (item !== '0000') {
          return city_group[item]
        }
      })
    }
  },
  methods: {
    getMaxCountSupplier () {
      if (JSON.stringify(this.data) === '{}' || this.data === '') return
      const lists = this.data.product_count.map(item => item.value)
      const max = Math.max.apply(null, lists)
      return new Array(lists.length).fill(max)
    },
    getDataSupplier () {
      if (JSON.stringify(this.data) === '{}' || this.data === '') return []
      return (this.data && this.data.product_count).map(item => {
        return { name: item.name, value: item.value }
      }).reverse()
    },
    getCaseNumValue() {
      if (JSON.stringify(this.data) === '{}' || this.data === '') return []
      return this.data.product_count.map(item => item.value)
    },
    getCaseNumName() {
      if (JSON.stringify(this.data) === '{}' || this.data === '') return []
      return this.data.product_count.map(item => item.name)
    },
    getData() {
      if (JSON.stringify(this.data) === '{}' || this.data === '') return []
      return this.data.purchaser_location.map(item => {
        return {
          name: city_group[item.name],
          value: item.value
        }
      }).slice(0, 8)
    },
    getMaxCount () {
      if (JSON.stringify(this.data) === '{}' || this.data === '') return
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
.HitSupplierDescription {
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
