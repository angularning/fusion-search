<template>
  <div class="CaseItem">
    <div class="listItemLeft">
      <div class="orgTop">
        <div class="orgDes">
          <div class="orgDesTitle">
            <span
              class="titleName"
              v-html="
                shortWordStringAndHeight(
                  '安源区卫生和计划生育委员会本级手机于2021年03月30日一笔交易'
                )
              "
            />
            <Location :item="item" />
          </div>
          <div>
            <HitTag />
          </div>
        </div>
      </div>
      <OrgProperty style="margin: 10px 0;" />
      <OrgTag />
    </div>
    <div class="listItemRight">
      <button
        class="plainBtn"
        :class="[provideData.theme + '-buttonPlain']"
        @click="toSeeDetail"
      >
        查看详情
      </button>
    </div>
  </div>
</template>

<script>
import HitTag from '../HitMix/HitTag'
import OrgTag from './OrgTag'
import Location from './Location'
import OrgProperty from './OrgProperty'
export default {
  name: 'CaseItem',
  inject: ['provideData'],
  components: {
    OrgProperty,
    Location,
    HitTag,
    OrgTag,
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    toSeeDetail() {
      this.$modal('CaseDetail', {
        data () {
          return {
            allowSelectTemplate: true
          }
        },
        $store: this.$store,
        $router: this.$router
      })
    },
    shortWordStringAndHeight(value) {
      const keyword = '手机'
      const filter = new RegExp(keyword)
      if (value && value.length > 42) {
        return (value.substring(0, 42) + '...').replace(
          filter,
          `<span style="color: #F13D3D;">${keyword}</span>`
        )
      } else {
        return value && value.replace(filter, `<span style="color: #F13D3D;">${keyword}</span>`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.CaseItem {
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 1px #eee solid;
  margin-top: 20px;
  .listItemLeft {
    flex: 3;
    width: 100%;
    .orgTop {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      padding-top: 20px;
      .orgImg {
        width: 54px;
        height: 54px;
        vertical-align: middle;
      }
      .orgDes {
        .orgDesTitle {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;
          .titleName {
            margin-right: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 20px;
            font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
            font-weight: bold;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .listItemRight {
    flex: 2;
    text-align: right;
    width: 100%;
    margin-top: 15px;
  }
}
</style>
