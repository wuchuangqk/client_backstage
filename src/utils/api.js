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