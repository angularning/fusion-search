<template>
  <div class="SortList">
    <el-select
      v-model="current"
      :class="[provideData.theme+'-select']"
      :popper-class="provideData.theme+'-popperInput'"
      class="sortSelectList"
      size="mini"
      placeholder="请选择"
      @change="toSort"
    >
      <el-option
        v-for="(item, i) in sortList[Object.keys(type)][Object.values(type)]"
        :key="i"
        :label="item.name"
        :value="item.name"
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
      type: Object,
      default: () => {}
    }
    // search: {
    //   type: String,
    //   default: () => null
    // }
  },
  data() {
    return {
      active: 0,
      msg0: null,
      msg1: null,
      current: null,
      sortList: {
        product: {
          supplier: [
            {
              type: 'supplier',
              name: '综合排序',
              prop: 'default'
            },
            {
              type: 'supplier',
              name: '注册资本降序',
              prop: '-register_capital'
            },
            {
              type: 'supplier',
              name: '注册资本升序',
              prop: 'register_capital'
            },
            {
              type: 'supplier',
              name: '最近成立时间升序',
              prop: 'establish_time'
            },
            {
              type: 'supplier',
              name: '最近成交日期降序',
              prop: '-publish_time'
            }
          ],
          case: [
            {
              type: 'case',
              name: '发布时间降序',
              prop: '-publish_time'
            },
            {
              type: 'case',
              name: '按中标金额升序',
              prop: 'case_winamount_sum'
            },
            {
              type: 'case',
              name: '按中标金额降序',
              prop: '-case_winamount_sum'
            }
          ],
          purchaser: [
            {
              type: 'purchaser',
              name: '注册资本降序',
              prop: '-register_capital'
            },
            {
              type: 'purchaser',
              name: '最近采购日期降序',
              prop: '-publish_time'
            }
          ]
        },
        supplier: {
          case: [
            {
              type: 'case',
              name: '发布时间降序',
              prop: '-publish_time'
            },
            {
              type: 'case',
              name: '按中标金额升序',
              prop: 'case_winamount_sum'
            },
            {
              type: 'case',
              name: '按中标金额降序',
              prop: '-case_winamount_sum'
            }
          ],
          purchaser: [
            {
              type: 'purchaser',
              name: '注册资本降序',
              prop: '-register_capital'
            },
            {
              type: 'purchaser',
              name: '最近采购日期降序',
              prop: '-publish_time'
            }
          ]
        },
        purchaser: {
          case: [
            {
              type: 'case',
              name: '发布时间降序',
              prop: '-publish_time'
            },
            {
              type: 'case',
              name: '按中标金额升序',
              prop: 'case_winamount_sum'
            },
            {
              type: 'case',
              name: '按中标金额降序',
              prop: '-case_winamount_sum'
            }
          ],
          supplier: [
            // {
            //   type: 'supplier',
            //   name: '综合排序',
            //   prop: 'default'
            // },
            {
              type: 'supplier',
              name: '注册资本降序',
              prop: '-register_capital'
            },
            {
              type: 'supplier',
              name: '注册资本升序',
              prop: 'register_capital'
            },
            {
              type: 'supplier',
              name: '最近成立时间升序',
              prop: 'establish_time'
            },
            {
              type: 'supplier',
              name: '最近成交日期降序',
              prop: '-publish_time'
            }
          ]
        },
        noHit: {
          supplier: [
            {
              type: 'supplier',
              name: '注册资本降序',
              prop: '-register_capital'
            },
            {
              type: 'supplier',
              name: '注册资本升序',
              prop: 'register_capital'
            },
            {
              type: 'supplier',
              name: '最近成立时间升序',
              prop: 'establish_time'
            },
            {
              type: 'supplier',
              name: '最近成立时间降序',
              prop: '-establish_time'
            }
          ],
          purchaser: [
            {
              type: 'purchaser',
              name: '注册资本降序',
              prop: '-register_capital'
            },
            {
              type: 'purchaser',
              name: '注册资本升序',
              prop: 'register_capital'
            }
          ],
          case: [
            {
              type: 'case',
              name: '发布时间降序',
              prop: '-publish_time'
            },
            {
              type: 'case',
              name: '发布时间升序',
              prop: 'publish_time'
            },
            {
              type: 'case',
              name: '按中标金额升序',
              prop: 'case_winamount_sum'
            },
            {
              type: 'case',
              name: '按中标金额降序',
              prop: '-case_winamount_sum'
            }
          ]
        },
        completeNoHit: {
        }
      }
    }
  },
  watch: {
    type: {
      immediate: true,
      deep: true,
      handler(value) {
        this.current = this.sortList[Object.keys(value)][Object.values(value)][0]['name']
      }
    }
  },
  created() {
  },
  methods: {
    toSort(item, i) {
      this.active = i
      const temp = this.sortList[Object.keys(this.type)][Object.values(this.type)].find(it => { return it.name === item })
      const current = temp.prop
      this.$emit('sort-list', { order: current, type: this.type[this.provideData.hit] })
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
