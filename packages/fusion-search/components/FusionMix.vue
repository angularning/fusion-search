<template>
  <div class="FusionMix">
    <!--    <HitProductMix v-if="hit === 'product'" />-->
    <!--    <HitSupAndPurMix v-else />-->
    <component :is="hitData[hit]" />
  </div>
</template>

<script>
import HitProductMix from '../components/HitMix/HitProductMix'
import HitSupAndPurMix from '../components/HitMix/HitSupAndPurMix'
export default {
  name: 'FusionMix',
  inject: ['theme', 'hit'],
  components: {
    HitProductMix,
    HitSupAndPurMix
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      hit: this.hit,
      theme: this.theme,
      hitData: {
        product: 'HitProductMix',
        supplier: 'HitSupAndPurMix',
        purchaser: 'HitSupAndPurMix'
      }
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style scoped lang="scss">
@import '../common/common';
.FusionMix {
  background: #ffffff;
  padding: 20px;
  border-radius: 4px;
}
</style>
