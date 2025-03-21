import https from '@/https';
import type { IMenusType } from '@/types/apis/home';

// 获取首页菜单配置
export const getMenus = (params: {
  // 仓库
  current_store: number | null;
  // 系统 => 3: PC端, 4: 移动端
  module_id: number;
}): Promise<IMenusType[]> => {
  return https.post('/rest_api/rest/index/menus', params);
}
