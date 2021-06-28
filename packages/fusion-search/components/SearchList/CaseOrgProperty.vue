<template>
  <div class="OrgProperty">
    <div
      v-for="(item, i) in supplierProperties"
      :key="i"
      class="OrgPropertyList"
      :label="item.label"
      :value="item.value"
    >
      <div
        v-if="item.value"
        class="propertyItem"
        :class="containerStyle"
      >
        <div class="item-label">
          {{ item.label }}
        </div>
        <div v-if="item.label !== '成交内容'">
          {{ item.value }}
        </div>
        <div
          v-else
          :class="[provideData.theme + '-color1','textOverflow']"
        >
          {{
            item.value
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaseOrgProperty',
  inject: ['provideData'],
  props: {
    datalist: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: () => 'supplier'
    }
  },
  data() {
    const supplierPropertyMap = [
      {
        label: '采购金额',
        prop: 'case_winamount_sum'
        // calc: this.getDatalistRegCap
      },
      {
        label: '成交时间',
        prop: 'case_release_date'
        // calc: datalist => this.est_date(datalist.est_date)
      },
      {
        label: '供应商',
        prop: 'winbid'
        // fullWidth: value => value.length > 30
      }
    ]
    return {
      supplierPropertyMap
    }
  },
  computed: {
    supplierProperties() {
      return this.supplierPropertyMap.map((item) => {
        if (!item) return
        const { label, prop, fullWidth = () => false } = item
        let value
        if (prop === 'case_winamount_sum') {
          value = this.setRegCap(this.datalist && this.datalist[prop])
        } else if (prop === 'winbid') {
          value = this.datalist && this.datalist[prop] && this.datalist[prop].length > 0 && this.datalist[prop].join()
        } else {
          value = this.datalist && this.datalist[prop]
        }
        return {
          label,
          fullWidth: fullWidth(value),
          value
        }
      })
    },
    containerStyle() {
      return 'propertyItem-' + this.provideData.theme
    }
  },
  methods: {
    setRegCap(value) {
      return (value / 10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../common/common';
.OrgProperty {
  width: calc(100% - 40px);
  background: rgba(0, 0, 0, 0.02);
  padding: 12px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;

  .OrgPropertyList {
    margin-right: 30px;
    .propertyItem {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      a {
        text-decoration: underline;
      }
      &:last-child {
        color: rgba(51, 51, 51, 0.5);
        font-size: 12px;
        //margin-right: 0;
      }

      .item-label {
        font-size: 12px;
        color: rgba(51, 51, 51, 1);
        margin-right: 15px;
      }
    }
    .propertyItem-supplier {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      border-radius: 4px;
      font-size: 12px;
      color: #1c2d5a;
      &:nth-child(2n + 2) {
        //margin-right: 0;
      }

      .item-label {
        color: #1c2d5a;
        font-weight: bold;
        margin-right: 15px;
      }
    }

    //.propertyItem-purchaser {
    //  border: 1px solid rgba(255, 176, 58, 0.4);
    //
    //  .item-label {
    //    color: #FFB03A;
    //    font-weight: bold;
    //  }
    //}
  }
  .textOverflow{
    //max-width: 200px;
    @include limit1line
  }
}
</style>
