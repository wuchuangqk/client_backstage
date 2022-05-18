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