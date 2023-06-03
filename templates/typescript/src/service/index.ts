import type { RequestConfig } from "../request/types";
import Request from "../request/index";

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log("实例请求拦截器");

      return config;
    },
    // 响应拦截器
    responseInterceptors: (result) => {
      console.log("实例响应拦截器");
      return result;
    },
  },
})

interface YWZRequestConfig<T> extends RequestConfig {
  data?: T;
}

interface YWZResponse<T> {
  code: number;
  message: string;
  data: T;
}


/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */

const ywzRequest = <D, T = any>(config: YWZRequestConfig<D>): Promise<any> => {
  const { method = "GET" } = config;
  if (method === "get" || method === "GET") {
    config.params = config.data;
  }
  return request.request<YWZResponse<T>>(config);
};

// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};

// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default ywzRequest;
