import { type FC, memo, useState, useEffect } from 'react';
import { PieOutline, RightOutline, SetOutline } from 'antd-mobile-icons';
import { getUserInfo } from '@/apis/personalCenter';
import Loading from '@/components/Loading';
import type { UserInfo } from '@/types/apis/personalCenter';
import Image from '@/components/Image';
import './index.scss';

const PAGE_BASE_CLASS: string = 'pda-personal-center-page';

const TABS = [
  {
    key: 'my-performance',
    icon: <PieOutline />,
    title: '我的表现',
  },
  {
    key: 'setting',
    icon: <SetOutline />,
    title: '设置',
  },
];

// todo
const PersonalCenter: FC = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [userMsg, setUserMsg] = useState<UserInfo | null>(null);

  const queryUserInfo = async () => {
    const res = await getUserInfo().finally(() => setLoading(false));
    setUserMsg(res);
  };

  useEffect(() => {
    queryUserInfo();
  }, []);

  return (
    <Loading loading={loading}>
      <div className={PAGE_BASE_CLASS}>
        <div className={`${PAGE_BASE_CLASS}-user-card`}>
            <Image
              className={`${PAGE_BASE_CLASS}-user-card-left`}
              src=''
              style={{
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '50%',
              }}
            />
            <div className={`${PAGE_BASE_CLASS}-user-card-right`}>
              <div className={`${PAGE_BASE_CLASS}-user-card-right-name`}>{ userMsg?.username || '-' }</div>
              <div className={`${PAGE_BASE_CLASS}-user-card-right-role`}>拣货</div>
              <div className={`${PAGE_BASE_CLASS}-user-card-right-warehouse`}>FBA海外仓</div>
            </div>
        </div>
        {TABS.map((t) => {
          return (
            <div key={t.key} className={`${PAGE_BASE_CLASS}-user-card ${PAGE_BASE_CLASS}-user-card-item`}>
              <div className={`${PAGE_BASE_CLASS}-user-card-icon`}>{ t.icon }</div>
              <div className={`${PAGE_BASE_CLASS}-user-card-label`}>{ t.title }</div>
              <RightOutline className={`${PAGE_BASE_CLASS}-user-card-arrow`} />
            </div>
          );
        })}
      </div>
    </Loading>
  );
}

export default memo(PersonalCenter);
