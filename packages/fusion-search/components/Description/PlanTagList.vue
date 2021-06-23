<template>
  <!--  :class="colors==='purple'?'bigWidth':''"-->
  <div>
    <div
      v-for="(it, i) in list"
      :key="i"
      class="planListTagCon"
    >
      <div class="planListTagConTitle">
        <span class="planListTagConTitleBold">{{ it.name }}</span>
      </div>
      <div class="planListTagConBox">
        <a
          target="_blank"
          :href="it.url"
        >
          查看来源>>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanTagList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    colors: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped lang="scss">
  .bigWidth{
    width: 100%;
  }
  .purpleBg{
    background:rgba(143,103,212,0.08);
    .planListTagCon{
      border:1px solid rgba(143,103,212,0.2) !important;
      .planListTagConTitle{
        width: 100% !important;
        .planListTagConTitleBold{
          width: 100%;
        }
      }
    }
  }
  .planListTagCon{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background: #fff;
    padding: 10px 5px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    margin: 5px;
    border:1px solid rgba(73,180,81,0.2);
    .planListTagConImg{
      width: 60px;
      height: 60px;
      vertical-align: middle;
    }
    .planListTagConTitle{
      display: flex;
      flex-flow: wrap;
      /*width: 160px;*/
      margin: 0 20px 0  10px;
      .planListTagConTitleBold{
        font-size:14px;
        font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
        font-weight:bold;
        color:rgba(28,45,90,1);
        height: 20px;
        display: flex;
        align-items: center;
        i{
          font-style: normal;
        }
        img{
          width: 80px;
          margin-left: 20px;
        }
      }
      .planListTagConTitleDes{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size:12px;
        font-family:MicrosoftYaqiHei;
        color:rgba(28,45,90,0.6);
        margin-top: 10px;
        height: 34px;
      }
    }
    .planListTagConBox{
      width: 110px;
      display: flex;
      flex-flow: wrap;
      text-align: right;
      span{
        font-size:12px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(241,61,61,1);
        height: 50px;
      }
      a{
        font-size:12px;
        font-family:MicrosoftYaqiHei;
        color:rgba(58,114,255,1);
        text-decoration: underline;
        /*margin-top: 30px;*/
      }
    }
  }
</style>
