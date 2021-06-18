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
  components: {
    SearchListWrap
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style scoped lang="scss"></style>
