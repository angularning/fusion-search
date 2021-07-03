<template>
  <div>
    <div
      v-loading="loading"
      class="SupplierItem"
    >
      <div
        class="listItemLeft"
        @click.stop="showDetail"
      >
        <div class="orgTop">
          <div
            class="orgTopImg"
            :class="[provideData.theme+'-logo']"
          >
            {{ item.comp_name&&item.comp_name.substring(0,1) }}
          </div>
          <div class="orgDes">
            <div class="orgDesTitle">
              <div class="titleName">
                {{ item.comp_name }}
              </div>
              <Location :item="item" />
            </div>
            <div>
              <HitTag :data="item" />
            </div>
          </div>
        </div>
        <OrgProperty
          :type="'supplier'"
          :datalist="item"
        />
      </div>
      <div class="listItemRight">
        <SupplierCaseItem
          :item="item.cases"
          :type="'supplier'"
        />
      </div>
    </div>
    <template v-if="show">
      <SupplierDetail
        :provide-data="useData"
        :visibles="show"
        @cancel="cancel"
      />
    </template>
  </div>
</template>

<script>
import HitTag from '../HitMix/HitTag'
import Location from './Location'
import OrgProperty from './OrgProperty'
import SupplierCaseItem from './SupplierCaseItem'
import SupplierDetail from '../../modals/SupplierDetail'
export default {
  name: 'SupplierItem',
  inject: ['provideData'],
  components: {
    OrgProperty,
    Location,
    HitTag,
    SupplierCaseItem,
    SupplierDetail
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      show: false,
      useData: {}
    }
  },
  methods: {
    cancel() {
      this.show = false
    },
    showDetail() {
      const provideData = this.provideData
      provideData.instance_type = 'supplier'
      provideData.uuid = this.item.uuid
      provideData.comp_name = this.item.comp_name
      this.useData = provideData
      this.show = true
      // this.$modal('SupplierDetail', {
      //   propsData: {
      //     provideData
      //   },
      //   $store: this.$store,
      //   $router: this.$router
      // })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.SupplierItem {
  cursor: pointer;
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
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
      margin-bottom: 15px;
      padding-top: 20px;
      .orgTopImg {
        width: 54px;
        height: 54px;
        line-height: 54px;
        border-radius: 4px;
        text-align: center;
        font-weight: bold;
        font-size: 26px;
        margin-right: 10px;
        min-width: 54px;
        //width: 54px;
        //height: 54px;
        //vertical-align: middle;
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
    width: 100%;
    margin-top: 15px;
  }
}
</style>
