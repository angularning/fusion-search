<template>
  <div class="OrgProperty">
    <div
      class="OrgPropertyList"
      v-for="(item, i) in supplierProperties"
      :key="i"
      :label="item.label"
      :value="item.value"
      :full-width="item.fullWidth"
      v-show="item.value && item.value.length > 0"
    >
      <div v-if="item.value && item.value.length > 0" class="propertyItem" :class="containerStyle">
        <div class="item-label">
          {{ item.label }}
        </div>
        <div v-if="item.label !== '机构官网'">{{ item.value }}</div>
        <div v-else
          ><a :class="[provideData.theme + '-color1']" :href="item.value" target="_blank">{{
            item.value
          }}</a></div
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrgProperty',
  inject: ['provideData'],
  props: {
    // datalist: {
    //   type: Object,
    //   default: () => {
    //   },
    // },
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
        label: '机构官网',
        prop: 'org_url'
        // fullWidth: value => value.length > 30
      }
    ]
    return {
      supplierPropertyMap,
      datalist: {
        id: '8f609cbd-7aea-c34a-c604-311efdeb178f',
        org_name: '北京市京师（郑州）律师事务所',
        org_alias: [],
        org_phone: '60972110',
        location: '410100',
        est_date: '2016-01-28',
        reg_cap: '30.0',
        law_per: '',
        org_type: '',
        uniform_code: '31410000MD0091501E',
        reg_code: '',
        org_code: '',
        op_limit: '',
        address: '郑州市郑东新区商务中央花园2号楼1号楼11层',
        op_scope: '',
        is_included: '外部',
        is_winbid: '1',
        is_purchaser: '0',
        org_tag: [
          'FW02',
          'OT02',
          'FW010105',
          'FW0102',
          'FW0101',
          'XY0201',
          'FW010202',
          'FW01',
          'FW010103'
        ],
        org_url: 'www.jingshizz.com',
        strength: 85,
        copyright: [],
        patent: [],
        supplier_billboard: [],
        supplier_brand: [],
        supplier_related_product: [
          { name: '法律服务', id: '1b3e58c744e4c23dac5e2921e3ed4af1' },
          {
            name: '第三方咨询服务',
            id: '57730084c8ea7a62627355bebec0954c'
          },
          { name: '第三方服务', id: '897022bf22bac3b636832b630abd9cfa' }
        ],
        supplier_case_recent_date: '2020-07-21',
        supplier_related_purchaser: [
          {
            name: '上海浦东发展银行股份有限公司',
            id: '6556af0a-ba3a-8203-8704-ae3910feb48e'
          },
          { name: '中原银行股份有限公司', id: '10725bd9-9616-e138-1225-437704dff7ad' },
          {
            name: '中国人民财产保险股份有限公司濮阳市分公司',
            id: '44fb004d-0e12-1d1e-bec6-3a1c6908519e'
          }
        ],
        supplier_related_location: [{ name: '310000' }, { name: '410000' }],
        supplier_data_source: [],
        stat_supplier_product_category: [
          { tag_name: '法律服务', count: 3 },
          {
            tag_name: '第三方服务',
            count: 1
          },
          { tag_name: '第三方咨询服务', count: 1 }
        ],
        stat_supplier_purchaser_category: [],
        stat_supplier_purchaser_location: [
          { location: '410000', count: 3 },
          { location: '310000', count: 1 }
        ],
        org_website_info: {
          programme: [],
          product: [],
          service: [
            {
              url: 'http://www.jingshizz.com/index/service/index/ct/2.html',
              name: '民事法律服务',
              depth: 2,
              label: 'FA0099',
              order: 1,
              columns: [
                {
                  url: 'http://www.jingshizz.com/index/service/index/ct/2.html',
                  name: '民事法律服务',
                  depth: 2,
                  label: 'FA0099',
                  order: 1,
                  columns: []
                }
              ]
            },
            {
              url: 'http://www.jingshizz.com/index/service/index/ct/3.html',
              name: '刑事法律服务',
              depth: 2,
              label: 'FA0099',
              order: 2,
              columns: [
                {
                  url: 'http://www.jingshizz.com/index/service/index/ct/3.html',
                  name: '刑事法律服务',
                  depth: 2,
                  label: 'FA0099',
                  order: 2,
                  columns: []
                }
              ]
            },
            {
              url: 'http://www.jingshizz.com/index/service/index/ct/4.html',
              name: '企业法律顾问',
              depth: 2,
              label: 'FA0099',
              order: 3,
              columns: [
                {
                  url: 'http://www.jingshizz.com/index/service/index/ct/4.html',
                  name: '企业法律顾问',
                  depth: 2,
                  label: 'FA0099',
                  order: 3,
                  columns: []
                }
              ]
            },
            {
              url: 'http://www.jingshizz.com/index/service/index/ct/7.html',
              name: '行政诉讼法律服务',
              depth: 2,
              label: 'FA0099',
              order: 4,
              columns: [
                {
                  url: 'http://www.jingshizz.com/index/service/index/ct/7.html',
                  name: '行政诉讼法律服务',
                  depth: 2,
                  label: 'FA0099',
                  order: 4,
                  columns: []
                }
              ]
            },
            {
              url: 'http://www.jingshizz.com/index/service/index/ct/6.html',
              name: '知识产权法律服务',
              depth: 2,
              label: 'FA0099',
              order: 5,
              columns: [
                {
                  url: 'http://www.jingshizz.com/index/service/index/ct/6.html',
                  name: '知识产权法律服务',
                  depth: 2,
                  label: 'FA0099',
                  order: 5,
                  columns: []
                }
              ]
            }
          ]
        },
        ent_type: 'supplier'
      }
    }
  },
  computed: {
    supplierProperties() {
      return this.supplierPropertyMap.map((item) => {
        const { label, prop, fullWidth = () => false, calc } = item
        let value
        if (prop === 'org_type') {
          value = calc ? calc(this.datalist) : this.getNames(this.datalist[prop])
        } else {
          value = calc ? calc(this.datalist) : this.datalist[prop]
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
    getNames(value) {
      return value
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
}
</style>
