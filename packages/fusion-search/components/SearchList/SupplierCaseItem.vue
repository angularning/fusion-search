<template>
  <div class="SupplierCaseItem">
    <div>
      <span>成交案例</span>
      <span v-html="shortWordStringAndHeight(item.case_name)" />
    </div>
    <div>
      <span>案例时间</span>
      <span>2020-10-10</span>
    </div>
    <div>
      <span>成交内容</span>
      <span>打印机 计算机 </span>
    </div>
  </div>
</template>

<script>
import HitTag from '../HitMix/HitTag'
import Location from './Location'
import OrgProperty from './OrgProperty'

export default {
  name: 'SupplierCaseItem',
  inject: ['theme', 'hit'],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      theme: this.theme,
      hit: this.hit
    }
  },
  components: {
    OrgProperty,
    Location,
    HitTag
  },
  methods: {
    shortWordStringAndHeight(value) {
      const keyword = '计算机'
      const filter = new RegExp(keyword)
      if (value && value.length > 42) {
        return (value.substring(0, 42) + '...').replace(
          filter,
          `<span style="color: #F13D3D;">${keyword}</span>`
        )
      } else {
        return value.replace(filter, `<span style="color: #F13D3D;">${keyword}</span>`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';

.SupplierItem {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-top: 1px #eee solid;
  margin-top: 20px;
}
</style>
