## vue-fusion-search

寻源融合搜索组件，支持主题配置，组件控制等。

#### 使用方法如下：

1. 引入 vue-fusion-search
   ```javascript
   npm i vue-fusion-search
   ```
2. package.json中引入相关依赖
   ```javascript
    "element-ui": "^2.12.0",
    "echarts": "^4.9.0",
    "axios": "^0.21.1",
   ```
3. 在main.js中使用如下
   ```javascript
   import ElementUI from "element-ui";
   import "element-ui/lib/theme-chalk/index.css";
   import axios from "axios";
   import FusionSearch from "vue-fusion-search";
   import "vue-fusion-search/lib/theme/index.css";
   Vue.config.productionTip = false;
   Vue.prototype.$axios = axios;
   Vue.use(ElementUI, { size: "small", zIndex: 3000 });
   Vue.use(FusionSearch);
   ```
4. 在相关使用的组件中使用如下
   ```javascript
   <FusionSearch
         :config="config"
         :search-value="keyword"
         :emit-search="searchStatus"
         @receive-search="receiveSearch"
   />
   
   data() {
       return {
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
       };
     },
   ```
5. 如果选择使用自定义搜索框，不使用组件自带搜索框则需要做以下操作
   ```javascript
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
   ```
6. 完整示例如下
   ```html
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

   
   ```
7. .
8. .
9. .
10. .