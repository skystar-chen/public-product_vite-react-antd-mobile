import { type FC, memo } from 'react';
import { Empty, type EmptyProps } from 'antd-mobile';
import './index.scss';

interface NoDataProps extends EmptyProps {
  className?: string,
  style?: React.CSSProperties,
  // [key: string]: any,
}

const NoData: FC<NoDataProps> = (props) => {
  const { className, style, ...rest } = props;

  return (
    <div className={`pda-no-data ${className}`} style={style}>
      <Empty description='暂无数据' {...rest} />
    </div>
  );
}

export default memo(NoData);
