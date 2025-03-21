// import { type FC, memo } from 'react';
// import { NavBar } from 'antd-mobile';
// import { MoreOutline } from 'antd-mobile-icons';
// import type { IRoute } from '@/routes/types';
// import './index.scss';

// interface HeaderProps {
//   route?: IRoute | null,
// }

// /**
//  * 这个暂时不需要，使用浏览器自带的头部
//  */
// const Header: FC<HeaderProps> = (props) => {

//   const { route } = props;

//   const handleBack = () => {}

//   return (
//     <NavBar
//       className='pda-layout-header'
//       backIcon={!!route?.isBackIcon}
//       onBack={handleBack}
//       right={<MoreOutline />}
//     >
//       {route?.meta}
//     </NavBar>
//   );
// }

// export default memo(Header);
