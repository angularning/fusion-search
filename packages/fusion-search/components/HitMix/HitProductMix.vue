<template>
  <div class="hitProduct">
    <div class="hitImg">
      <img
        src="../../static/defaultProduct@2x.png"
        alt=""
      >
    </div>
    <div class="hitDesBody">
      <div class="hitTitle">
        <span class="title">{{ data.tag_name||data.solution_name }}</span>
        <span
          class="hitTagSpan"
          :class="[provideData.theme+'-background1']"
        >产品</span>
      </div>
      <div class="hitDes">
        {{ data.tag_describe|| data.solution_desc }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HitProductMix',
  inject: ['provideData'],
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.hitProduct {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  .hitImg {
    margin-right: 10px;
    img {
      width: 120px;
      height: 120px;
      background: #d8d8d8;
      border-radius: 4px;
    }
  }
  .hitDesBody {
    //height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .hitTitle {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .title {
        font-size: 20px;
        font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
        font-weight: bold;
        color: #1c2d5a;
      }
      .hitTagSpan {
        margin-left: 5px;
        color: #fff;
        padding: 2px 10px;
        display: inline-block;
        font-size: 12px;
        border-radius: 16px;
      }
    }
    .hitDes {
      margin-top: 10px;
      font-size: 14px;
      font-family: MicrosoftYaqiHei;
      color: rgba(28, 45, 90, 0.6);
    }
  }
}
</style>
