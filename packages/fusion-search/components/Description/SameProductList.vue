<template>
  <div class="SameProductList">
    <div>
      <div class="publicDesTitle">相似的产品</div>
    </div>
    <div class="listRepeat">
      <div v-for="(item, i) in list" :key="i" class="sameProductRe">
        <div class="hitImg">
          <img
            src="http://img14.360buyimg.com/n0/jfs/t12124/15/2052292482/257261/402cce28/5a30c54fN5e5f155e.jpg"
            alt=""
          />
        </div>
        <div class="hitDesBody">
          <div class="hitTitle">
            <span class="title">手机</span>
            <span class="hitTagSpan" :class="[provideData.theme + '-color1', provideData.theme + '-background16']"
              >产品</span
            >
          </div>
          <div class="hitDes">
            法律服务，简称“法服”，是指律师、非律师法律工作者、法律专业人士（包括法人内部在职人员、退、离休政法人员等）或相关机构以其法律知识和技能为法人或自然人实现其正当权益、提高经济效益、排除不法侵害、防范法律风险、维护自身合法权益而提供的专业活动
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SameProductList',
  inject: ['provideData'],
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.SameProductList {
  background: #ffffff;
  margin-top: 20px;
  padding: 20px;
  .listRepeat {
    background: #ffffff;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 100%;
    .sameProductRe {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
      //width: calc(50% - 10px);
      //&:nth-child(odd){
      //  margin-right: 10px;
      //}
      //&:nth-child(even){
      //  margin-left: 10px;
      //}
      .hitImg {
        margin-right: 10px;
        img {
          width: 72px;
          height: 72px;
          background: #d8d8d8;
          border-radius: 4px;
        }
      }
      .hitDesBody {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .hitTitle {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .title {
            font-size: 14px;
            font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
            font-weight: bold;
            color: #1c2d5a;
          }
          .hitTagSpan {
            margin-left: 5px;
            padding: 2px 10px;
            display: inline-block;
            font-size: 12px;
            border-radius: 16px;
          }
        }
        .hitDes {
          @include limit2line;
          margin-top: 10px;
          font-size: 14px;
          font-family: MicrosoftYaqiHei;
          color: rgba(51, 51, 51, 0.6);
        }
      }
    }
  }
}
</style>
