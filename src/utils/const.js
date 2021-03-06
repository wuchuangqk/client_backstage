// TODO 推广类型
export const PROMOTION_TYPE = [
  { key: '网推', value: 1 },
  { key: '地推', value: 2 },
  { key: '不限', value: 3 },
]
// 申请状态
export const APPLY_STATE = [
  { key: "未通过", value: 0, tag: "danger" },
  { key: "正常", value: 1, tag: "success" },
  { key: "待审核", value: 2, tag: "primary" },
  { key: "暂停", value: 3, tag: "info" },
]
// 结算状态
export const CLEAR_STATE = [
  { key: "待结算", value: 0, tag: "info" },
  { key: "已结算", value: 1, tag: "success" },
  { key: "未通过", value: 2, tag: "danger" },
  { key: "结算中", value: 3, tag: "primary" },
]