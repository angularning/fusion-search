<template>
  <div class="home">
    <!--    使用自有搜索框-->
    <input
      v-model="keywordProjectUse"
      type="text"
    >
    <button
      style="cursor: pointer;"
      @click="toSearch"
    >
      触发
    </button>
    <!--    使用自有搜索框-->

    <!--    使用组件-->
    <FusionSearch
      :config="config"
      :search-value="keyword"
      :emit-search="searchStatus"
      @receive-search="receiveSearch"
    />
  </div>
</template>

<script>
import FusionSearch from '../../packages/fusion-search/src/index'
export default {
  name: 'Home',
  components: {
    FusionSearch
  },
  data() {
    return {
      keywordProjectUse: null,
      keyword: null, // 搜索框的关键词，第三方项目需要把搜索词传到此 keyword
      searchStatus: false, // 搜索框搜索的状态，默认为 false
      config: { // 基础配置项
        THEME: 'JFH', // 配置化主题 支持 JFH/XUNYUAN
        baseUrl: 'http://192.168.41.84:8000/v1/api/', // 接口请求域名
        LOGIN: true, // 暂未开放
        showInput: true, // 是否显示搜索框
        showMix: true, // 是否显示命中详情
        showList: true, // 是否显示命中列表
        showDescription: true // 是否显示右侧
      }
    }
  },
  methods: {
    // 需要配置搜索方法，主要是把搜索状态重置。
    toSearch() {
      // 把目前的搜索框的值绑定到keyword上
      this.keyword = this.keywordProjectUse
      // 触发搜索
      this.searchStatus = true
    },
    receiveSearch(value) {
      // 修改搜索状态
      this.searchStatus = value.status
      // 由搜索的词同步跟新到搜索框。
      this.keywordProjectUse = value.keyword
      this.keyword = value.keyword
    }
  }
}
</script>
