<template>
  <div class="FusionList">
    <div
      class="SearchListWrap"
    >
      <div class="SearchListNav">
        <div
          v-for="(item, i) in tabNav[provideData.hit]"
          :key="i"
          class="searchNav"
        >
          <a
            class="nav"
            :class="[active === i ? provideData.theme + '-activeNav' : '']"
            @click="showNav(item, i)"
          >{{ item.value }}</a>
        </div>
      </div>
      <div
        class="listWrap"
      >
        <!--        v-loading="loading"-->
        <div class="sortList">
          <SortList
            :search="filterStatus"
            :type="defaultType"
            @sort-list="toSortList"
          />
          <SortFilter
            :search="filterStatus"
            :type="defaultType"
            @filter-list="toFilterList"
          />
        </div>
        <div v-loading="loading">
          <component
            :is="activeComponent"
            :data="data"
            :loading="loading"
            @reload-list="reloadList"
          />
          <SearchPagination
            :total="total"
            :cpage="cpage"
            :type="defaultType"
            @change-page="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SupplierList from './SearchList/SupplierList'
import CaseList from './SearchList/CaseList'
import PurchaserList from './SearchList/PurchaserList'
import SameSupplierList from './SearchList/SameSupplierList'
import SortList from './SearchList/SortList'
import SortFilter from './SearchList/SortFilter'
import SearchPagination from './SearchList/SearchPagination'
export default {
  name: 'FusionList',
  inject: ['provideData'],
  components: {
    SupplierList,
    CaseList,
    PurchaserList,
    SameSupplierList,
    SortList,
    SortFilter,
    SearchPagination
  },
  props: {
    search: {
      type: String,
      default: () => null
    },
    hit: {
      type: String,
      default: () => null
    }
  },
  data() {
    return {
      type: null,
      active: 0,
      total: 0,
      againLoading: false,
      filterStatus: false, // 用于清除筛选
      cpage: false, // 用于page = 1
      additional: {}, // 用户保存上一次的条件
      loading: false,
      data: {},
      searchFields: {
        product: {
          supplier: {
            fields: {
              // supplier_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: 'default'
            },
            amount: 'register_capital'
          },
          case: {
            fields: {
              // supplier_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: '-publish_time'
            },
            amount: 'case_winamount_sum'
          },
          purchaser: {
            fields: {
              // purchaser_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              order: '-register_capital'
            },
            amount: 'register_capital'
          }
        },
        supplier: {
          // supplier: {
          //   fields: {
          //     supplier_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
          //     case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
          //     order: '-reg_cap'
          //   }
          // },
          case: {
            fields: {
              // fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,case_winamount_sum,object,winbid',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: '-publish_time' // default/-case_release_date/-case_winamount_sum
            },
            amount: 'case_winamount_sum'
          },
          purchaser: {
            fields: {
              // purchaser_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,winbid,object,case_winamount_sum'
              order: '-register_capital' // 排序规则-case_release_date/-case_winamount_sum
            },
            amount: 'case_winamount_sum'
          }
        },
        purchaser: {
          supplier: {
            fields: {
              // supplier_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,winbid,object',
              order: '-register_capital' // default/-case_release_date/-est_date
            },
            amount: 'register_capital'
          },
          case: {
            fields: {
              // fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,case_winamount_sum,case_tag,object,winbid',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: '-publish_time' // default/-case_release_date/-case_winamount_sum
            },
            amount: 'case_winamount_sum'
          }
        },
        noHit: {
          supplier: {
            fields: {
              // fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              order: '-register_capital' // -reg_cap/-est_date
            },
            amount: 'register_capital'
          },
          case: {
            fields: {
              // fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,case_winamount_sum,object',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: '-publish_time' // 排序规则-case_release_date/-case_winamount_sum
            },
            amount: 'bid_winning_amount'
          },
          purchaser: {
            fields: {
              // fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              order: '-register_capital' // 排序规则-case_release_date/-reg_cap
            },
            amount: 'register_capital'
          }
        }
      },
      defaultSearchField: {
        product: {
          supplier: {
            fields: {
              // supplier_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: 'default'
            },
            amount: 'register_capital'
          },
          case: {
            fields: {
              // supplier_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: '-publish_time'
            },
            amount: 'case_winamount_sum'
          },
          purchaser: {
            fields: {
              // purchaser_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              order: '-register_capital'
            },
            amount: 'register_capital'
          }
        },
        supplier: {
          // supplier: {
          //   fields: {
          //     supplier_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
          //     case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
          //     order: '-reg_cap'
          //   }
          // },
          case: {
            fields: {
              // fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,case_winamount_sum,object,winbid',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: '-publish_time' // default/-case_release_date/-case_winamount_sum
            },
            amount: 'case_winamount_sum'
          },
          purchaser: {
            fields: {
              // purchaser_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,winbid,object,case_winamount_sum'
              order: '-register_capital' // 排序规则-case_release_date/-case_winamount_sum
            },
            amount: 'case_winamount_sum'
          }
        },
        purchaser: {
          supplier: {
            fields: {
              // supplier_fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,winbid,object',
              order: '-register_capital' // default/-case_release_date/-est_date
            },
            amount: 'register_capital'
          },
          case: {
            fields: {
              // fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,case_winamount_sum,case_tag,object,winbid',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: '-publish_time' // default/-case_release_date/-case_winamount_sum
            },
            amount: 'case_winamount_sum'
          }
        },
        noHit: {
          supplier: {
            fields: {
              // fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              order: '-register_capital' // -reg_cap/-est_date
            },
            amount: 'register_capital'
          },
          case: {
            fields: {
              // fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,case_winamount_sum,object',
              // case_fields: 'id,case_name,case_url,case_release_date,purchaser,case_location_code,object',
              order: '-publish_time' // 排序规则-case_release_date/-case_winamount_sum
            },
            amount: 'bid_winning_amount'
          },
          purchaser: {
            fields: {
              // fields: 'id,org_name,location,org_tag,reg_cap,est_date,org_url',
              order: '-register_capital' // 排序规则-case_release_date/-reg_cap
            },
            amount: 'register_capital'
          }
        }
      },
      tabNav: {
        noHit: [
          {
            name: 'SupplierList',
            key: 'supplier',
            value: '找供应商'
          },
          {
            name: 'CaseList',
            key: 'case',
            value: '找案例'
          },
          {
            name: 'PurchaserList',
            key: 'purchaser',
            value: '找采购业主'
          }
        ],
        product: [
          {
            name: 'SupplierList',
            key: 'supplier',
            value: '供应商',
            order: '-reg_cap'
          },
          {
            name: 'CaseList',
            key: 'case',
            value: '关联案例'
          },
          {
            name: 'PurchaserList',
            key: 'purchaser',
            value: '采购业主'
          }
        ],
        supplier: [
          {
            name: 'CaseList',
            key: 'case',
            value: '相关案例'
          },
          // {
          //   name: 'SameSupplierList',
          //   key: 'sameSupplier',
          //   value: '相似供应商'
          // },
          {
            name: 'PurchaserList',
            key: 'purchaser',
            value: '采购业主'
          }
        ],
        purchaser: [
          {
            name: 'CaseList',
            key: 'case',
            value: '相关案例',
            order: ''
          },
          {
            name: 'SupplierList',
            key: 'supplier',
            value: '相关供应商'
          }
        ]
      }
    }
  },
  computed: {
    activeComponent() {
      return this.tabNav[this.provideData.hit][this.active].name
    },
    defaultType() {
      return {
        [this.provideData.hit]: this.type || this.tabNav[this.provideData.hit][0].key
      }
    }
  },
  watch: {
    search: {
      deep: true,
      immediate: true,
      handler(value) {
        if (value) {
          this.initData()
          this.getDefaultList()
        }
      }
    },
    hit: {
      handler(value) {
        if (value) {
          this.initData()
          this.getDefaultList()
        }
      }
    }
  },
  methods: {
    initData() {
      this.cpage = true
      this.type = null
      this.active = 0
    },
    changePage(value) {
      this.cpage = false
      this.getReloadList({ type: value.type, page: value.page })
    },
    reloadList(value) {
      this.getDefaultList(value)
    },
    toSortList(value) {
      this.searchFields[this.hit][value.type].fields.order = value.order
      this.cpage = true
      this.getReloadList({ type: value.type })
    },
    toFilterList(value) {
      const temp = this.searchFields[this.hit][value.type]
      temp.fields.location = value.location
      temp.fields[temp.amount] = value.money
      this.filterStatus = false
      this.cpage = true
      this.getReloadList({ type: value.type })
    },
    showNav(value, i) {
      if (this.loading) {
        return false
      }
      this.cpage = true
      this.type = value.key
      this.active = i
      // 触发搜索其它
      this.getDefaultList()
    },
    getDefaultList() {
      this.filterStatus = true // 清除地区金额
      this.data = {}
      // TODO: 优化查询 把命中的词与当前tab建立关系，如果有关系则下次不查询 0627
      this.loading = true
      const selection = {
        graph_id: 1,
        keyword: this.search,
        instance_type: this.hit === 'noHit' ? 'bottom_hit' : this.hit,
        info_type: this.type || this.tabNav[this.hit][0].key,
        page: 1,
        page_size: 15
      }
      const data = Object.assign(selection, this.defaultSearchField[this.hit][this.defaultType[this.hit]].fields)
      this.removeKey(data, 'location')
      this.removeKey(data, 'register_capital')
      this.removeKey(data, 'bid_winning_amount')
      this.$post(this.provideData.baseUrl + 'search/main/', data).then(item => {
        const { data } = item
        this.data = data
        if (this.data) {
          this.total = this.data.count
        }
        this.loading = false
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.loading = false
      })
    },
    removeKey(obj, key) {
      if (obj.hasOwnProperty(key)) {
        for (let i in obj) {
          if (i === key) {
            delete obj[key]
          }
        }
      }
    },
    getReloadList(additional) {
      this.data = {}
      this.loading = true
      const selection = {
        graph_id: 1,
        keyword: this.search,
        instance_type: this.hit === 'noHit' ? 'bottom_hit' : this.hit,
        info_type: additional.type,
        page: additional.page || 1,
        page_size: 15
      }
      const data = Object.assign(selection, this.searchFields[this.hit][additional.type].fields)
      console.log('data', data)
      this.$post(this.provideData.baseUrl + 'search/main/', data).then(item => {
        const { data } = item
        this.data = data
        if (this.data) {
          this.total = this.data.count
        }
        this.loading = false
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../common/common';
.FusionList {
  margin-top: 20px;
  background: #ffffff;
  border-radius: 4px;
}
.SearchListWrap {
  .SearchListNav {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 20px 0 20px;
  }
  .searchNav {
    .nav {
      display: inline-block;
      cursor: pointer;
      margin-right: 30px;
      font-size: 14px;
      font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
      font-weight: bold;
      color: #262626;
      padding-bottom: 10px;
      border-bottom: 4px #fff solid;
    }
  }
  .listWrap {
    padding: 20px 0;
    border-top: 1px rgba(38, 38, 38, 0.08) solid;
    .sortList {
      padding: 0 20px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
