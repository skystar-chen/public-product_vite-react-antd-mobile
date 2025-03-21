import { type FC, memo } from 'react';
import { TabBar } from 'antd-mobile';
import { AppOutline, UserOutline } from 'antd-mobile-icons';
import type { IRoute } from '@/routes/types';
import './index.scss';

// 这里的key跟路由对应
const TABS = [
  {
    key: '/home',
    title: '首页',
    icon: <AppOutline />,
  },
  {
    key: '/personalCenter',
    title: '我的',
    icon: <UserOutline />,
  },
];

interface FooterProps {
  route?: IRoute | null,
}

const Footer: FC<FooterProps> = (props) => {

  const { route } = props;

  return (
    <TabBar
      safeArea
      className='pda-layout-footer'
      activeKey={route?.path}
      onChange={(key: string) => window.location.href = key}
    >
      {TABS.map(item => (
        <TabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
        />
      ))}
    </TabBar>
  );
}

export default memo(Footer);
