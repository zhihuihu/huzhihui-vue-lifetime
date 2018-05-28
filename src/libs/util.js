import axios from 'axios';
import env from '../config/env';
import iView from 'iview';

let util = {

};
util.title = function (title) {
  title = title ? title + ' - Home' : 'iView project';
  window.document.title = title;
};

const ajaxUrl = env === 'development' ?
  'http://127.0.0.1:8888' :
  env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
  timeout: 30000,
  headers: {
    'x-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// 请求时的拦截
util.ajax.interceptors.request.use(function (config) {
  // 发送请求之前做一些处理
  return config;
}, function (error) {
  // 当请求异常时做一些处理
  return Promise.reject(error);
});

const _this = this;
// 响应时拦截
util.ajax.interceptors.response.use(function (response) {
  // 返回响应时做一些处理
  return response.data;
}, function (error) {
  // 当响应异常时做一些处理
  iView.Message.error('与服务器断开连接了！');
  return Promise.reject(error);
});


export default util;