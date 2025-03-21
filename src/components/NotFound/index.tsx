import { type FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBlock, Button } from 'antd-mobile';
import './index.scss';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className='pda-no-found-page'>
      <ErrorBlock
        status='empty'
        fullPage
        title='404'
        description='对不起，您访问的页面不存在'
      >
        <Button color='primary' onClick={() => navigate('/home')}>返回首页</Button>
      </ErrorBlock>
    </div>
  );
}

export default memo(NotFound);
