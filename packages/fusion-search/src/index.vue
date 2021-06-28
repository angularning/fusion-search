<template>
  <div
    :class="[config.THEME]"
    class="fusion-search-wrap"
  >
    <!--    搜索框组件-->
    <template v-if="config && config.showInput">
      <FusionInput @search="fusionSearch" />
    </template>
    <!--    命中显示-->
    <div
      v-if="hit==='product'||hit==='supplier'||hit==='purchaser'"
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
          <FusionDescription />
        </template>
      </div>
    </div>
    <!--    未命中-->
    <div
      v-if="hit==='noHit'"
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
      <NoResult />
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
      hit: 'completeNoHit',
      loadingCard: false,
      loadingList: false,
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
  computed: {
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
  provide() {
    let provideData = {
      hit: '',
      theme: '',
      keyword: this.keyword
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
    return {
      provideData
    }
  },
  mounted() {
    this.$EventBus.$on('fusion-list-search', (val) => {
      this.fusionSearch(val)
    })
  },
  methods: {
    fusionSearch(val) {
      this.keyword = val || this.searchValue
      // 获取到搜索的值，做请求
      this.mixSearch(this.keyword)
      // 搜索之后把值设置为false
      this.$emit('receive-search', { status: false, keyword: this.keyword })
    },
    mixSearch(value) {
      if (this.lastKeyword === this.keyword) return false
      this.$get('search/input_box/?graph_id=1&keyword=' + value).then(item => {
        this.lastKeyword = this.keyword
        const { data } = item
        this.hit = this.hitConfig[data.instance_type]
        this.instance_type = data.instance_type
        // 根据获取到的hit值去做不同的请求
        this.getSearchCard()
      })
    },
    getSearchCard() {
      this.loadingCard = true
      this.$get('search/card/?graph_id=1&keyword=' + this.keyword + '&instance_type=' + this.instance_type).then(item => {
        const { data } = item
        this.loadingCard = false
        this.cardData = data
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.loadingCard = false
      })
    },
    searchResult() {

    },
    getList(type) {

    }
  }
}
</script>
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
