<template>
  <div class="SupplierList" v-loading="loading">
    SameSupplierList
  </div>
</template>

<script>
export default {
  name: 'SameSupplierList',
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
