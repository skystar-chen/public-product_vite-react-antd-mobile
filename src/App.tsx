import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { renderRoutes } from '@/routes';
import useAuth from '@/hooks/useAuth';
import useCurrentStore from '@/hooks/useCurrentStore';
import Layout from '@/layout';
import Loading from '@/components/Loading';

function App() {

  useAuth();
  useCurrentStore();

  // 递归渲染嵌套路由
  const renderRoutesFn = (routes) => {
    return routes?.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={route.component}
        >
          {route.children && renderRoutesFn(route.children)}
        </Route>
      );
    }) || null;
  };

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            {renderRoutesFn(renderRoutes)}
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
