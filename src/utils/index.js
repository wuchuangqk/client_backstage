
// ? 日期格式化
export const formatDate = (date, fmt) => {
  date = new Date(date);
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}
// ? 获取今天周几
export const getWeek = () => {
  let week = new Date().getDay();
  switch (week) {
    case 0:
      return '星期日';
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
  }
}
// ? 返回权限
export const getPermission = (key1, key2, key3) => {
  let tree = []
  let list = []
  let list2 = []
  let list3 = []
  tree = JSON.parse(localStorage.getItem('tree'))
  list = tree.filter(item => {
    return item.node_name === key1
  })
  if (list.length > 0) {
    list2 = list[0].son.filter(item => {
      return item.node_name === key2
    })
    if (list2.length > 0) {
      list3 = list2[0].son.filter(item => {
        return item.node_name === key3
      })
    }
  }
  return list3.length > 0 ? true : false
}

// 筛选出有权限的路由配置
// export const filterPermissionRoutes = () => {
//  const tree = localStorage.getItem('tree')
//  const notFound = { path: '*', redirect: '/404', hidden: true }
// }