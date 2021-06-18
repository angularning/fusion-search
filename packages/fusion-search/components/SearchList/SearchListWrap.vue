<template>
  <div class="SearchListWrap" v-loading="loading">
    <div class="SearchListNav">
      <div class="searchNav" v-for="(item, i) in tabNav[hit]">
        <a
          @click="showNav(item, i)"
          class="nav"
          :class="[active === i ? theme + '-activeNav' : '']"
          >{{ item.value }}</a
        >
      </div>
    </div>
    <div class="listWrap">
      <div class="sortList">
        <SortList :type="type" />
        <SortFilter :type="type" />
      </div>
      <component :is="activeComponent" />
    </div>
  </div>
</template>

<script>
import SupplierList from './SupplierList'
import CaseList from './CaseList'
import PurchaserList from './PurchaserList'
import SameSupplierList from './SameSupplierList'
import SortList from './SortList'
import SortFilter from './SortFilter'

export default {
  name: 'SearchListWrap',
  inject: ['theme', 'hit'],
  props: {
    // datalist: {
    //   type: Object,
    //   default: () => {
    //   },
    // },
    // theme: {
    //   type: String,
    //   default: () => 'XUNYUAN'
    // },
    // hit: {
    //   type: String,
    //   default: () => 'supplier'
    // },
  },
  data() {
    return {
      loading: false,
      theme: this.theme,
      hit: this.hit,
      type: 'supplier',
      active: 0,
      tabNav: {
        product: [
          {
            name: 'SupplierList',
            key: 'supplier',
            value: '供应商'
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
          {
            name: 'SameSupplierList',
            key: 'sameSupplier',
            value: '相似供应商'
          },
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
            value: '相关案例'
          },
          {
            name: 'SupplierList',
            key: 'Supplier',
            value: '相关供应商'
          }
        ]
      }
    }
  },
  components: {
    SupplierList,
    CaseList,
    PurchaserList,
    SameSupplierList,
    SortList,
    SortFilter
  },
  computed: {
    activeComponent() {
      return this.tabNav[this.hit][this.active].name
    }
  },
  methods: {
    showNav(value, i) {
      this.active = i
      this.type = value.key
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';

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
