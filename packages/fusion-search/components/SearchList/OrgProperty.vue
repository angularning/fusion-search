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
        <div
          v-if="item.label !== '机构官网'"
          :title="item.value"
        >
          {{ item.value }}
        </div>
        <div
          v-else
          :title="item.value"
        >
          <a
            :class="[provideData.theme + '-color1']"
            :href="item.value"
            target="_blank"
          >{{
            item.value
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrgProperty',
  inject: ['provideData'],
  props: {
    datalist: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    const supplierPropertyMap = [
      {
        label: '注册资本',
        prop: 'register_capital'
        // calc: this.getDatalistRegCap
      },
      {
        label: '成立时间',
        prop: 'establish_time'
      },
      {
        label: '机构官网',
        prop: 'comp_web_url'
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
        const { label, prop, fullWidth = () => false, calc } = item
        let value
        if (prop === 'register_capital') {
          value = calc ? calc(this.datalist) : this.setRegCap(this.datalist && this.datalist[prop])
        } else {
          value = calc ? calc(this.datalist) : this.datalist && this.datalist[prop]
        }
        if (prop === 'establish_time') {
          console.log()
          if (this.datalist[prop] === null) {
            value = ''
          } else {
            if ((this.datalist[prop]).includes('Z')) {
              value = (this.datalist && this.datalist[prop]).substring(0, 10)
            }
          }
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
      if (value) {
        return value + '万'
      } else {
        return ''
      }
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
  display: inline-flex;
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
}
</style>
