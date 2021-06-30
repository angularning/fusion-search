<template>
  <div class="DescriptionTag">
    <div
      v-if="list && list.length > 0"
      class="tags-container"
    >
      <div
        v-for="(tag, j) in list"
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
  name: 'DescriptionTag',
  inject: ['provideData'],
  props: {
    forceType: {
      type: String,
      default: ''
    },
    types: {
      type: String,
      default: ''
    },
    forceTagListConf: {
      type: Object,
      default: null
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      first_list: [],
      second_list: [],
      tagList: ['供应商', '案例'],
      theme: this.theme
    }
  },
  computed: {
    isShow() {
      return this.tagList.length > 0
    }
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
.DescriptionTag {
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
