<template>
  <div class="SupplierCaseItem">
    <div class="sCaseTop">
      <span :class="[theme + '-color1']">成交案例</span>
      <span v-html="shortWordStringAndHeight('安源区卫生和计划生手机育委员会安源区卫生和计划生')" />
    </div>
    <div class="sCaseTime">
      <span>案例时间</span>
      <span>2020-10-10</span>
    </div>
    <div class="sCaseCon">
      <div class="sCaseLastDes">
        <span>成交业主</span>
        <span v-html="filterData('打印机 计算机')"> </span>
      </div>
      <div class="sCasePage">
        <span class="sCaseLeftClick"><img src="../../static/pagesIcon.png" alt=""/></span>
        <span class="sCaseCurrentPage" :class="[theme + '-color1']">1</span>
        <span class="sCaseRightClick"><img src="../../static/pagesIcon.png" alt=""/></span>
      </div>
    </div>
  </div>
</template>

<script>
import HitTag from '../HitMix/HitTag'
import Location from './Location'
import OrgProperty from './OrgProperty'

export default {
  name: 'SupplierCaseItem',
  inject: ['theme', 'hit'],
  props: {
    item: {
      type: Array,
      default: () => [{}]
    }
  },
  data() {
    return {
      loading: false,
      theme: this.theme,
      hit: this.hit,
      totalList: JSON.parse(JSON.stringify(this.item))
    }
  },
  components: {
    OrgProperty,
    Location,
    HitTag
  },
  methods: {
    filterData(value) {
      return `<span>${value}</span>`
    },
    shortWordStringAndHeight(value) {
      const keyword = '手机'
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
