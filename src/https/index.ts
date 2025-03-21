import axios from 'axios';
import message from '@/utils/message';
import { getItem, removeItem } from '@/utils';
import {
  StorageTokenEnum,
  // RequestMethodEnum,
  ResponseStatusEnum,
  ContentTypeEnum,
} from './enums';
import type { AxiosInstance, ExtendAxiosRequestConfig } from './types';

const STATUS_MESSAGE_CONFIG = {
  404: '请求的资源不存在',
  500: '服务器内部错误',
};

function tipsProcess(status: number, msg: string) {
  switch (status) {
    case 401:
      // Token 过期或未登录，跳转到登录页
      message({
        type: 'error',
        content: '登录已过期，请重新登录',
      });
      removeItem(StorageTokenEnum.TOKEN); // 清除 Token
      // 跳转到登录页
      if (window.location.pathname !== '/login') window.location.href = '/login';
      break;
    default:
      message({
        type: status < 300
          ? 'info'
          : status < 400
            ? 'alert'
            : 'error',
        content: STATUS_MESSAGE_CONFIG?.[status]
          || msg
          || '请求失败',
      });
      break;
  }
}

// 创建 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '', // 设置基础 URL
  timeout: 10000, // 请求超时时间
});

// // 请求拦截器：在请求发送之前处理
instance.interceptors.request.use(
  (config) => {
    // 从 localStorage 中获取 Token
    const token = getItem(StorageTokenEnum.TOKEN);
    if (token) {
      // 请求头设置
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = ContentTypeEnum.JSON;
    }
    if (!config.data) config.data = null;
    return config;
  },
  (error) => {
    // 请求错误处理
    message({
      type: 'error',
      content: '网络错误，请检查网络连接',
    });
    return Promise.reject(error);
  }
);

// 响应拦截器：在响应返回之后处理
instance.interceptors.response.use(
  (response) => {
    const { original } = response.config as ExtendAxiosRequestConfig;
    const { code, message } = response?.data || {};
    // 对响应数据进行处理
    if (code === ResponseStatusEnum.SUCCESS) {
      return original ? response.data : response.data?.data; // 返回响应数据
    }
    // 接口响应数据码不是200，显示错误信息
    tipsProcess(code, message);
    return Promise.reject(response);
  },
  (error) => {
    // 接口响应状态码错误处理
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message;
      tipsProcess(status, message);
    } else {
      message({
        type: 'error',
        content: '网络错误，请检查网络连接',
      });
    }
    return Promise.reject(error);
  }
);

// 封装通用的请求方法
// const https = {
//   [RequestMethodEnum.GET]: (url, params) => instance.get(url, { params }),
//   [RequestMethodEnum.POST]: (url, data) => instance.post(url, data),
//   [RequestMethodEnum.PUT]: (url, data) => instance.put(url, data),
//   [RequestMethodEnum.DELETE]: (url) => instance.delete(url),
// };
const https = instance;

export default https;