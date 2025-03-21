import { useEffect } from 'react';
import { StorageTokenEnum } from '@/https/enums';
import { getItem } from '@/utils';

/**
 * 鉴权，判断是否登录
 */
function useAuth() {
  useEffect(() => {
    const isAuthenticated = getItem(StorageTokenEnum.TOKEN); // 检查是否登录
    const pathname = window.location.pathname;
    // 如果未登录，则重定向到登录页面
    if (!isAuthenticated && pathname !== '/login') window.location.href = '/login';
  }, []);
}

export default useAuth;
