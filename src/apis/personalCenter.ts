import https from '@/https';
import type { UserInfo } from '@/types/apis/personalCenter';

// 获取用户信息
export const getUserInfo = (): Promise<UserInfo> => {
  return https.post('/rest_api/rest/index/user');
}
