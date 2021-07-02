<template>
  <div
    v-if="item[currentPage]&&item[currentPage].project_name"
    v-loading="loading"
    class="SupplierCaseItem"
  >
    <div class="sCaseTop">
      <span :class="[provideData.theme + '-color1']">成交案例</span>
      <span v-html="shortWordStringAndHeight(item[currentPage]&&item[currentPage].project_name)" />
    </div>
    <div class="sCaseTime">
      <span>案例时间</span>
      <span>{{ item[currentPage]&&item[currentPage].publish_time }}</span>
    </div>
    <div class="sCaseCon">
      <div class="sCaseLastDes">
        <template v-if="type === 'supplier' && provideData.hit === 'supplier'">
          <span>成交业主</span>
          <span
            v-html="filterData(item[currentPage]&&item[currentPage].pur_unit_name)"
          />
        </template>
        <template v-if="type === 'purchaser' && provideData.hit === 'supplier'">
          <span>供应商</span>
          <span
            v-html="filterData(item[currentPage]&&item[currentPage].winbid)"
          />
        </template>
        <template v-if="type === 'supplier' && provideData.hit === 'purchaser'">
          <span>成交内容你那个</span>
          <span
            v-html="filterData(item[currentPage]&&item[currentPage].object)"
          />
        </template>
      </div>
      <div class="sCasePage">
        <span
          class="sCaseLeftClick"
          @click.stop="pagePre"
        ><img
          src="../../static/pagesIcon.png"
          alt=""
        ></span>

        <span
          class="sCaseCurrentPage"
          :class="[provideData.theme + '-color1']"
        >{{ currentPage+1 }}</span>
        <span
          class="sCaseRightClick"
          @click.stop="pageNext"
        ><img
          src="../../static/pagesIcon.png"
          alt=""
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
// import HitTag from '../HitMix/HitTag'
// import Location from './Location'
// import OrgProperty from './OrgProperty'

export default {
  name: 'SupplierCaseItem',
  inject: ['provideData'],
  components: {},
  props: {
    item: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: () => 'supplier'
    }
  },
  data() {
    return {
      loading: false,
      currentPage: 0,
      totalList: JSON.parse(JSON.stringify(this.item)),
      list: [],
      total: 0
    }
  },
  computed: {
    setStyles() {
      return {
        opacity: 0.5
      }
    }
  },
  created() {
    this.setPageList()
  },
  methods: {
    setPageList() {
      this.total = this.item.length
      this.list = this.item
    },
    pagePre() {
      this.loading = true
      if (this.currentPage > 0) {
        this.currentPage--
        setTimeout(() => {
          this.loading = false
        }, 200)
      } else {
        this.loading = false
      }
    },
    pageNext() {
      this.loading = true
      if (this.currentPage < this.total - 1) {
        this.currentPage++
        setTimeout(() => {
          this.loading = false
        }, 200)
      } else {
        this.loading = false
      }
    },
    filterData(value) {
      if (value) {
        return `<span>${value}</span>`
      }
    },
    shortWordStringAndHeight(value) {
      const keyword = this.provideData.keyword
      const filter = new RegExp(keyword)
      if (value && value.length > 42) {
        return (value.substring(0, 42) + '...').replace(
          filter,
          `<span style="color: #F13D3D;">${keyword}</span>`
        )
      } else {
        return value && value.replace(filter, `<span style="color: #F13D3D;">${keyword}</span>`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.sCasePage {
  img {
    cursor: pointer;
    width: 24px;
    height: 18px;
    vertical-align: middle;
    &:hover {
      opacity: 0.7;
    }
  }
  .sCaseRightClick {
    img {
      transform: rotate(180deg);
    }
  }
  .sCaseCurrentPage{
    display: inline-block;
    width: 12px;
    text-align: center;
  }
}
.SupplierCaseItem {
  padding: 12px;
  width: calc(100% - 24px);
  display: flex;
  flex-flow: row nowrap;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(243, 245, 248, 0.6);
  .sCaseTop {
    font-size: 14px;
    font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
    font-weight: bold;
    color: #333333;
    span {
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .caseColor-XUNYUAN {
    color: $blue1;
  }
  .caseColor-JFH {
    color: $green1;
  }
  .sCaseTime {
    font-size: 12px;
    font-family: MicrosoftYaqiHei;
    color: rgba(51, 51, 51, 0.5);
    padding: 15px 0;
    span {
      &:first-child {
        margin-right: 5px;
      }
    }
  }
  .sCaseCon {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .sCaseLastDes {
      font-size: 12px;
      font-family: MicrosoftYaqiHei;
      span {
        &:first-child {
          color: #333;
          margin-right: 5px;
        }
        &:last-child {
          color: rgba(51, 51, 51, 0.5);
        }
      }
    }
    .sCasePage {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      font-size: 12px;
      span {
        margin: 0 3px;
      }
      img {
        width: 32px;
        height: 18px;
        vertical-align: middle;
      }
    }
  }
}
</style>
