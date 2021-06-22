<template>
  <div class="FusionList">
    <SearchListWrap />
  </div>
</template>

<script>
import SearchListWrap from './SearchList/SearchListWrap'
export default {
  name: 'FusionList',
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
