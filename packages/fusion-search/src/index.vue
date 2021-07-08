<template>
  <div
    :class="[config.THEME]"
    class="fusion-search-wrap"
  >
    <!--    搜索框组件-->
    <template v-if="config && config.showInput">
      <FusionInput
        :keyword="keyword"
        @search="fusionSearch"
      />
    </template>
    <!--    命中显示-->
    <div
      v-if="hit==='product'||hit==='supplier'||hit==='purchaser'"
      v-loading="againLoading"
      class="fusionContent"
    >
      <div class="fusionLeft">
        <!--    命中详情卡片-->
        <template v-if="config && config.showMix">
          <FusionMix
            v-loading="loadingCard"
            :data="cardData"
          />
        </template>
        <!--    命中列表组件-->
        <template v-if="config && config.showList">
          <FusionList
            :loading="loadingList"
            :search="keyword"
            :hit="hit"
          />
        </template>
      </div>
      <div class="fusionRight">
        <!--    右侧概览，分产品，供应商，业主-->
        <template v-if="config && config.showDescription">
          <FusionDescription
            v-loading="loadingChart"
            :data="chartData"
            :list="relateList"
            :hit="hit"
          />
        </template>
      </div>
    </div>
    <!--    未命中-->
    <div
      v-if="hit==='noHit'"
      v-loading="againLoading"
      class="fusionContent"
    >
      <div class="fusionLeft">
        <div class="tipTitle">
          为您找到如下相关内容：
        </div>
        <FusionList
          :loading="loadingList"
          :search="keyword"
          :hit="hit"
        />
      </div>
      <div class="fusionRight">
        <NoHitRight />
      </div>
    </div>
    <!--    完全不命中-->
    <div v-if="hit==='completeNoHit'">
      <NoResult v-loading="loadingHit" />
    </div>
  </div>
</template>

<script>
// 首页搜索框
import FusionInput from '../components/FusionInput'
//
import FusionMix from '../components/FusionMix'
import FusionList from '../components/FusionList'
import FusionDescription from '../components/FusionDescription'
import NoHitRight from '../components/NoHit/NoHitRight'
import NoResult from '../components/NoHit/NoResult'
import defaultMixins from '../minxins/default'

export default {
  name: 'FusionSearch',
  components: {
    FusionMix,
    FusionInput,
    FusionList,
    FusionDescription,
    NoHitRight,
    NoResult
  },
  mixins: [defaultMixins],
  props: {
    emitSearch: {
      type: Boolean,
      default: () => false
    },
    searchValue: {
      type: String,
      default: () => null
    },
    config: {
      type: Object,
      default: () => {
        return {
          THEME: 'XUNYUAN',
          APIHOST: '',
          LOGIN: true,
          showInput: true,
          showMix: true,
          showList: true,
          showDescription: true
        }
      }
    }
  },
  data() {
    return {
      lastKeyword: null,
      keyword: null,
      configData: {},
      cardData: {}, // 命中卡片数据
      chartData: {}, // 命中右侧图表等
      relateList: [], // 相关产品
      hit: 'completeNoHit',
      loadingCard: false,
      loadingList: false,
      loadingChart: false,
      loadingHit: false, // 无搜索
      instance_type: null,
      count: '1',
      hitConfig: {
        product: 'product',
        supplier: 'supplier',
        purchaser: 'purchaser',
        blank: 'completeNoHit',
        bottom_hit: 'noHit'
      }
    }
  },
  watch: {
    emitSearch: {
      immediate: true,
      handler(val) {
        if (val) {
          // 触发搜索
          this.fusionSearch()
        }
      }
    },
    config: {
      immediate: true,
      handler(val) {
        // console.log(val)
      }
    }
  },
  created() {
    sessionStorage.setItem('FUSIONCONFIG', JSON.stringify(this.config))
  },
  provide() {
    let provideData = {
      hit: '',
      theme: '',
      keyword: this.keyword,
      baseUrl: ''
    }
    Object.defineProperty(provideData, 'hit', {
      get: () => this.hit
    })
    Object.defineProperty(provideData, 'theme', {
      get: () => this.config.THEME
    })
    Object.defineProperty(provideData, 'keyword', {
      get: () => this.keyword
    })
    Object.defineProperty(provideData, 'baseUrl', {
      get: () => this.config.baseUrl
    })
    return {
      provideData
    }
  },
  mounted() {
    this.$EventBus.$on('fusion-list-search', (val) => {
      this.fusionSearch(val)
    })
  },
  beforeDestroy() {
    this.$EventBus.$off('fusion-list-search')
  },
  methods: {
    fusionSearch(val) {
      this.againLoading = true
      this.loadingHit = true
      this.keyword = val || this.searchValue
      // 获取到搜索的值，做请求
      this.mixSearch(this.keyword)
      // 搜索之后把值设置为false
      this.$emit('receive-search', { status: false, keyword: this.keyword })
    },
    mixSearch(value) {
      if (this.lastKeyword === this.keyword) return false
      this.$get(this.config.baseUrl + 'search/input_box/?graph_id=1&keyword=' + value).then(item => {
        this.lastKeyword = this.keyword
        const { data } = item
        this.hit = this.hitConfig[data.instance_type]
        this.instance_type = data.instance_type
        this.loadingHit = false
        this.againLoading = false
        // 根据获取到的hit值去做不同的请求
        this.getSearchCard()
      }).catch(() => {
        this.againLoading = false
        this.loadingHit = false
      })
    },
    getSearchCard() {
      this.loadingCard = true
      this.$get(this.config.baseUrl + 'search/card/?graph_id=1&keyword=' + this.keyword + '&instance_type=' + this.instance_type).then(item => {
        const { data } = item
        this.loadingCard = false
        this.cardData = data
        this.getChartData()
        if (this.instance_type === 'supplier' || this.instance_type === 'purchaser' || this.instance_type === 'product') {
          this.getRelatedList()
        }
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.loadingCard = false
      })
    },
    getRelatedList() {
      this.$get(this.config.baseUrl + 'search/related_product/?graph_id=1&keyword=' + this.keyword + '&instance_type=' + this.instance_type + '&uuid=' + this.cardData.uuid).then(item => {
        const { data } = item
        this.$nextTick(() => {
          this.relateList = data
        })
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
      })
    },
    getChartData() {
      this.loadingChart = true
      this.$get(this.config.baseUrl + 'search/statistics/?graph_id=1&keyword=' + this.keyword + '&instance_type=' + this.instance_type + '&uuid=' + this.cardData.uuid).then(item => {
        const { data } = item
        this.$nextTick(() => {
          this.chartData = data
        })
        this.loadingChart = false
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.loadingChart = false
      })
    }
  }
}
</script>
<!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
<!--<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">-->
<style lang="scss">
@import "../common/common";

.fusion-search-wrap {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  background: #f8f8fa;

  .fusionContent {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 20px;

    .tipTitle {
      font-size: 14px;
      font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
      padding: 0 15px;
      color: #1C2D5A;
    }

    .fusionLeft {
      flex: 3;
      margin-right: 20px;
    }

    .fusionRight {
      flex: 1;
    }

    .noHitLeft {
      background: #ffffff;
    }
  }
}
</style>
