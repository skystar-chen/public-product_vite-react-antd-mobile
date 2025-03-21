import type {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosInterceptorManager,
  AxiosResponse,
} from 'axios';

export type ExtendAxiosRequestConfig = { original?: boolean } & AxiosRequestConfig;

export interface AxiosInstance {
  (config: ExtendAxiosRequestConfig): AxiosPromise;
  (url: string, config?: ExtendAxiosRequestConfig): AxiosPromise;
  defaults: ExtendAxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<ExtendAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: ExtendAxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>> (config: ExtendAxiosRequestConfig): Promise<R>;
  get<T = any, R = AxiosResponse<T>>(url: string, config?: ExtendAxiosRequestConfig): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: ExtendAxiosRequestConfig): Promise<R>;
  head<T = any, R = AxiosResponse<T>>(url: string, config?: ExtendAxiosRequestConfig): Promise<R>;
  options<T = any, R = AxiosResponse<T>>(url: string, config?: ExtendAxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: ExtendAxiosRequestConfig): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: ExtendAxiosRequestConfig): Promise<R>;
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: ExtendAxiosRequestConfig): Promise<R>;
}
