<template>
  <div class="searchInputContainer">
    <!-- <span class="search-input-title"><img style="width: 100%;" src="" alt=""/></span> -->
    <el-input
      v-model="keywordCopy"
      placeholder="请输入内容"
      class="input-with-select"
      :class="[provideData.theme+'-input']"
      @keyup.enter.native="toSearchList"
    >
      <el-select
        v-if="false"
        slot="prepend"
        v-model="select"
        placeholder="请选择"
      >
        <el-option
          label="查系统"
          value="1"
        />
        <el-option
          label="查委办局"
          value="2"
        />
      </el-select>
    </el-input>
    <el-button
      type="primary"
      :class="[provideData.theme+'-buttonNormal']"
      class="searchButton"
      @click.stop="toSearchList"
    >
      搜索
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'FusionInput',
  components: {},
  inject: ['provideData'],
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    keyword: {
      type: String,
      default: () => null
    }
  },
  data() {
    return {
      select: '1',
      keywordCopy: null
    }
  },
  watch: {
    keyword(value) {
      this.keywordCopy = JSON.parse(JSON.stringify(value))
    }
  },
  mounted() {
    this.$EventBus.$on('fusion-list-search', (value) => {
      this.keywordCopy = value
    })
  },
  beforeDestroy() {
    this.$EventBus.$off('fusion-list-search')
  },
  methods: {
    toSearchList() {
      this.$emit('search', this.keywordCopy)
    }
  }
}
</script>

<style lang="scss">
.searchInputContainer .el-input-group__prepend {
  padding: 0;
  width: 70px;
  background-color: #fbfcff;
  text-align: right;
  .el-select {
    width: 66px;
    margin: 0;
    height: 26px;
    background-color: #e2e2e7;
    border-radius: 4px;
  }
  .el-input,
  .el-input__inner {
    height: 26px;
    line-height: 26px;
  }
  .el-input__inner {
    padding-left: 8px;
    padding-right: 0px;
    font-size: 12px;
    font-family: MicrosoftYaqiHei;
    color: #1c2d5a !important;
  }
  .el-input__icon {
    line-height: 26px;
    width: 12px;
    color: #1c2d5a !important;
    font-size: 12px !important;
  }
  .el-icon-arrow-up:before {
    content: '\E78F';
  }
}
.searchInputContainer .el-input__inner {
  //border-left: none;
  background: #fbfcff;
  height: 34px;
}
</style>
<style scoped lang="scss">
.searchInputContainer {
  width: 100%;
  height: 74px;
  background: #ffffff;
  border-radius: 4px;
  line-height: 74px;
  .input-with-select {
    width: 712px;
    margin-left: 20px;
  }
  .searchButton {
    width: 168px;
    height: 34px;
    background: #3a72ff;
    border-radius: 4px;
    margin-left: 20px;
    line-height: 0;
  }
}
</style>
