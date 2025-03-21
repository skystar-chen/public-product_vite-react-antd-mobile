import type { IRoute } from './types';

// 递归获取子路由
function getChildren(currentItem, currentRoutes, currentPath = '') {
  const newChildren: IRoute[] = [];
  for (let ii = 0, len = currentItem.children.length; ii < len; ii++) {
    const tt = currentItem.children[ii], newPath = currentPath + tt.path;
    if (tt.children) {
      getChildren(tt, currentRoutes, newPath);
      continue;
    }
    if (!tt.isRenderChild) {
      currentRoutes.push({
        ...tt,
        path: newPath,
      });
      continue;
    }
    newChildren.push({
      ...tt,
      path: newPath,
    });
  }
  
  currentItem.children = newChildren;
  if (!currentItem.isRenderChild) {
    const newItem = { ...currentItem, path: currentPath };
    if (!newChildren.length) delete newItem.children;
    currentRoutes.push(newItem);
  }
}

// 获取渲染的路由结构，页面中直接使用
function getRenderRoutes(routes: IRoute[]) {
  const renderRoutes: IRoute[] = [];
  for (let i = 0, l = routes.length; i < l; i++) {
    const t = routes[i];
    if (t.children) {
      getChildren(t, renderRoutes, t.path);
      continue;
    }
    renderRoutes.push(t);
  }
  return renderRoutes;
}

function getFlatChildrenRoutes(currentItem, currentRoutes, currentPath = '') {
  currentRoutes.push({
    ...currentItem,
    path: currentPath,
    children: null,
  });
  for (let ii = 0, len = currentItem.children.length; ii < len; ii++) {
    const tt = currentItem.children[ii], newPath = currentPath + tt.path;
    if (tt.children) {
      getFlatChildrenRoutes(tt, currentRoutes, newPath);
      continue;
    }
    currentRoutes.push({
      ...tt,
      path: newPath,
    });
  }
}

// 拉平路由
function getFlatRoutes(routes: IRoute[]) {
  const flatRoutes: IRoute[] = [];
  for (let i = 0, l = routes.length; i < l; i++) {
    const t = routes[i];
    if (t.children) {
      getFlatChildrenRoutes(t, flatRoutes, t.path);
      continue;
    }
    flatRoutes.push(t);
  }
  return flatRoutes;
}

export { getRenderRoutes, getFlatRoutes };
