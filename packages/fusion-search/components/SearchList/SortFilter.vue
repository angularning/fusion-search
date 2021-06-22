<template>
  <div class="SortFilter">
    <span class="label1">筛选</span>
    <el-select
      class="sortSelect"
      v-model="searchParams.province"
      size="mini"
      placeholder="请选择"
      @change="setCityData"
    >
      <el-option
        v-for="item in provinceCity"
        :key="item.code"
        :label="item.label"
        :value="item.code"
      />
    </el-select>
    <el-select
      class="sortSelect"
      v-model="searchParams.city"
      style="margin-left: 30px;"
      size="mini"
      placeholder="请选择"
    >
      <el-option
        v-for="item in searchParams.cityData"
        :key="item.code"
        :label="item.label"
        :value="item.code"
      />
    </el-select>

    <el-select
      class="sortSelect"
      v-model="searchParams.tagFilter"
      style="margin-left: 20px;margin-right: 20px;"
      size="mini"
      placeholder="请选择"
    >
      <el-option
        v-for="item in tagFilterList[type]"
        :key="item.code"
        :label="item.label"
        :value="item.code"
      />
    </el-select>
    <span v-if="type === 'supplier' || type === 'sameSupplier'" class="label2">注册资本</span>
    <span v-else class="label2">中标金额</span>
    <el-input class="sortInput" size="mini" v-model="searchParams.money1">
      <span slot="prefix" class="normalSlotInput">￥</span>
      <span slot="suffix" class="normalSlotInput">万</span>
    </el-input>
    <span style="margin-left: 15px;margin-right: 15px;">——</span>
    <el-input class="sortInput" size="mini" v-model="searchParams.money2">
      <span slot="prefix" class="normalSlotInput">￥</span>
      <span slot="suffix" class="normalSlotInput">万</span>
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
      provinceCity,
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
          {
            type: 'supplier',
            name: '综合排序',
            prop: '-default'
          },
          /*  {
            type: 'supplier',
            name: '综合升序',
            prop: 'default'
          }, */
          {
            type: 'supplier',
            name: '成交数量降序',
            prop: '-deal_count'
          },
          /*  {
            type: 'supplier',
            name: '成交数量升序',
            prop: 'deal_count'
          }, */
          {
            type: 'supplier',
            name: '最近成交日期降序',
            prop: '-deal_date'
          },
          /*  {
            type: 'supplier',
            name: '最近成交日期升序',
            prop: 'deal_date'
          }, */
          {
            type: 'supplier',
            name: '注册资本降序',
            prop: '-reg_cap'
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
          /* {
            type: 'supplier',
            name: '成交数量降序',
            prop: '-deal_count'
          },
          /!*  {
            type: 'supplier',
            name: '成交数量升序',
            prop: 'deal_count'
          }, *!/
          {
            type: 'supplier',
            name: '最近成交日期降序',
            prop: '-deal_date'
          },
          /!*  {
            type: 'supplier',
            name: '最近成交日期升序',
            prop: 'deal_date'
          }, *!/
          {
            type: 'supplier',
            name: '注册资本降序',
            prop: '-reg_cap'
          },
          /!*    {
            type: 'supplier',
            name: '注册资本升序',
            prop: 'reg_cap'
          } *!/ */
        ],
        purchaser: [
          /* {
            type: 'purchaser',
            name: '最近采购日期降序',
            prop: '-purchase_date'
          }, */
          /*   {
            type: 'purchaser',
            name: '最近采购日期升序',
            prop: 'purchase_date'
          }, */
          /* {
            type: 'purchaser',
            name: '采购次数降序',
            prop: '-purchase_count'
          }, */
          /*  {
            type: 'purchaser',
            name: '采购次数升序',
            prop: 'purchase_count'
          }, */
          {
            type: 'purchaser',
            name: '注册资本降序',
            prop: '-reg_cap'
          },
          {
            type: 'purchaser',
            name: '注册资本升序',
            prop: 'reg_cap'
          },
          {
            type: 'purchaser',
            name: '最近采购日期降序',
            prop: '-purchaser_recent_date'
          },
          {
            type: 'purchaser',
            name: '采购数量降序',
            prop: '-purchaser_case_cnt'
          }
        ],
        case: [
          {
            type: 'case',
            name: '发布时间降序',
            prop: '-case_release_date'
          },
          {
            type: 'case',
            name: '发布时间升序',
            prop: 'case_release_date'
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
            code: '123',
            label: '123'
          }
        ]
      }
    }
  },
  computed: {},
  methods: {
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
    color: rgba(28, 45, 90, 0.5);
    margin-right: 20px;
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
