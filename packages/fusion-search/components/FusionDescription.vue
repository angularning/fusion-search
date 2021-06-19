<template>
  <div class="FusionDescription">
    <HitProductDescription v-if="hit === 'product'" />
  </div>
</template>

<script>
import HitProductDescription from './Description/HitProductDescription'
export default {
  name: 'FusionDescription',
  inject: ['theme', 'hit'],
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      hit: this.hit,
      theme: this.theme
    }
  },
  components: {
    HitProductDescription
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style scoped lang="scss"></style>
