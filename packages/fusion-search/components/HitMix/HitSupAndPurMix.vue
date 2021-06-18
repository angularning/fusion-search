<template>
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
</template>

<script>
import HitTag from './HitTag'
import HitPropertyList from './HitPropertyList'
export default {
  name: 'HitSupAndPurMix',
  inject: ['theme', 'hit'],
  props: {},
  data() {
    return {
      hit: this.hit,
      theme: this.theme
    }
  },
  components: {
    HitTag,
    HitPropertyList
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
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
