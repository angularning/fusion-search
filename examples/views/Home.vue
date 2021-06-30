<template>
  <div class="home">
    <div class="">
      <input
        v-model="keyword"
        type="text"
      >
      <button
        style="cursor: pointer;"
        @click="toSearch"
      >
        触发
      </button>
    </div>
    <FusionSearch
      :config="config"
      :search-value="keyword"
      :emit-search="searchStatus"
      @receive-search="receiveSearch"
    />
  </div>
</template>

<script>
// import FusionSearch from '../../packages/fusion-search/src/index'
export default {
  name: 'Home',
  // components: {
  //   FusionSearch
  // },
  data() {
    return {
      keyword: null,
      searchStatus: false,
      config: {
        THEME: 'JFH', // 配置化主题
        APIHOST: '', // 接口请求域名
        LOGIN: true,
        showInput: true, // 是否显示搜索框
        showMix: true, // 是否显示命中详情
        showList: true, // 是否显示命中列表
        showDescription: true // 是否显示右侧
      }
    }
  },
  methods: {
    emitSearch(value) {
      console.log(value)
    },
    toSearch() {
      // this.$modal('Example', {
      //   data () {
      //     return {
      //       allowSelectTemplate: true,
      //       mainForm: {
      //         template: '产品寻源报告'
      //       }
      //     }
      //   },
      //   $store: this.$store,
      //   $router: this.$router
      // })
      this.searchStatus = true
    },
    receiveSearch(value) {
      console.log(value)
      this.searchStatus = value.status
      this.keyword = value.keyword
    }
  }
}
</script>
