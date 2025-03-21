import https from '@/https';
import type { CommonRequestParams } from '@/types/apis/common';

// 拆包扫描提交
export const pushSplitPackage = (params: CommonRequestParams & {
  "package_code": string,
}): Promise<any> => {
  return https.post('/pws_api/pws/arrival/unpacking_scan', params);
}
