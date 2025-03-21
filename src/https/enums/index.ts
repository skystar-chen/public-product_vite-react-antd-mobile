/**
 * @description:  响应状态码常量
 * @author: cxx
 */
export enum ResponseStatusEnum {
  SUCCESS = 200,
  ERROR = 400,
  TIMEOUT = 401,
}

/**
 * @description:  请求方式
 * @author: cxx
 */
export enum RequestMethodEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

/**
 * @description:  常用Content Type
 * @author: cxx
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * @description:  token常量
 * @author: cxx
 */
export enum StorageTokenEnum {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refresh_token',
}
