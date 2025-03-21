import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { IRoute } from '@/routes/types';
import { flatRoutes } from '@/routes';

/**
 * 路由信息变化时，拿到对应的路由信息
 */
function useRoute() {
  
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState<IRoute | null>(null);

  // 地址栏变化时，重新获取当前路由信息
  useEffect(() => {
    for (let i = 0, l = flatRoutes.length; i < l; i++) {
      const t = flatRoutes[i];
      if (location?.pathname === t.path) {
        setCurrentRoute(t);
        if (t.meta) document.title = t.meta;
        break;
      }
      // 404
      if (i === l - 1) {
        setCurrentRoute(flatRoutes.find((t) => t.path === '*') || null);
      }
    }
  }, [location?.pathname]);

  return {
    currentRoute,
  };
}

export default useRoute;
