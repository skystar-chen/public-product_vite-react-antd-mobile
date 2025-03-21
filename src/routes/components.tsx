import { lazy } from 'react';

// 使用懒加载引入组件
const Login = lazy(() => import('@/views/login'));
const NotFound = lazy(() => import('@/components/NotFound'));
const Home = lazy(() => import('@/views/home'));
const ReceivePackage = lazy(() => import('@/views/home/pages/receivePackage'));
const SplitPackage = lazy(() => import('@/views/home/pages/splitPackage'));
const PersonalCenter = lazy(() => import('@/views/personalCenter'));

export {
  Login,
  NotFound,
  Home,
  ReceivePackage,
  SplitPackage,
  PersonalCenter,
};
