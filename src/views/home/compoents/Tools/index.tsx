import { type FC, memo } from 'react';
import type { IMenusType } from '@/types/apis/home';

interface ToolsProps {
  options: IMenusType,
}

const Tools: FC<ToolsProps> = (props) => {

  const { options } = props;
  console.log(options);

  return (
    <div>我的工具</div>
  );
}

export default memo(Tools);
