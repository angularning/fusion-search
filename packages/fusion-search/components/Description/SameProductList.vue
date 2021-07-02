<template>
  <div class="SameProductList">
    <div style="margin-bottom: 15px;">
      <div class="publicDesTitle">
        {{ type==='supplier'?'采购内容':'相似的产品' }}
      </div>
    </div>
    <div class="listRepeat">
      <div
        v-for="(item, i) in list.slice(0, 10)"
        :key="i"
        class="sameProductRe"
        @click="toSearch(item.solution_name)"
      >
        <div class="hitImg">
          <img
            src="../../static/defaultProduct@2x.png"
            alt=""
          >
        </div>
        <div class="hitDesBody">
          <div class="hitTitle">
            <span class="title">{{ item.solution_name }}</span>
            <span
              class="hitTagSpan"
              :class="[provideData.theme + '-color1', provideData.theme + '-background16']"
            >产品</span>
          </div>
          <div
            v-if="item.hasOwnProperty('solution_desc')"
            class="hitDes"
          >
            {{ item.solution_desc || '' }}
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
    },
    type: {
      type: String,
      default: () => 'supplier'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  methods: {
    toSearch(value) {
      this.$EventBus.$emit('fusion-list-search', value)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.SameProductList {
  .publicDesTitle {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 12px;
    border-bottom: 1px #eee solid;
  }
  background: #ffffff;
  margin-top: 20px;
  padding: 20px;
  .listRepeat {
    background: #ffffff;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 100%;
    cursor: pointer;
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
