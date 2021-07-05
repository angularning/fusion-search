<template>
  <el-dialog
    :visible.sync="visible"
    width="344px"
    class="submitModal"
    @closed="cancel"
  >
    <article
      v-loading="loading"
      class="gxBox"
    >
      <section class="transition-container">
        <header>
          <span class="title" :class="[provideData.theme+'-color1']">联系寻源顾问</span>
        </header>
        <main class="submitSuccessGw">
          <div>
            <img
              src="data:image/png;base64,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"
              alt=""
            >
          </div>
          <div class="submitSuccessGwTitle">
            提交成功
          </div>
          <div class="submitSuccessGwCon">
            寻源顾问将在<span :class="[provideData.theme+'-color1']">1个工作日</span>内联系您，请耐心等待
          </div>
          <el-button
            type="primary"
            plain
            class="custom-btn  custom-btn__large_fix_size"
            :class="[provideData.theme+'-buttonPlain', 'noHitBtn1']"
            style="width:200px;margin: 0 auto;"
            @click="cancel"
          >
            关闭窗口
          </el-button>
        </main>
      </section>
      <!-- </slide-transition> -->
    </article>
  </el-dialog>
</template>
<script>
export default {
  name: 'SubmitModal',
  components: {
  },
  props: {
    provideData: {
      type: Object,
      default: () => {}
    },
    visibles: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      visible: false,
      description: '',
      mobile: '',
      loading: false
    }
  },
  computed: {
    isActive: {
      get() {
        return this.anno_content_url
      }
    }
  },
  watch: {
    visibles: {
      deep: true,
      immediate: true,
      handler(value) {
        this.visible = JSON.parse(JSON.stringify(value))
      }
    }
  },
  created () {
  },
  methods: {
    addEntityAndConfirm () {
    },
    // 关闭浮窗时, 销毁实例
    closed () {
      this.$emit('cancel', false)
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy()
    },
    cancel () {
      this.$emit('cancel', false)
    },
    confirm () {
      // 关闭浮窗
      this.$emit('cancel', false)
    }
  }
}
</script>
<style lang="scss">
.submitModal {
  .gxBox {
    $root: &;
    $blue: #3A72FF;
    $orange: #FFB03A;
    $green: #49B451;
    $purple: #8F67D4;
    & > section {
      min-height: 300px;
      padding: 0 62px;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      // align-items: center;
      header {
        width: 100%;
      }
      main {
        flex: 1;
        width: 100%;
      }
      .submitSuccessGw{
        text-align: center;
        div{
          img{
            width: 60px;
            height: 60px;
            margin: 100px 0 30px 0;
          }
          button{
            margin: 0 auto;
          }
        }
        .submitSuccessGwTitle{
          font-size:16px;
          font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
          font-weight:bold;
          color:rgba(28,45,90,1);
        }
        .submitSuccessGwCon{
          font-size:14px;
          font-family:MicrosoftYaqiHei;
          color:rgba(28,45,90,1);
          margin: 20px 0 50px 0;
          span{
          }
        }
      }
      footer {
        width: 100%;
      }
    }
    .el-form{
      .el-form-item{
        label{
          font-size:16px;
          font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
          font-weight:bold;
          color:rgba(28,45,90,1);
        }
        .el-form-item__label{
          font-size:14px !important;
          padding: 0 !important;
        }
      }
    }
    .custom-btn {
      padding: 4px 12px;
      font-size: 16px;
      border-radius: 4px;

      &.custom-btn__primary {
        background-color: #3A72FF;
        color: white;
      }
      &.custom-btn__default {
        border: 1px solid #3A72FF;
        background-color: white;
        color: #3A72FF;
      }

      &.custom-btn__large_fix_size {
        width: 196px;
        height: 46px;
        padding: 12px 4px;
      }
    }

    header {
      margin-bottom: 20px;
      color: #3A72FF;
      font-size: 16px;
      line-height: 21px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;

      .title.inactive {
        color: rgba(58, 114, 255, 0.5);
      }

      &.with-back-btn {
        justify-content: space-between;
      }
      .title-back-btn {
        cursor: pointer;
      }
    }
    main {
      display: flex;
      flex-direction: column;
      & > *:first-child {
        width: 100%;
      }
      .template-options {
        display: flex;
        .option {
          &.active {
            color: #3A72FF;
          }

          .icon {
            height: 130px;
            width: 130px;
            margin-bottom: 16px;
            font-size: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius:4px;

            &.active {
            }
          }
          .title {
            font-size: 14px;
            text-align: center;
          }
        }
        .option + .option {
          margin-left: 20px;
        }
      }
    }

    footer {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .dialog-header {
    color: #1C2D5A;
    font-size: 18px;
    font-weight: bold;
    .case-detail-url {
      color: #B3B9C6;
      margin: 10px 0;
      font-size: 14px;
      font-weight: normal;
      cursor: pointer;
      &.active {
        color: #3A72FF;
      }
      .case-detail-content {
        font-size: 16px;
        color: #858A93;
      }
    }
  }
  .dialog-body {
    min-height: 100px;
    max-height: 700px;
    overflow-y: auto;
    position: relative;
    .dialog-body-top{
      display: flex;
      flex-flow: row wrap;
      .product-property-item {
        width: 49%;
        height: 40px;
        margin-right: 2%;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        background: rgba(58, 114, 255, 0.04);
        border: 1px solid rgba(58,114,255,0.4);
        border-radius: 4px;
        color: #1C2D5A;
        &:nth-child(2n+2) {
          margin-right: 0;
        }
        div {
          font-size: 14px;
          &:first-child {
            color: #1C2D5A;
            font-weight: bold;
          }
          &:last-child {
            color: #3A72FF;
            font-weight: bold;
          }
        }
      }
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    .confirm,
    .cancel {
      width: 100px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      font-size: 14px;
      cursor: pointer;
      margin: 0 10px;
      &:hover {
        opacity: .9;
      }
    }
    .confirm {
      background: #0369B4;
      color: #fff;
    }
    .cancel {
      color: #616161;
      background: #EDEDF0;
    }
  }
  .packageTitle{
    color: #b3b9c6;
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 10px;
  }
  .packageClass{
    background: #f7f9ff;
    font-size: 13px;
    padding: 0 10px 10px 10px;
    .packageIndex{
      background: #3A72FF;
      color: #fff;
      margin-bottom: 10px;
      width: 60px;
      text-align: center;
      padding: 4px 2px;
      font-size: 10px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .packageWinbid{
      display: flex;
      flex-flow: row wrap;
    }
    .packageWinbid span{
      background:rgba(58,114,255,0.1);
      color: #3A72FF;
      margin-bottom: 10px;
      text-align: center;
      padding: 4px 10px;
      margin-right: 10px;
      font-size:12px;
      font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
      font-weight:bold;
    }
    .packageProduct{
      display: flex;
      flex-flow: row wrap;
    }
    .packageProduct span{
      background:rgba(73,180,81,0.1);
      color: #49B451;
      margin-bottom: 10px;
      text-align: center;
      padding: 4px 10px;
      margin-right: 10px;
      font-size:12px;
      font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
      font-weight:bold;
    }
    .packageAmountBlack{
      color: #0F1629;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .packageAmount{
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      height:34px;
      line-height: 34px;
      background:rgba(58,114,255,0.1);
      border-radius:2px;
      border:1px solid rgba(58,114,255,0.14);
      font-size:12px;
      font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
      font-weight:bold;
      vertical-align: middle;
      margin-bottom: 10px;
    }
    .packageAmount span:first-child{
      color: #3A72FF;
      margin-left: 10px;
    }
    .packageAmount span:last-child{
      color: #1C2D5A;
      margin-right: 10px;
    }
  }
  .defalutColor{
    color: #fff;
    padding: 3px 14px;
    background: #3a72ff;
    display: inline-block;
    border-radius: 4px;
    font-size: 12px;
  }
  .caseTagClass{
    margin-left: -10px;
    margin-top: 10px;
    display: flex;flex-flow: row wrap;margin-bottom: 5px;
  }
}
</style>
