<template>
  <div class="home">
    <div class="">
      <input
        v-model="search"
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
      :search-value="search"
      :emit-search="searchStatus"
      @change-search="changeSearch"
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
      search: null,
      searchStatus: false,
      config: {
        THEME: 'JFH',
        APIHOST: '',
        LOGIN: true,
        showInput: true,
        showMix: true,
        showList: true,
        showDescription: true
      }
    }
  },
  methods: {
    emitSearch(value) {
      console.log(value)
    },
    toSearch() {
      this.searchStatus = true
    },
    changeSearch(value) {
      this.searchStatus = value
    }
  }
}
</script>
