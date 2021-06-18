<template>
  <div class="hitProduct">
    <div class="hitImg">
      <img
        src="http://img14.360buyimg.com/n0/jfs/t12124/15/2052292482/257261/402cce28/5a30c54fN5e5f155e.jpg"
        alt=""
      />
    </div>
    <div class="hitDesBody">
      <div class="hitTitle">
        <span class="title">手机</span>
        <span class="hitTagSpan">产品</span>
      </div>
      <div class="hitDes">
        法律服务，简称“法服”，是指律师、非律师法律工作者、法律专业人士（包括法人内部在职人员、退、离休政法人员等）或相关机构以其法律知识和技能为法人或自然人实现其正当权益、提高经济效益、排除不法侵害、防范法律风险、维护自身合法权益而提供的专业活动
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HitProductMix',
  inject: ['theme', 'hit'],
  props: {},
  data() {
    return {
      hit: this.hit,
      theme: this.theme
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
    height: 120px;
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
        background: #3a72ff;
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
