export type IRoute = {
  path: string,
  // 页面名称
  meta?: string,
  component: JSX.Element,
  // 是否是嵌套在页面中的子路由，嵌套路由的话需要在对应页面中使用<Outlet />规定子路由的渲染位置
  isRenderChild?: boolean,
  // 是否渲染头部导航栏，不写的话默认是true
  // isRenderHeader?: boolean,
  // 是否渲染头部导航栏的返回按钮
  // isBackIcon?: boolean,
  // 是否渲染底部标签栏，不写的话默认是true
  isRenderFooter?: boolean,
  children?: IRoute[],
}
