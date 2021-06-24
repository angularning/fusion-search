<template>
  <div class="SortList">
    <el-select
      v-model="current"
      :class="[provideData.theme+'-select']"
      :popper-class="provideData.theme+'-popperInput'"
      class="sortSelectList"
      size="mini"
      placeholder="请选择"
    >
      <el-option
        v-for="(item, i) in sortList[type]"
        :key="i"
        :label="item.name"
        :value="item.prop"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SortList',
  inject: ['provideData'],
  props: {
    type: {
      type: String,
      default: () => 'supplier'
    }
  },
  data() {
    return {
      active: 0,
      current: null,
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
        sameSupplier: [
          {
            type: 'sameSupplier',
            name: '综合排序',
            prop: '-default'
          },
          {
            type: 'sameSupplier',
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
      }
    }
  },
  watch: {
    type: {
      immediate: true,
      handler() {
        this.current = this.sortList[this.type][0]['prop']
      }
    }
  },
  created() {
    // current(){
    //   return this.sortList[this.type][0].prop
    // }
  },
  methods: {
    toSort(item, i) {
      this.active = i
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.XUNYUAN-activeSort {
  color: $blue1 !important;
}
.SortList {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  .sortSelectList {
    width: 120px !important;
  }
  .tags {
    font-size: 12px;
    font-family: MicrosoftYaqiHei;
    color: rgba(28, 45, 90, 0.5);
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
