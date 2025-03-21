import https from '@/https';
import type {
  ReceivePackageMessage,
  ReceivePackageResultList,
} from '@/types/apis/receivePackage';
import type { CommonRequestParams } from '@/types/apis/common';

// 收包扫描提交
export const pushReceivePackage = (params: CommonRequestParams & {
  "package_code": string,
}): Promise<ReceivePackageMessage> => {
  return https.post('/pws_api/pws/arrival/receipt_scan', params, { original: true });
}

// 收包扫描无匹配提交
export const pushReceivePackageInvalidSubmit = (params: CommonRequestParams & {
  "track_number": string,
  "stock_user_id": number,
}): Promise<any> => {
  return https.post('/pws_api/pws/arrival/failed_to_submit_match', params);
}

// 收包扫描扫描结果列表
export const getReceivePackageResultList = (params: CommonRequestParams): Promise<ReceivePackageResultList> => {
  return https.post('/pws_api/pws/arrival/receipt_scanned', params);
}
