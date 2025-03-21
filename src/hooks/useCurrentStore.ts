import { useState, useEffect } from 'react';
import { getItem } from '@/utils';

type CurrentStoreType = number | null;

export enum CurrentStoreKeyEnum {
  STORE_KEY = 'current_store',
}

/**
 * 当前登录仓库，后期考虑放状态管理中
 */
function useCurrentStore() {
  const [currentStore, setCurrentStore] = useState<CurrentStoreType>(null);

  useEffect(() => {
    const currentStore: CurrentStoreType = getItem(CurrentStoreKeyEnum.STORE_KEY);
    const pathname = window.location.pathname;
    // 如果未登录，则重定向到登录页面
    if (!currentStore && pathname !== '/login') window.location.href = '/login';
    currentStore && setCurrentStore(currentStore);
  }, []);

  return {
    currentStore,
    setCurrentStore,
  };
}

export default useCurrentStore;
