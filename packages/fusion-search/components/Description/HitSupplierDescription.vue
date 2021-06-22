<template>
  <div
    v-loading="loading"
    class="HitSupplierDescription"
  >
    <div class="hitProductWrap">
      <div class="publicDesTitle">
        服务概览
      </div>
      <div class="desNormalTitle">
        服务地区
      </div>
      <div class="locationTag">
        <DescriptionTag
          :list="list"
          :type="type"
        />
      </div>
      <div class="desNormalTitle">
        服务领域
      </div>
      <div class="locationTag">
        <DescriptionTag
          :list="list"
          :type="type"
        />
      </div>
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
          :options="options1"
          :height="'200px'"
        />
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
  name: 'HitSupplierDescription',
  inject: ['provideData'],
  components: {
    DescriptionTag,
    SameProductList,
    ZbChart
  },
  props: {},
  data() {
    return {
      city_group,
      loading: false,
      list1: [
        { tag_name: '屋面防水工程', count: 4 },
        { tag_name: '防水工程', count: 3 },
        { tag_name: '装饰装修改造', count: 2 },
        { tag_name: '基础设施改造', count: 2 }
      ],
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
  computed: {
    regOrder() {
      return ['5000万以上', '1000-5000万', '500-1000万', '200-500万', '100-200万', '100万以下']
    },
    options1() {
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
        yAxis: [
          {
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
            data: this.getData1().map((item) => item.name) || []
          },
          {
            axisTick: 'none',
            axisLine: 'none',
            splitLine: 'none',
            axisLabel: {
              textStyle: {
                color: '#3A72FF',
                fontSize: '12'
              }
            },
            data: this.getData1().map((item) => item.value) || []
          }
        ],
        series: [
          {
            name: '总量',
            type: 'bar',
            barWidth: 8,
            data: this.getMaxCount(),
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
            data: this.getData1().map((item) => {
              return { name: item.name, value: item.value }
            })
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
    getMaxCount() {
      const lists = this.list1.map((item) => item.count)
      const max = Math.max.apply(null, lists)
      return new Array(lists.length).fill(max)
    },
    getData1() {
      return this.list1
        .map((item) => {
          return { name: item.tag_name, value: item.count }
        })
        .reverse()
    },
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
