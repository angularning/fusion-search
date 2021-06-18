<template>
  <div class="SortList">
    <div
      class="tags"
      @click="toSort(item, i)"
      v-for="(item, i) in sortList[type]"
      :class="[active === i ? theme + '-activeSort' : '']"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortList',
  inject: ['theme', 'hit'],
  props: {
    type: {
      type: String,
      default: () => 'supplier'
    }
  },
  data() {
    return {
      theme: this.theme,
      hit: this.hit,
      active: 0,
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
      }
    }
  },
  computed: {},
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
  .tags {
    font-size: 12px;
    font-family: MicrosoftYaqiHei;
    color: rgba(28, 45, 90, 0.5);
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
