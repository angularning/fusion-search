<template>
  <div class="HitTag">
    <div
      v-if="data && (data.winbid||data.pur_unit_name)"
      class="tags-container"
    >
      <div
        v-for="(tag, j) in (data.winbid||data.pur_unit_name)"
        v-show="tag !== null"
        :key="j"
        :class="[provideData.theme + '-color1', provideData.theme + '-background16']"
        class="tag"
      >
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script>
import { getNames } from '../../utils/tagConfig'
export default {
  name: 'OrgTag',
  inject: ['provideData'],
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      first_list: [],
      second_list: [],
      theme: this.theme
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    getValue(value) {
      return getNames(value)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.HitTag {
  max-height: 140px;
  overflow: auto;
  .tags-container {
    font-size: 14px;
    .tag {
      border-radius: 2px;
      display: inline-block;
      padding: 8px 20px;
      margin: 5px;
      //font-weight: bold;
    }
  }
}
</style>
