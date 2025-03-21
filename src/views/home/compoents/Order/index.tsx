import { type FC, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IMenusType } from '@/types/apis/home';
import { AppOutline } from 'antd-mobile-icons';
import NoData from '@/components/NoData';
import './index.scss';

const PAGE_BASE_CLASS: string = 'pda-home-order-page';

interface OrderProps {
  options: IMenusType,
}

const Order: FC<OrderProps> = (props) => {

  const { options } = props;

  const navigate = useNavigate();

  const opts = useMemo(
    () => Array.isArray(options?.children) ? options?.children : [],
    [options?.children],
  );

  // 点击跳转对应页面，这里跟后端的路由对应
  const handleClick = (item: IMenusType) => {
    navigate('/' + item.schema_code);
  };

  return (
    <div className={PAGE_BASE_CLASS}>
      {!Array.isArray(opts) ? <NoData style={{ height: '60vh' }} /> : opts.map((t) => {
        return (
          <div className={`${PAGE_BASE_CLASS}-row`} key={t.schema_code}>
            <div className={`${PAGE_BASE_CLASS}-row-top`}>
              <i className={`${PAGE_BASE_CLASS}-row-top-sign`}></i>
              <div className={`${PAGE_BASE_CLASS}-row-top-title`}>{ t.title || '-' }</div>
            </div>
            <div className={`${PAGE_BASE_CLASS}-row-body`}>
              {!Array.isArray(t.children) ? <NoData /> : t.children.map((item) => {
                return (
                  <div
                    className={`${PAGE_BASE_CLASS}-row-body-item`}
                    key={item.schema_code}
                    onClick={() => handleClick(item)}
                  >
                    <div className={`${PAGE_BASE_CLASS}-row-body-item-img`}>
                      {/* todo */}
                      <AppOutline />
                    </div>
                    <div className={`${PAGE_BASE_CLASS}-row-body-item-label`}>{ item.title || '-' }(22)</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(Order);
