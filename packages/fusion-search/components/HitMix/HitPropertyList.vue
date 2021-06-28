<template>
  <div class="HitProperty">
    <div
      v-for="(item, i) in supplierProperties"
      v-show="item.value && item.value.length > 0"
      :key="i"
      class="HitPropertyList"
      :label="item.label"
      :value="item.value"
      :full-width="item.fullWidth"
    >
      <div
        v-if="item.value && item.value.length > 0"
        class="propertyItem"
        :class="containerStyle"
      >
        <div class="item-label">
          {{ item.label }}
        </div>
        <div
          class="shortWord75"
          :title="item.value"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HitPropertyList',
  inject: ['provideData'],
  props: {
    data: {
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
        label: '注册资本',
        prop: 'reg_cap'
        // calc: this.getDatalistRegCap
      },
      {
        label: '成立时间',
        prop: 'est_date'
        // calc: datalist => this.est_date(datalist.est_date)
      },
      {
        label: '法人',
        prop: 'law_per'
      },
      {
        label: '统一社会信用代码',
        prop: 'uniform_code'
      },
      {
        label: '曾用名',
        prop: 'org_alias'
        // calc: datalist => this.orgAlias(datalist.org_alias)
      },
      {
        label: '地区',
        prop: 'location'
        // calc: this.getDatalistCityNameAll
      },
      {
        label: '联系方式',
        prop: 'org_phone'
      },
      {
        label: '公司类型',
        prop: 'org_type',
        calc: (datalist) => this.getNames(datalist.org_type)
      },
      {
        label: '注册号',
        prop: 'reg_code'
      },
      {
        label: '组织机构代码',
        prop: 'org_code'
      },
      {
        label: '营业期限',
        prop: 'op_limit'
      },
      {
        label: '企业地址',
        prop: 'address'
        // fullWidth: value => value.length > 30
      },
      {
        label: '机构官网',
        prop: 'org_url'
        // fullWidth: value => value.length > 30
      },
      {
        label: '经营范围',
        prop: 'op_scope',
        fullWidth: () => true
      }
    ]
    return {
      supplierPropertyMap
    }
  },
  computed: {
    supplierProperties() {
      return this.supplierPropertyMap.map((item) => {
        const { label, prop, fullWidth = () => false, calc } = item
        let value
        if (prop === 'org_type') {
          value = calc ? calc(this.data) : this.getNames(this.data && this.data[prop])
        } else {
          value = calc ? calc(this.data) : this.data && this.data[prop]
        }
        return {
          label,
          fullWidth: fullWidth(value),
          value
        }
      })
    },
    containerStyle() {
      return 'propertyItem-' + this.type
    }
  },
  methods: {
    getNames(value) {
      return value
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../common/common";
.HitProperty {
  width: calc(100% - 40px);
  background: rgba(0, 0, 0, 0.02);
  padding: 20px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;

  .HitPropertyList {
    width: 31%;
    margin-right: 2%;
    margin-bottom: 10px;
    //height: 40px;

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
    .shortWord75{
      @include limit1line;
      width: 60%;
    }
  }
}
</style>
