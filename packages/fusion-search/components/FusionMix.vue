<template>
  <div class="FusionMix">
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
    <div class="hitSupplierAndPurchaser">
      <div class="hitSupAndPurBody">
        <img
          class="supAndPruImg"
          src="http://img14.360buyimg.com/n0/jfs/t12124/15/2052292482/257261/402cce28/5a30c54fN5e5f155e.jpg"
          alt=""
        />
        <div class="hitSupAndPurDes">
          <div class="hitTitle">
            <span class="title">
              供应商标题
            </span>
            <span class="hitTagSpan" v-if="true">业主</span>
            <span class="hitTagSpan" v-else>供应商</span>
          </div>
          <div class="hitTag">
            <HitTag :theme="'JFH'" />
          </div>
        </div>
      </div>
      <div>
        <HitPropertyList :type="'supplier'"></HitPropertyList>
      </div>
    </div>
  </div>
</template>

<script>
import HitTag from '../components/HitMix/HitTag'
import HitPropertyList from '../components/HitMix/HitPropertyList'
export default {
  name: 'FusionMix',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  inject: ['hit', 'theme'],
  components: {
    HitTag,
    HitPropertyList
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style scoped lang="scss">
@import '../common/common';
.FusionMix {
}
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
.hitSupplierAndPurchaser {
  .hitSupAndPurBody {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    .supAndPruImg {
      width: 54px;
      height: 54px;
      background: rgba(28, 45, 90, 0.03);
      border-radius: 4px;
      margin-right: 15px;
    }
    .hitTitle {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .title {
        font-size: 16px;
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
        background: $blue1;
        border-radius: 16px;
      }
    }
    .hitSupAndPurDes {
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .hitTag {
        margin-top: 10px;
      }
    }
  }
}
</style>
