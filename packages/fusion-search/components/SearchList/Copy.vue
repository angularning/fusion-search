<template>
  <div class="Copy" v-loading="loading">
    1
  </div>
</template>

<script>
export default {
  name: 'Copy',
  inject: ['theme', 'hit'],
  props: {},
  data() {
    return {
      loading: false,
      hit: this.hit,
      theme: this.theme
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
</style>
