<template>
  <el-dialog
    :visible.sync="visible"
    width="1200px"
    class="supplier-detail-modal"
    :show-close="false"
    @close="cancel"
  >
    <div
      slot="title"
      class="dialog-header"
    >
      <span :class="[provideData.theme+'-color1']">业主详情</span>
      <a
        class="toDetails"
        :class="[provideData.theme+'-buttonPlain']"
        @click="toDetail"
      >跳转到详情>></a>
    </div>
    <div
      v-loading="loading"
      class="dialog-body"
    >
      <div v-if="hasData">
        <SupplierDetailOrg :data="detailData" />
        <div v-if="detailData&&detailData.recent_date">
          <div
            class="hit-time"
            :class="[provideData.theme+'-color1']"
          >
            <span class="label">最近服务时间</span> <span class="value">{{ detailData&&detailData.recent_date }}</span>
          </div>
        </div>
        <!--        <div class="supplierDetailLocation">-->
        <!--          <div class="supplierDetailTitle">-->
        <!--            服务过的地区-->
        <!--          </div>-->
        <!--          <LocationTag :list="detailData.service_area" />-->
        <!--        </div>-->
        <!--        <div>-->
        <!--          <div class="supplierDetailTitle">-->
        <!--            服务领域-->
        <!--          </div>-->
        <!--          <DescriptionTag :list="detailData.supplementary_label" />-->
        <!--        </div>-->
        <!--      </div>-->
        <div v-else>
          <NoResult :from="'list'" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import SupplierDetailOrg from '../components/HitMix/SupplierDetailOrg'
// import LocationTag from '../components/Description/LocationTag'
// import DescriptionTag from '../components/Description/DescriptionTag'
// import PlanCommonTag from '../components/Description/PlanCommonTag'
// import { getColors, getNames } from '~/constant/ListTagConfig'
// eslint-disable-next-line camelcase
import { city_group } from '../common/city'
import NoResult from '../components/NoHit/NoResult'
export default {
  name: 'PurchaserDetail',
  components: {
    SupplierDetailOrg,
    // LocationTag,
    // DescriptionTag,
    NoResult
  },
  props: {
    provideData: {
      type: Object,
      default: () => {}
    },
    visibles: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      city_group,
      visible: false,
      loading: false,
      hasData: false,
      detailData: {},
      org_website_info: {}
    }
  },
  computed: {
    isActive: {
      get() {
        return this.case_url
      }
    }
  },
  watch: {
    visibles: {
      deep: true,
      immediate: true,
      handler(value) {
        this.visible = JSON.parse(JSON.stringify(value))
      }
    }
  },
  created () {
    this.getDetails()
  },
  methods: {
    toDetail() {
      // 触发搜索
      this.closed()
      setTimeout(() => {
        this.$EventBus.$emit('fusion-list-search', (this.detailData && this.detailData.comp_name) || this.provideData.comp_name)
      }, 100)
    },
    getDetails() {
      this.loading = true
      this.$get(this.provideData.baseUrl + 'search/detail/?graph_id=1&keyword=' + this.provideData.comp_name + '&instance_type=' + this.provideData.instance_type + '&uuid=' + this.provideData.uuid).then(res => {
        if (res) {
          const { data } = res
          this.hasData = JSON.stringify(data) !== '{}'
          this.detailData = data
          this.detailData.type_own = 'purchaser'
          this.loading = false
        } else {
          this.hasData = false
          this.loading = false
        }
      }).catch(() => {
        this.hasData = false
        this.loading = false
      })
    },
    doPackageInfo(val) {
      if (val) {
        return val.slice(0, 3)
      }
    },
    city_name (location) {
      if (location) {
        if (String(location).includes('0000')) {
          return city_group[location]
        } else {
          const l = String(location).substring(0, 2) + '0000'
          return city_group[l] + '-' + city_group[location]
        }
      }
    },
    hasPurchaser(val) {
      if (val) {
        return val.length > 0
      } else {
        return false
      }
    },
    doPurchaser(val) {
      return val && val.join(',')
    },
    toSort(con) {
      if (con) {
        const re = JSON.parse(JSON.stringify(con))
        re.sort()
        return re
      }
    },
    viewDetail () {
      if (this.case_url) {
        window.open(this.case_url, '_blank')
      }
    },
    // 关闭浮窗时, 销毁实例
    closed () {
      this.$emit('cancel')
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy()
    },
    cancel () {
      this.$emit('cancel', false)
      // this.visible = false
    },
    confirm () {
      // 关闭浮窗
      this.$emit('cancel', false)
      // this.visible = false
    }
  }
}
</script>
<style lang="scss">
@import "./packages/fusion-search/common/common";
.supplier-detail-modal {
  .el-dialog__body {
    padding-top: 0;
  }
  .dialog-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #eeeeee solid;
    padding-bottom: 12px;
    span{
      font-size: 16px;
      font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
      font-weight: bold;
    }
    .toDetails{
      cursor: pointer;
      font-size: 12px;
      border-radius: 15px;
      padding: 2px 8px;
    }
  }
  .dialog-body {
    margin-top: 20px;
    min-height: 100px;
    max-height: 700px;
    position: relative;
    .supplierDetailTitle{
      font-size: 12px;
      font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
      font-weight: bold;
      color: #B3B9C6;
      margin-bottom: 10px;
    }
    .hit-time {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      border-radius: 13px;
      height: 26px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
      .label {
        font-weight: bold;
      }
    }
    .dialog-body-top{
      display: flex;
      flex-flow: row wrap;
      .product-property-item {
        width: 49%;
        height: 40px;
        margin-right: 2%;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        background: rgba(58, 114, 255, 0.04);
        border: 1px solid rgba(58,114,255,0.4);
        border-radius: 4px;
        color: #1C2D5A;
        &:nth-child(2n+2) {
          margin-right: 0;
        }
        div {
          font-size: 14px;
          &:first-child {
            color: #1C2D5A;
            font-weight: bold;
          }
          &:last-child {
            color: #3A72FF;
            font-weight: bold;
          }
        }
      }
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    .confirm,
    .cancel {
      width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      font-size: 14px;
      cursor: pointer;
      margin: 0 10px;
      &:hover {
        opacity: .9;
      }
    }
    .confirm {
      background: #0369B4;
      color: #fff;
    }
    .cancel {
      color: #616161;
      background: #EDEDF0;
    }
  }
  .packageTitle{
    color: #b3b9c6;
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 10px;
  }
  .packageClass{
    background: #f7f9ff;
    font-size: 13px;
    padding: 0 10px 10px 10px;
    .packageIndex{
      background: #3A72FF;
      color: #fff;
      margin-bottom: 10px;
      width: 60px;
      text-align: center;
      padding: 4px 2px;
      font-size: 10px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .packageWinbid{
      display: flex;
      flex-flow: row wrap;
    }
    .packageWinbid span{
      background:rgba(58,114,255,0.1);
      color: #3A72FF;
      margin-bottom: 10px;
      text-align: center;
      padding: 4px 10px;
      margin-right: 10px;
      font-size:12px;
      font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
      font-weight:bold;
    }
    .packageProduct{
      display: flex;
      flex-flow: row wrap;
    }
    .packageProduct span{
      background:rgba(73,180,81,0.1);
      color: #49B451;
      margin-bottom: 10px;
      text-align: center;
      padding: 4px 10px;
      margin-right: 10px;
      font-size:12px;
      font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
      font-weight:bold;
    }
    .packageAmountBlack{
      color: #0F1629;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .packageAmount{
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      height:34px;
      line-height: 34px;
      background:rgba(58,114,255,0.1);
      border-radius:2px;
      border:1px solid rgba(58,114,255,0.14);
      font-size:12px;
      font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
      font-weight:bold;
      vertical-align: middle;
      margin-bottom: 10px;
    }
    .packageAmount span:first-child{
      color: #3A72FF;
      margin-left: 10px;
    }
    .packageAmount span:last-child{
      color: #1C2D5A;
      margin-right: 10px;
    }
  }
  .defalutColor{
    color: #fff;
    padding: 3px 14px;
    background: #3a72ff;
    display: inline-block;
    border-radius: 4px;
    font-size: 12px;
  }
  .caseTagClass{
    margin-left: -10px;
    margin-top: 10px;
    display: flex;flex-flow: row wrap;margin-bottom: 5px;
  }
  .supplierDetailLocation{
    margin-top: 10px;
  }
}
</style>
