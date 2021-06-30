<template>
  <el-dialog
    :visible.sync="visible"
    width="1200px"
    class="case-detail-modal"
    @closed="closed"
  >
    <div
      slot="title"
      class="dialog-header"
    >
      <div>
        {{ (result_dict&&result_dict.case_name) }}
      </div>
      <div
        v-if="result_dict&&result_dict.owned_item"
        class="caseTagClass"
      >
        <!--        <div-->
        <!--          v-for="(con,index) in (result_dict.owned_item)"-->
        <!--          :key="index"-->
        <!--          class="item-class-tag ml10  defalutColor"-->
        <!--        >-->
        <!--        </div>-->
      </div>
      <div
        class="case-detail-url"
        :class="{active: isActive}"
        @click.stop="viewDetail"
      >
        <!--        <img :src="isActive ? activeIcon : icon ">-->
        <span>查看源链接</span>
      </div>
    </div>
    <div
      v-if="hasData"
      v-loading="loading"
      class="dialog-body"
    >
      <div>
        <div class="dialog-body-top">
          <div
            v-if="result_dict.hasOwnProperty('case_release_date')"
            class="product-property-item"
          >
            <div style="font-weight: bold;">
              案例时间
            </div>
            <div>{{ result_dict.publish_time }}</div>
          </div>
          <div
            v-if="hasPurchaser(result_dict.pur_unit_name)"
            class="product-property-item"
          >
            <div style="font-weight: bold;">
              落地业主
            </div>
            <div>{{ doPurchaser(result_dict.pur_unit_name) }}</div>
          </div>
          <div
            v-if="result_dict.hasOwnProperty('case_province_code')"
            class="product-property-item"
          >
            <div style="font-weight: bold;">
              地区
            </div>
            <div>{{ city_name(result_dict.location) }}</div>
          </div>
        </div>
        <template v-if="result_dict.hasOwnProperty('package_info')">
          <div
            v-for="(item, index) in doPackageInfo(result_dict.package_info)"
            :key="index"
            class="packageClass"
          >
            <div class="packageIndex">
              <span>内容详情{{ index+1 }}</span>
            </div>
            <div
              v-if="item.subcontract_win_amount"
              class="packageAmountBlack"
            >
              <span>中标金额</span>
              <span>{{ (item.subcontract_win_amount/10000).toFixed(2) }}万元</span>
            </div>
            <!-- <div v-if="item.win_amount" class="packageAmount">
               <span>中标金额</span>
               <span>{{ (item.win_amount/10000).toFixed(2) }}万元</span>
             </div>-->
            <div class="packageProduct">
              <span
                v-for="productItem in item.subcontract_content"
                :key="productItem"
              >
                {{ productItem }}
              </span>
            </div>
            <div class="packageWinbid">
              <span
                v-for="winbidItem in item.other_suppliers"
                :key="winbidItem"
              >
                {{ winbidItem }}
              </span>
            </div>
          </div>
        </template>
      </div>
      <!-- eslint-disable -->
      <div v-html="case_content" />
      <!-- eslint-disable -->
    </div>
    <div v-else>
      <NoResult :from="'list'" />
    </div>
  </el-dialog>
</template>
<script>
import NoResult from '../components/NoHit/NoResult'
// import { getColors, getNames } from '~/constant/ListTagConfig'
// eslint-disable-next-line camelcase
import { city_group } from '../common/city'
export default {
  name: 'CaseDetail',
  components: {
    NoResult
  },
  props: {
    provideData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      city_group,
      visible: true,
      hasData: true,
      case_content: '',
      anno_content_url: '',
      result_dict: [],
      item: {},
      loading: false
    }
  },
  computed: {
    isActive: {
      get() {
        return this.result_dict.anno_content_url
      }
    }
  },
  provide() {
    let provideData = {
      hit: '',
      theme: '',
      keyword: null
    }
    Object.defineProperty(provideData, 'hit', {
      get: () => this.provideData.hit
    })
    Object.defineProperty(provideData, 'theme', {
      get: () => this.provideData.theme
    })
    Object.defineProperty(provideData, 'keyword', {
      get: () => this.provideData.keyword
    })
    return {
      provideData
    }
  },
  created () {
    this.getDetails()
  },
  methods: {
    getDetails() {
      this.loading = true
      this.$get('search/detail/?graph_id=1&keyword=' + this.provideData.word + '&instance_type=' + this.provideData.instance_type + '&uuid=' + this.provideData.uuid).then(res => {
        if (res) {
          const { data } = res
          this.hasData = JSON.stringify(data) !== '{}'
          this.detailData = data
          this.result_dict = data
          this.anno_content_url = data.anno_content_url
          this.case_content = data.notice_content
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
      return val
      // if (val) {
      //   if (JSON.parse(JSON.stringify(val.split(',')[0])).length > 2) {
      //     return (JSON.parse(val.split(',')[0]))[0]
      //   } else {
      //     return false
      //   }
      // }
    },
    toSort(con) {
      if (con) {
        const re = JSON.parse(JSON.stringify(con))
        re.sort()
        return re
      }
    },
    viewDetail () {
      if (this.anno_content_url) {
        window.open(this.anno_content_url, '_blank')
      }
    },
    // 关闭浮窗时, 销毁实例
    closed () {
      this.$emit('cancel')
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy()
    },
    cancel () {
      this.visible = false
    },
    confirm () {
      // 关闭浮窗
      this.$emit('confirm')
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
.case-detail-modal {
  .el-dialog__body {
    padding-top: 0;
  }
  .dialog-header {
    color: #1C2D5A;
    font-size: 18px;
    font-weight: bold;
    .case-detail-url {
      color: #B3B9C6;
      margin: 10px 0;
      font-size: 14px;
      font-weight: normal;
      cursor: pointer;
      &.active {
        color: #3A72FF;
      }
      .case-detail-content {
        font-size: 16px;
        color: #858A93;
      }
    }
  }
  .dialog-body {
    min-height: 100px;
    max-height: 700px;
    overflow-y: auto;
    position: relative;
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
}
</style>
