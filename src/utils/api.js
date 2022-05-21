import request from './request';
import qs from 'qs';
/* 登录 */
export const dologin = data => {
  return request({
    method: 'POST',
    url: '/login/dologin',
    data: qs.stringify(data),
  });
};
/* 进行中项目 */
export const getRunningProject = data => {
  return request({
    method: 'POST',
    url: '/data/running',
    data: qs.stringify(data),
  });
};
/* 暂停中项目 */
export const getPauseProject = data => {
  return request({
    method: 'POST',
    url: '/data/ending',
    data: qs.stringify(data),
  });
};
/* 项目列表 */
export const getProjectList = data => {
  return request({
    method: 'POST',
    url: '/Project/list',
    data: qs.stringify(data),
  });
};
/* 添加用户数据 */
export const saveProjectData = data => {
  return request({
    method: 'POST',
    url: '/project/add_project_data',
    data: qs.stringify(data),
  });
};
/* 项目审核 */
export const examine = data => {
  return request({
    method: 'POST',
    url: '/project/examine',
    data: qs.stringify(data),
  });
};
/* 用户项目列表 */
export const getUserProjectList = data => {
  return request({
    method: 'POST',
    url: '/project/user_project_list',
    data: qs.stringify(data),
  });
};
/* 用户申请列表 */
export const getUserApplyList = data => {
  return request({
    method: 'POST',
    url: '/project/user_apply_list',
    data: qs.stringify(data),
  });
};
/* 用户申请 */
export const saveApply = data => {
  return request({
    method: 'POST',
    url: '/project/apply',
    data: qs.stringify(data),
  });
};
/* 修改项目 */
export const updateProject = data => {
  return request({
    method: 'POST',
    url: '/Project/edit',
    data: qs.stringify(data),
  });
};
/* 添加项目 */
export const saveProject = data => {
  return request({
    method: 'POST',
    url: '/Project/add',
    data: qs.stringify(data),
  });
};
/* 用户列表 */
export const getUserList = data => {
  return request({
    method: 'POST',
    url: '/user/index',
    data: qs.stringify(data),
  });
};
/* 添加用户 */
export const saveUser = data => {
  return request({
    method: 'POST',
    url: '/user/useradd',
    data: qs.stringify(data),
  });
};
/* 修改用户 */
export const updateUser = data => {
  return request({
    method: 'POST',
    url: '/user/useredit',
    data: qs.stringify(data),
  });
};
/* 删除用户 */
export const delUser = data => {
  return request({
    method: 'POST',
    url: '/user/userdel',
    data: qs.stringify(data),
  });
};
/* 修改密码 */
export const modifyPwd = data => {
  return request({
    method: 'POST',
    url: 'user/changePass',
    data: qs.stringify(data),
  });
};
/* 获取和设置权限 */
export const saveAccess = data => {
  return request({
    method: 'POST',
    url: '/user/giveAccess',
    data: qs.stringify(data),
  });
};
/* 获取用户结算申请列表 */
export const getUserPayList = data => {
  return request({
    method: 'POST',
    url: '/pay/list',
    data: qs.stringify(data),
  });
};
/* 用户申请结算 */
export const userApplyPay = data => {
  return request({
    method: 'POST',
    url: '/pay/pay_apply',
    data: qs.stringify(data),
  });
};
/* 管理员查看用户结算列表 */
export const getPayListOfManager = data => {
  return request({
    method: 'POST',
    url: '/pay/user_pay_list',
    data: qs.stringify(data),
  });
};
/* 管理员结算 */
export const doPay = data => {
  return request({
    method: 'POST',
    url: '/pay/pay',
    data: qs.stringify(data),
  });
};
/* 用户信息 */
export const saveUserInfo = data => {
  return request({
    method: 'POST',
    url: '/user/user_info',
    data: qs.stringify(data),
  });
};
/* 发布消息 */
export const saveMessage = data => {
  return request({
    method: 'POST',
    url: '/message/add',
    data: qs.stringify(data),
  });
};
/* 获取未读消息数量 */
export const getUnReadMsg = data => {
  return request({
    method: 'POST',
    url: '/message/getUnreadMessage',
    data: qs.stringify(data),
  });
};
/* 获取消息列表 */
export const getMessageList = data => {
  return request({
    method: 'POST',
    url: '/Message/list',
    data: qs.stringify(data),
  });
};
/* 首页 */
export const getIndex = data => {
  return request({
    method: 'POST',
    url: '/index/index',
    data: qs.stringify(data),
  });
};
/* 体现记录 */
export const getClearLog = data => {
  return request({
    method: 'POST',
    url: '/pay/pay_log',
    data: qs.stringify(data),
  });
};
/* 标记已读 */
export const markMessage = data => {
  return request({
    method: 'POST',
    url: '/Message/markMessage',
    data: qs.stringify(data),
  });
};
/* 消息列表 */
export const getMsgList = data => {
  return request({
    method: 'POST',
    url: '/Message/list',
    data: qs.stringify(data),
  });
};