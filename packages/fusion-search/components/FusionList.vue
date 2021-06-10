<template>
  <div class="FusionMix">
    <div>
      <div>
        <span>手机</span>
        <span>产品</span>
      </div>
      <div>
        描述文字
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FusionList',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
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
