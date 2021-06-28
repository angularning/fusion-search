<template>
  <div
    class="no-results"
    :class="[from==='list'?'listNoResult': '']"
  >
    <img src="http://cdn-caigou.shuniucloud.com/img/kg-cloud-pc-fe.no-searche7dfd1a.png">
    <div>暂未搜索到相关信息</div>
  </div>
</template>

<script>
export default {
  name: 'NoResult',
  inject: ['provideData'],
  props: {
    from: {
      type: String,
      default: () => 'body'
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {},
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.no-results {
  position: absolute;
  top: 200px;
  left: calc(50% - 158px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #B3B9C6;
  img {
    width: 316px;
    height: 290px;
    margin-bottom: 50px;
  }
}
.listNoResult{
  text-align: center;
  position: relative !important;
  top: 20px !important;
  left: 0 !important;
  padding-bottom: 50px;
  img{
    width: 200px !important;
    height: 190px !important;
    margin-bottom: 20px;
  }
}
</style>
