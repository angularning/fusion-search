<template>
  <div class="FusionDescription">
    <div>
      <h2>产品概览</h2>
      <div>
        服务地区
      </div>
      <div>
        服务领域
      </div>
      <div>
        合作业主分布
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FusionDescription',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style scoped lang="scss"></style>
