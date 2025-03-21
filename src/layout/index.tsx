import { type FC, useMemo } from 'react';
// import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useRoute from '@/hooks/useRoute';
import './index.scss';

const Layout: FC<{ children: JSX.Element }> = (props) => {
  const { currentRoute: routeMsg } = useRoute();

  // const isRenderHeader = useMemo(() => {
  //   const isRenderHeader = routeMsg?.isRenderHeader;
  //   return typeof isRenderHeader === 'boolean' ? isRenderHeader : true;
  // }, [routeMsg?.isRenderHeader]);

  const isRenderFooter = useMemo(() => {
    const isRenderFooter = routeMsg?.isRenderFooter;
    return typeof isRenderFooter === 'boolean' ? isRenderFooter : true;
  }, [routeMsg?.isRenderFooter]);

  return (
    <div className='pda-layout-container'>
      {/* {isRenderHeader && <Header route={routeMsg} />} */}
      <div className='pda-layout-body' style={{ height: isRenderFooter ? '' : '100vh' }}>{ props.children }</div>
      {isRenderFooter && <Footer route={routeMsg} />}
    </div>
  );
}

export default Layout;
