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
         keyword: null, // 动态传入搜索关键词
         searchStatus: false,
         config: {
           THEME: "XUNYUAN", // 配置化主题
           APIHOST: "", // 接口请求域名
           LOGIN: false, // 是否需要登录
           showInput: true, // 是否显示搜索框 如果有搜索框则可以false隐藏
           showMix: true, // 是否显示命中详情
           showList: true, // 是否显示命中列表
           showDescription: true, // 是否显示右侧
         },
       };
     },
   ```
5. 如果选择使用自定义搜索框，不使用组件自带搜索框则需要做以下操作
   ```javascript
   在触发搜索的时候，把searchStatus设置为true。
   比如：
   toSearch() {
     // 触发搜索
         this.searchStatus = true;
   }
   同时需要有一个接受的方法
   receiveSearch(value) {
         this.searchStatus = value.status; // 搜索完之后会重置状态
   }
   ```
6. 完整示例如下
   ```html
   <template>
     <div class="home">
       <div class="">
         <input v-model="keyword" type="text" />
         <button style="cursor: pointer" @click="toSearch">触发</button>
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
   export default {
     name: "Home",
     data() {
       return {
         keyword: null,
         searchStatus: false,
         config: {
           THEME: "XUNYUAN", // 配置化主题
           APIHOST: "", // 接口请求域名
           LOGIN: false, // 是否需要登录
           showInput: true, // 是否显示搜索框
           showMix: true, // 是否显示命中详情
           showList: true, // 是否显示命中列表
           showDescription: true, // 是否显示右侧
         },
       };
     },
     methods: {
       toSearch() {
         this.searchStatus = true;
       },
       receiveSearch(value) {
         this.searchStatus = value.status;
       },
     },
   };
   </script>
   
   ```
7. .
8. .
9. .
10. .