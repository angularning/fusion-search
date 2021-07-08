<template>
  <div class="HitTag">
    <div
      v-if="data && (data.org_tag||data.supplementary_label||data.case_tag)"
      class="tags-container"
    >
      <div
        v-for="(tag, j) in data&&(data.org_tag||data.supplementary_label||data.case_tag)"
        v-show="getValue(tag) !== ''"
        :key="j"
        :class="[provideData.theme + '-color1', provideData.theme + '-background16']"
        class="tag"
      >
        {{ getValue(tag) }}
      </div>
    </div>
  </div>
</template>

<script>
import { getNames } from '../../utils/tagConfig'
export default {
  name: 'HitTag',
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
      tagList: []
    }
  },
  computed: {
  },
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
  //max-height: 140px;
  //overflow: auto;
  .tags-container {
    font-size: 12px;
    .tag {
      border-radius: 2px;
      display: inline-block;
      padding: 4px 10px;
      margin: 5px;
      //font-weight: bold;
    }
  }
}
</style>
