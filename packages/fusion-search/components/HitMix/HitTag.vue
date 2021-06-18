<template>
  <div class="HitTag">
    <div class="tags-container" v-if="tagList && tagList.length > 0">
      <div
        v-for="(tag, j) in tagList"
        :class="[theme + '-color1', theme + '-background16']"
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
  name: 'HitTag',
  inject: {
    theme: {
      from: 'theme',
      default: ''
    }
  },
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
.HitTag {
  .tags-container {
    font-size: 12px;
    .tag {
      border-radius: 2px;
      display: inline-block;
      padding: 4px 10px;
      margin: 5px;
      font-weight: bold;
    }
  }
}
</style>
