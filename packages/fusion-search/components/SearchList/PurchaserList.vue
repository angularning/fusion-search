<template>
  <div class="PurchaserList" v-loading="loading">
    PurchaserList
  </div>
</template>

<script>
export default {
  name: 'PurchaserList',
  props: {
    theme: {
      type: String,
      default: () => 'XUNYUAN'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
