<template>
  <div
    :class="[config.THEME]"
    class="fusion-search-wrap"
  >
    <!--    搜索框组件-->
    <template v-if="config && config.showInput">
      <FusionInput />
    </template>
    <div
      v-if="hit!=='noHit'"
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
      keyword: null,
      configData: {},
      // config: {
      //   THEME: 'XUNYUAN',
      //   APIHOST: '',
      //   LOGIN: true,
      //   showInput: true,
      //   showMix: true,
      //   showList: true,
      //   showDescription: true,
      // },
      hit: 'noHit'
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
        console.log(val)
      }
    }
  },
  provide() {
    return {
      hit: this.hit,
      theme: this.config && this.config.THEME
    }
  },
  mounted() {
  },
  methods: {
    fusionSearch() {
      console.log(this.searchValue)
      // 搜索之后把值设置为false
      this.$emit('change-search', false)
    },
    mixSearch(value) {
      // this.search(value)
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
    .tipTitle{
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
    .noHitLeft{
      background: #ffffff;
    }
  }
}
</style>
