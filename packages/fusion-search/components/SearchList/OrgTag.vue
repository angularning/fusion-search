<template>
  <div class="HitTag">
    <div
      v-if="data && data.case_tag"
      class="tags-container"
    >
      <div
        v-for="(tag, j) in data.case_tag"
        :class="[provideData.theme + '-color1', provideData.theme + '-background16']"
        :key="j"
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
    },
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
