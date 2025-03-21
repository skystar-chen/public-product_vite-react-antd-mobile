import { type FC, memo, useEffect, useState } from 'react';
import { Tabs } from 'antd-mobile';
import Loading from '@/components/Loading';
import Order from './compoents/Order';
import Tools from './compoents/Tools';
import { getMenus } from '@/apis/home';
import type { IMenusType } from '@/types/apis/home';
import useCurrentStore from '@/hooks/useCurrentStore';
import './index.scss';

type TabsType = {
  component: JSX.Element;
} & IMenusType;

const Home: FC = () => {
  const { currentStore } = useCurrentStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [tabs, setTabs] = useState<TabsType[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');

  const queryMenus = async () => {
    const res = await getMenus({
      current_store: currentStore,
      module_id: 4,
    }).finally(() => {
      setLoading(false);
    });
    if (Array.isArray(res)) {
      const tabs: TabsType[] = [];
      for (let i = 0, l = res.length; i < l; i++) {
        const t = res[i];
        switch (t.schema_code) {
          // 我的订单
          case 'MYORDERS':
            tabs.push({
              ...t,
              component: <Order options={t} />,
            });
            break;

          // 我的工具
          case 'MYTOOLS':
            tabs.push({
              ...t,
              component: <Tools options={t} />,
            });
            break;
        
          default:
            break;
        }
      }
      setActiveKey(tabs[0]?.schema_code || '');
      setTabs(tabs);
    }
  };

  useEffect(() => {
    currentStore && queryMenus();
  }, [currentStore]);

  return (
    <Loading loading={loading}>
      <Tabs
        className='pda-home-page-tabs'
        style={{
          '--title-font-size': '0.36rem',
        }}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
      >
        {tabs.map((tab) => {
          return (
            <Tabs.Tab title={tab.title} key={tab.schema_code}>
              {tab.component}
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </Loading>
  );
}

export default memo(Home);
