<template>
  <div class="LocationTag">
    <div
      v-if="list&&list.length>0"
      class="tags-container"
    >
      <div
        v-for="(tag, j) in list"
        v-show="(getValue(tag)!==undefined) || tag !== '0000'"
        :key="j"
        class="tag"
      >
        {{ getValue(tag) }}
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import { city_group } from '../../common/city'

export default {
  name: 'LocationTag',
  inject: ['provideData'],
  props: {
    list: {
      type: [Array, String],
      default: ''
    }
  },
  data() {
    return {
      first_list: [],
      second_list: [],
      // tagList: ['北京', '上海'],
      theme: this.theme
    }
  },
  computed: {
    isShow() {
      return this.list.length > 0
    }
  },
  watch: {},
  methods: {
    getValue(value) {
      return city_group[value]
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.LocationTag {
  .tags-container {
    font-size: 12px;
    .tag {
      border-radius: 2px;
      display: inline-block;
      padding: 4px 10px;
      margin: 5px;
      background: rgba(108, 204, 232, 0.1);
      color: rgba(108, 204, 232, 1);
      //font-weight: bold;
    }
  }
}
</style>
