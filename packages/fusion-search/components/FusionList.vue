<template>
  <div class="FusionList">
    <SearchListWrap />
  </div>
</template>

<script>
import SearchListWrap from './SearchList/SearchListWrap'
export default {
  name: 'FusionList',
  inject: ['theme', 'hit'],
  components: {
    SearchListWrap
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      theme: this.theme,
      hit: this.hit
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style scoped lang="scss">
.FusionList {
  margin-top: 20px;
  background: #ffffff;
  border-radius: 4px;
}
</style>
