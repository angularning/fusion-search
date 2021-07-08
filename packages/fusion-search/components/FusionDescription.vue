<template>
  <div class="FusionDescription">
    <component
      :is="configList[hit]"
      :data="data"
      :list="list"
    />
  </div>
</template>

<script>
import HitProductDescription from './Description/HitProductDescription'
import HitSupplierDescription from './Description/HitSupplierDescription'
import HitPurchaserDescription from './Description/HitPurchaserDescription'
export default {
  name: 'FusionDescription',
  inject: ['provideData'],
  components: {
    HitProductDescription,
    HitSupplierDescription,
    HitPurchaserDescription
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    hit: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      configList: {
        product: 'HitProductDescription',
        supplier: 'HitSupplierDescription',
        purchaser: 'HitPurchaserDescription'
      }
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style scoped lang="scss"></style>
