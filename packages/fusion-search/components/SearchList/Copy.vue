<template>
  <div class="SupplierList" v-loading="loading">
    1
  </div>
</template>

<script>
export default {
  name: 'SupplierList',
  props: {
    theme: {
      type: String,
      default: () => 'XUNYUAN'
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
