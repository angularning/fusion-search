<template>
  <div class="noHitRight">
    <div class="noHitTitle">
      找不到想要的？试试 <span><img
        src="../../static/noHitTipWord.png"
        alt=""
      ></span>
    </div>
    <div class="noHitRightBody">
      <div
        class="noHitThree"
        :class="[provideData.theme+'-color1']"
      >
        比报价 ｜ 找供应商 ｜ 采购咨询
      </div>
      <div class="noHitConShow">
        提交您的需求，专属的寻源顾问将会尽快为您服务！
      </div>
      <div>
        <div class="noHitSubmitTitle">
          寻源需求
        </div>
        <div>
          <el-input
            v-model="demand"
            :class="[provideData.theme+'-input']"
            type="textarea"
            placeholder="请简要描述您的需求（选填）"
          />
        </div>
        <div class="noHitSubmitTitle">
          手机号
        </div>
        <div>
          <el-input
            v-model="mobile"
            :class="[provideData.theme+'-input']"
            placeholder="请输入手机号（选填）"
          />
        </div>
        <div class="noHitBtn">
          <el-button
            type="primary"
            plain
            :class="[provideData.theme+'-buttonPlain', 'noHitBtn1']"
            @click="cancel"
          >
            重置
          </el-button>
          <el-button
            type="primary"
            :class="[provideData.theme+'-buttonNormal', 'noHitBtn2']"
            @click="enter"
          >
            提交
          </el-button>
        </div>
      </div>
      <SubmitModal
        :provide-data="provideData"
        :visibles="show"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script>
import SubmitModal from './SubmitModal'
export default {
  name: 'NoHitRight',
  inject: ['provideData'],
  components: {
    SubmitModal
  },
  props: {
  },
  data() {
    return {
      show: false,
      first_list: [],
      second_list: [],
      tagList: ['供应商', '案例'],
      demand: null,
      mobile: null
    }
  },
  computed: {
    isShow() {
      return this.tagList.length > 0
    }
  },
  watch: {},
  methods: {
    cancel() {
      this.show = false
      this.demand = null
      this.mobile = null
    },
    enter() {
      // 提交
      // adviser/all/
      if (this.mobile === null) return
      const data = {
        cellphone: this.mobile,
        product_name: this.demand
      }
      this.$post(this.provideData.baseUrl + 'adviser/', data).then(item => {
        if (item) {
          this.show = true
          // this.$message.success('提交成功')
          setTimeout(() => {
            this.demand = null
            this.mobile = null
          })
        }
        // eslint-disable-next-line handle-callback-err
      }).catch(err => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.noHitTitle{
  span{
    img{
      width: 110px;
      position: relative;
      top: 4px;
      display: inline-block;
    }
  }
}
.noHitRight{
  background: #ffffff;
  margin-top: 40px;
  .noHitRightBody{
    padding: 20px;
    .noHitThree{
      font-size: 16px;
      font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
      font-weight: bold;
    }
    .noHitConShow{
      font-size: 14px;
      font-family: MicrosoftYaqiHei;
      color: rgba(28, 45, 90, 0.5);
      margin: 10px 0;
    }
    .noHitSubmitTitle{
      font-size: 14px;
      font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
      font-weight: bold;
      margin: 10px 0;
    }
  }
  .noHitBtn{
    text-align: center;
    margin-top: 20px;
    .noHitBtn1{
      line-height: 6px;
      width: 48%;
    }
    .noHitBtn2{
      line-height: 6px;
      width: 45%;
    }
  }
  .noHitTitle{
    padding: 10px 20px;
    font-size: 16px;
    font-family: MicrosoftYaqiHei;
    color: #1C2D5A;
    border-bottom: 1px solid rgba(38, 38, 38, 0.08);
  }
}

</style>
