<template>
  <div class="LocationTag">
    <div class="tags-container" v-if="tagList && tagList.length > 0">
      <div
        v-for="(tag, j) in tagList"
        :key="j"
        class="tag"
      >
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationTag',
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
    }
  },
  data() {
    return {
      first_list: [],
      second_list: [],
      tagList: ['北京', '上海'],
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
    handleClick(item, tag, e) {
      if (item.label === '同义词') {
        if (item.navi) {
          // this.$emit('nav-tag', e.target.innerText)
        }
      } else if (item.navi) {
        this.$emit('nav-tag', tag)
      }
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
