import { type FC, memo } from 'react';
import './index.scss';

const NoPermission: FC = () => {
  return (
    <div>
      No Permission
    </div>
  );
}

export default memo(NoPermission);
