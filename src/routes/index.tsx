import { Navigate } from 'react-router-dom';
import type { IRoute } from './types';
import { getRenderRoutes, getFlatRoutes } from './utils';
import {
  Login,
  NotFound,
  Home,
  ReceivePackage,
  SplitPackage,
  PersonalCenter,
} from './components';

// 路由配置
const routes: IRoute[] = [
  {
    path: '/home',
    meta: '首页',
    component: <Home />,
  },
  {
    // path: '/enterWarehouse/receivePackage',
    path: '/pws/arrival/receipt_scan', // 对应后端
    meta: '收包扫描',
    isRenderFooter: false,
    component: <ReceivePackage />,
  },
  {
    // path: '/enterWarehouse/splitPackage',
    path: '/pws/arrival/unpacking_scan', // 对应后端
    meta: '拆包扫描',
    isRenderFooter: false,
    component: <SplitPackage />,
  },
  {
    path: '/personalCenter',
    meta: '个人中心',
    component: <PersonalCenter />,
  },
  {
    path: '/login',
    meta: '登录',
    // isRenderHeader: false,
    isRenderFooter: false,
    component: <Login />,
  },
  // 重定向到首页
  {
    path: '/',
    // isRenderHeader: false,
    isRenderFooter: false,
    component: <Navigate to="/home" replace />,
  },
  {
    path: '*',
    // isRenderHeader: false,
    isRenderFooter: false,
    component: <NotFound />,
  },
];

export const renderRoutes = getRenderRoutes(routes);

export const flatRoutes = getFlatRoutes(routes);

export default routes;
