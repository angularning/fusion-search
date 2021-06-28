export const tabNav = {
  noHit: [
    {
      name: 'SupplierList',
      key: 'supplier',
      value: '找供应商'
    },
    {
      name: 'CaseList',
      key: 'case',
      value: '找案例'
    },
    {
      name: 'PurchaserList',
      key: 'purchaser',
      value: '找采购业主'
    }
  ],
  product: [
    {
      name: 'SupplierList',
      key: 'supplier',
      value: '供应商',
      order: '-reg_cap'
    },
    {
      name: 'CaseList',
      key: 'case',
      value: '关联案例'
    },
    {
      name: 'PurchaserList',
      key: 'purchaser',
      value: '采购业主'
    }
  ],
  supplier: [
    {
      name: 'CaseList',
      key: 'case',
      value: '相关案例'
    },
    // {
    //   name: 'SameSupplierList',
    //   key: 'sameSupplier',
    //   value: '相似供应商'
    // },
    {
      name: 'PurchaserList',
      key: 'purchaser',
      value: '采购业主'
    }
  ],
  purchaser: [
    {
      name: 'CaseList',
      key: 'case',
      value: '相关案例',
      order: ''
    },
    {
      name: 'SupplierList',
      key: 'Supplier',
      value: '相关供应商'
    }
  ]
}
