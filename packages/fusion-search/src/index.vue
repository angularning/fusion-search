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
          <FusionMix :data="{}" />
        </template>
        <!--    命中列表组件-->
        <template v-if="config && config.showList">
          <FusionList />
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
        <FusionList />
      </div>
      <div class="fusionRight">
        <NoHitRight />
      </div>
    </div>
    <!--    完全不命中-->
    <div v-if="hit==='completeNoHit'">
      <div class="no-results">
        <img src="http://cdn-caigou.shuniucloud.com/img/kg-cloud-pc-fe.no-searche7dfd1a.png">
        <div>暂未搜索到相关信息</div>
      </div>
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
import defaultMixins from '../minxins/default'

export default {
  name: 'FusionSearch',
  components: {
    FusionMix,
    FusionInput,
    FusionList,
    FusionDescription,
    NoHitRight
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
          THEME: 'JFH',
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
      keyword: null,
      configData: {},
      hit: 'product',
      count: '1'
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
  provide() {
    let provideData = {
      hit: '',
      theme: ''
    }
    Object.defineProperty(provideData, 'hit', {
      get: () => this.hit
    })
    Object.defineProperty(provideData, 'theme', {
      get: () => this.config.THEME
    })
    return {
      provideData
    }
  },
  mounted() {
  },
  methods: {
    fusionSearch(val) {
      this.keyword = val || this.searchValue
      // 获取到搜索的值，做请求
      console.log(this.keyword)
      this.hit = this.keyword
      // 搜索之后把值设置为false
      this.$emit('change-search', false)
    },
    mixSearch(value) {
      // this.search(value)
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
  .no-results {
    position: absolute;
    top: 200px;
    left: calc(50% - 158px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #B3B9C6;
    img {
      width: 316px;
      height: 290px;
      margin-bottom: 50px;
    }
  }
}
</style>
