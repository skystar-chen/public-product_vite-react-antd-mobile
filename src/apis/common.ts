import https from '@/https';
import type { LoginResultType, CommonRequestParams, UserList } from '@/types/apis/common';

export const loginApi = (params: {
  username: string;
  password: string;
}): Promise<LoginResultType> => {
  return https.post('/rest_api/rest/index/login', params);
}

// 查询用户列表
export const getUsers = (params: CommonRequestParams): Promise<UserList> => {
  return https.post('/pws_api/rest/search_criteria/get_users', params);
}
