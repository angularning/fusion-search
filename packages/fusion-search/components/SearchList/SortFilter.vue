<template>
  <div class="SortFilter">
    <template v-if="!(provideData.hit ==='purchaser' && type ==='supplier')">
      <span class="label1">服务地区筛选</span>
      <el-cascader
        ref="myCascader"
        v-model="value"
        size="mini"
        style="margin-left: 20px;margin-right: 20px;"
        :popper-class="provideData.theme+'-popperSelect'"
        :class="[provideData.theme+'-select']"
        clearable
        :options="provinceCity"
        @change="handleChange(value)"
      />
    </template>
    <span
      v-if="Object.values(type).join() === 'supplier' || Object.values(type).join() === 'purchaser'"
      class="label2"
    >注册资本</span>
    <span
      v-else
      class="label2"
    >中标金额</span>
    <el-input
      v-model="searchParams.money1"
      :class="[provideData.theme+'-input']"
      class="sortInput"
      size="mini"
    >
      <span
        slot="prefix"
        class="normalSlotInput"
      >￥</span>
      <span
        slot="suffix"
        class="normalSlotInput"
      >万</span>
    </el-input>
    <span style="margin-left: 15px;margin-right: 15px;">——</span>
    <el-input
      v-model="searchParams.money2"
      :class="[provideData.theme+'-input']"
      class="sortInput"
      size="mini"
      @keyup.enter.native="toSearchList"
    >
      <span
        slot="prefix"
        class="normalSlotInput"
      >￥</span>
      <span
        slot="suffix"
        class="normalSlotInput"
      >万</span>
    </el-input>
  </div>
</template>

<script>
import { provinceCity } from './provinceCity'

export default {
  name: 'SortFilter',
  inject: ['provideData'],
  props: {
    type: {
      type: Object,
      default: () => {}
    },
    search: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      provinceCity: null,
      value: null,
      money: null,
      searchParams: {
        tagFilter: null,
        money1: null,
        money2: null,
        province: null,
        city: null,
        cityData: []
      },
      tagFilterList: {
        supplier: [
          {
            code: '生产属性',
            label: '生产属性',
            value: '生产属性',
            children: [
              {
                code: '经销商',
                label: '经销商',
                value: '经销商'
              },
              {
                code: '厂商',
                label: '厂商',
                value: '厂商'
              },
              {
                code: '电商',
                label: '电商',
                value: '电商'
              }
            ]
          },
          {
            code: '公司类型',
            label: '公司类型',
            value: '公司类型',
            children: [
              {
                code: '经销商',
                label: '经销商',
                value: '经销商'
              },
              {
                code: '厂商',
                label: '厂商',
                value: '厂商'
              },
              {
                code: '电商',
                label: '电商',
                value: '电商'
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    search: {
      deep: true,
      immediate: true,
      handler(value) {
        if (value) {
          this.value = null
          this.searchParams.money1 = null
          this.searchParams.money2 = null
        }
      }
    }
  },
  created() {
    this.provinceCity = this.addValues(provinceCity)
  },
  methods: {
    addValues(value) {
      return value.map(item => {
        const children = item.children.map(res => {
          return { ...res, value: res.label }
        })
        return { ...item, value: item.label, children }
      })
    },
    handleChange(value) {
      if (value) {
        const n = this.$refs.myCascader.getCheckedNodes()[0]
        const location = n && n.data.code
        this.location = location
        this.$emit('filter-list', { location, type: Object.values(this.type).join(), money: this.money })
      }
    },
    toSearchList() {
      // eslint-disable-next-line camelcase
      const money = this.searchParams.money1 + ',' + this.searchParams.money2
      // eslint-disable-next-line camelcase
      this.money = money
      this.$emit('filter-list', { money, type: Object.values(this.type).join(), location: this.location })
    },
    setCityData() {
      this.provinceCity.forEach((item) => {
        if (item.code === this.searchParams.province) {
          this.searchParams.city = null
          this.searchParams.cityData = item.children
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../common/common';

.SortFilter {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  .label1 {
    font-size: 12px;
    font-family: MicrosoftYaqiHei;
    color: rgba(28, 45, 90, 1);
    margin-right: 10px;
  }
  .label2 {
    font-size: 12px;
    font-family: MicrosoftYaqiHei;
    color: rgba(28, 45, 90, 1);
    margin-right: 20px;
  }
  .sortInput {
    width: 100px;
  }

  .sortSelect {
    width: 140px;
  }
}

.normalSlotInput {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #1c2d5a;
}
</style>
