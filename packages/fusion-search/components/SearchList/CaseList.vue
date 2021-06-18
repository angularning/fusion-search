<template>
  <div class="CaseList" v-loading="loading">
    caseList
  </div>
</template>

<script>
export default {
  name: 'CaseList',
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
