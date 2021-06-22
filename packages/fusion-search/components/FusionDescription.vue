<template>
  <div class="FusionDescription">
    <!--    <HitProductDescription v-if="hit === 'product'" />-->
    <component :is="configList[provideData.hit]" />
  </div>
</template>

<script>
import HitProductDescription from './Description/HitProductDescription'
import HitSupplierDescription from './Description/HitSupplierDescription'
export default {
  name: 'FusionDescription',
  inject: ['provideData'],
  components: {
    HitProductDescription,
    HitSupplierDescription
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configList: {
        product: 'HitProductDescription',
        supplier: 'HitSupplierDescription'
      }
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style scoped lang="scss"></style>
