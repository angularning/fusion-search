<template>
  <div class="search-input-container">
    <span class="search-input-title"><img style="width: 100%;" src="" alt=""/></span>
    <input v-model="keyword" clearable @keyup.enter.native="toSearchList" />
    <button @click.stop="toSearchList">
      搜索
    </button>
  </div>
</template>

<script>
export default {
  name: 'FusionInput',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {
      keyword: null
    }
  },
  methods: {
    toSearchList() {}
  },
  mounted() {
    this.$EventBus.$on('fusion-search', (value) => {
      console.log('fusion-search', value)
    })
  },
  beforeDestroy() {
    this.$EventBus.$off('fusion-search')
  }
}
</script>

<style scoped lang="scss"></style>
