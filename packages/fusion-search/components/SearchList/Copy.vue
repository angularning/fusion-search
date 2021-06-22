<template>
  <div class="Copy" v-loading="loading">
    1
  </div>
</template>

<script>
export default {
  name: 'Copy',
  inject: ['provideData'],
  props: {},
  data() {
    return {
      loading: false,
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
