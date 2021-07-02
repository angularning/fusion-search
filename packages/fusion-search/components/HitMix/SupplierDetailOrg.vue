<template>
  <div class="SupplierDetailOrg">
    <div class="hitSupAndPurBody">
      <div
        class="orgTopImg"
        :class="[provideData.theme+'-logo']"
      >
        {{ (data.comp_name&&data.comp_name.substring(0,1))||(data.purchase_name&&data.purchase_name.substring(0,1)) }}
      </div>
      <div class="hitSupAndPurDes">
        <div class="hitTitle">
          <span class="title">
            {{ data.comp_name || data.purchase_name }}
          </span>
          <span
            v-if="data.type_own==='purchaser'"
            class="hitTagSpan"
            :class="[provideData.theme+'-background1']"
          >业主</span>
          <span
            v-else
            class="hitTagSpan"
            :class="[provideData.theme+'-background1']"
          >供应商</span>
        </div>
        <div class="hitTag">
          <HitTag :data="data" />
        </div>
      </div>
    </div>
    <HitPropertyList
      :data="data"
      :from="'modal'"
      :type="'supplier'"
    />
  </div>
</template>

<script>
import HitTag from './HitTag'
import HitPropertyList from './HitPropertyList'
export default {
  name: 'SupplierDetailOrg',
  inject: ['provideData'],
  components: {
    HitTag,
    HitPropertyList
  },
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
  beforeCreate() {
    // if(this.provideData){
    //
    // }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.orgTopImg {
  width: 54px;
  height: 54px;
  line-height: 54px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  font-size: 26px;
  margin-right: 10px;
  //width: 54px;
  //height: 54px;
  //vertical-align: middle;
}
.SupplierDetailOrg {
  .hitSupAndPurBody {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 25px;
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
        border-radius: 16px;
      }
    }
    .hitSupAndPurDes {
      min-height: 60px;
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
