<template>
  <div>
    <div class="CaseItem">
      <div class="listItemLeft">
        <div class="orgTop">
          <div class="orgDes">
            <div class="orgDesTitle">
              <span
                class="titleName"
                v-html="
                  shortWordStringAndHeight(
                    item && (item.case_name || item.project_name)
                  )
                "
              />
              <Location :item="item" />
            </div>
            <div>
              <HitTag :data="item" />
            </div>
          </div>
        </div>
        <CaseOrgProperty
          :datalist="item"
          style="margin: 10px 0;"
        />
        <OrgTag :data="item" />
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
    <template v-if="show">
      <CaseDetail
        :provide-data="useData"
        :visibles="show"
        @cancel="cancel"
      />
    </template>
  </div>
</template>

<script>
import HitTag from '../HitMix/HitTag'
import OrgTag from './OrgTag'
import Location from './Location'
import CaseOrgProperty from './CaseOrgProperty'
import CaseDetail from '../../modals/CaseDetail'
export default {
  name: 'CaseItem',
  inject: ['provideData'],
  components: {
    CaseOrgProperty,
    Location,
    HitTag,
    OrgTag,
    CaseDetail
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      useData: {},
      loading: false
    }
  },
  methods: {
    cancel() {
      this.show = false
    },
    toSeeDetail() {
      const provideData = this.provideData
      provideData.instance_type = 'case'
      provideData.uuid = this.item.uuid
      provideData.word = this.item.case_name || this.item.project_name
      this.useData = provideData
      this.show = true
      // this.$modal('CaseDetail', {
      //   propsData: {
      //     provideData
      //   },
      //   $store: this.$store,
      //   $router: this.$router
      // })
    },
    shortWordStringAndHeight(value) {
      const keyword = this.provideData.keyword
      const filter = new RegExp(keyword)
      if (value && value.length > 30) {
        return (value.substring(0, 30) + '...').replace(
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
    flex: 4;
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
        width: 100%;
        .orgDesTitle {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;
          width: 100%;
          .titleName {
            margin-right: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 20px;
            font-family: MicrosoftYaqiHei-Bold, MicrosoftYaqiHei;
            font-weight: bold;
            color: #333;
            width: 80%;
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
