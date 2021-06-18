<template>
  <div class="PurchaserItem" v-loading="loading">
    <div class="listItemLeft">
      <div class="orgTop">
        <img
          class="orgImg"
          src="http://cdn-caigou.shuniucloud.com/img/kg-cloud-pc-fe.aside_logoafff22c.png"
          alt=""
        />
        <div class="orgDes">
          <div class="orgDesTitle">
            <div class="titleName">北京众标智能科技有限公司</div>
            <Location :item="item"></Location>
          </div>
          <div>
            <HitTag />
          </div>
        </div>
      </div>
      <OrgProperty />
    </div>
    <div class="listItemRight">
      <SupplierCaseItem :type="'purchaser'" />
    </div>
  </div>
</template>

<script>
import HitTag from '../HitMix/HitTag'
import Location from './Location'
import OrgProperty from './OrgProperty'
import SupplierCaseItem from './SupplierCaseItem'
export default {
  name: 'PurchaserItem',
  inject: ['theme', 'hit'],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      theme: this.theme,
      hit: this.hit
    }
  },
  components: {
    OrgProperty,
    Location,
    HitTag,
    SupplierCaseItem
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.PurchaserItem {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px #eee solid;
  margin-top: 20px;
  .listItemLeft {
    flex: 3;
    width: 100%;
    .orgTop {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 15px;
      padding-top: 20px;
      .orgImg {
        width: 54px;
        height: 54px;
        vertical-align: middle;
      }
      .orgDes {
        .orgDesTitle {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;
          .titleName {
            margin-right: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 20px;
            font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
            font-weight: bold;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .listItemRight {
    flex: 2;
    width: 100%;
    margin-top: 15px;
  }
}
</style>
