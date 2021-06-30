<template>
  <div class="SortFilter">
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
    <!--    <el-select-->
    <!--      v-model="searchParams.province"-->
    <!--      class="sortSelect"-->
    <!--      size="mini"-->
    <!--      placeholder="请选择"-->
    <!--      @change="setCityData"-->
    <!--    >-->
    <!--      <el-option-->
    <!--        v-for="item in provinceCity"-->
    <!--        :key="item.code"-->
    <!--        :label="item.label"-->
    <!--        :value="item.code"-->
    <!--      />-->
    <!--    </el-select>-->
    <!--    <el-select-->
    <!--      v-model="searchParams.city"-->
    <!--      class="sortSelect"-->
    <!--      style="margin-left: 30px;"-->
    <!--      size="mini"-->
    <!--      placeholder="请选择"-->
    <!--    >-->
    <!--      <el-option-->
    <!--        v-for="item in searchParams.cityData"-->
    <!--        :key="item.code"-->
    <!--        :label="item.label"-->
    <!--        :value="item.code"-->
    <!--      />-->
    <!--    </el-select>-->

    <!--    <el-cascader-->
    <!--      v-model="searchParams.tagFilter"-->
    <!--      class="sortSelect"-->
    <!--      multiple-->
    <!--      :options="tagFilterList[type]"-->
    <!--      :class="[provideData.theme+'-select']"-->
    <!--      :popper-class="provideData.theme+'-popperSelect'"-->
    <!--      style="margin-left: 20px;margin-right: 20px;"-->
    <!--      size="mini"-->
    <!--      placeholder="请选择"-->
    <!--    >-->
    <!--    </el-cascader>-->
    <span
      v-if="type === 'supplier' || type === 'sameSupplier'"
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
      type: String,
      default: () => 'supplier'
    }
  },
  data() {
    return {
      provinceCity: null,
      value: null,
      searchParams: {
        tagFilter: null,
        money1: null,
        money2: null,
        province: null,
        city: null,
        cityData: []
      },
      sortList: {
        supplier: [
          // {
          //   type: 'supplier',
          //   name: '综合排序',
          //   prop: '-default'
          // },
          /*  {
            type: 'supplier',
            name: '综合升序',
            prop: 'default'
          }, */
          // {
          //   type: 'supplier',
          //   name: '成交数量降序',
          //   prop: '-establish_time'
          // },
          /*  {
            type: 'supplier',
            name: '成交数量升序',
            prop: 'deal_count'
          }, */
          {
            type: 'supplier',
            name: '最近成交日期降序',
            prop: '-register_capital'
          },
          /*  {
            type: 'supplier',
            name: '最近成交日期升序',
            prop: 'deal_date'
          }, */
          {
            type: 'supplier',
            name: '注册资本降序',
            prop: '-register_capital'
          }
          /*    {
            type: 'supplier',
            name: '注册资本升序',
            prop: 'reg_cap'
          } */
        ],
        same_supplier: [
          {
            type: 'same_supplier',
            name: '综合排序',
            prop: '-default'
          },
          {
            type: 'same_supplier',
            name: '注册资本降序',
            prop: '-reg_cap'
          }
        ],
        purchaser: [
          {
            type: 'purchaser',
            name: '最近采购日期降序',
            prop: '-establish_time'
          },
          {
            type: 'purchaser',
            name: '注册资本降序',
            prop: '-register_capital'
          }
          // {
          //   type: 'purchaser',
          //   name: '注册资本升序',
          //   prop: 'reg_cap'
          // },
          // {
          //   type: 'purchaser',
          //   name: '采购数量降序',
          //   prop: '-purchaser_case_cnt'
          // }
        ],
        case: [
          {
            type: 'case',
            name: '发布时间降序',
            prop: '-publish_time'
          },
          {
            type: 'case',
            name: '成交金额降序',
            prop: '-case_winamount_sum'
          }
          /* {
            type: 'case',
            name: '案例区域',
            prop: 'case_location_code'
          } */
        ]
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
        this.$emit('filter-list', { location, type: this.type, reg_cap: this.reg_cap })
      }
    },
    toSearchList() {
      // eslint-disable-next-line camelcase
      const reg_cap = this.searchParams.money1 + ',' + this.searchParams.money2
      // eslint-disable-next-line camelcase
      this.reg_cap = reg_cap
      this.$emit('filter-list', { reg_cap, type: this.type, location: this.location })
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
