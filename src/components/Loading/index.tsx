import { type FC, memo, useMemo } from 'react';
import { DotLoading, SpinLoading, Mask } from 'antd-mobile';
import './index.scss';

const DEFAULT_OPTS = {
  color: 'primary',
  style: {
    fontSize: '0.36rem',
  },
};

interface LoadingProps {
  className?: string,
  style?: React.CSSProperties,
  type?: 'dot' | 'spin',
  loading?: boolean,
  isPageLoading?: boolean,
  // 是否加载的时候显示children
  isLoadingShowChildren?: boolean,
  maskColor?: 'black' | 'white' | string,
  loadingText?: JSX.Element,
  children?: JSX.Element,
  // [key: string]: any,
}

const Loading: FC<LoadingProps> = (props) => {
  const {
    className,
    style,
    type = 'spin',
    loading = true,
    isPageLoading = true,
    isLoadingShowChildren = false,
    maskColor = 'white',
    loadingText = '加载中...',
    children,
    ...rest
  } = props;

  const renderLoading = useMemo(
    () => {
      switch (type) {
        case 'dot':
          return <DotLoading {...DEFAULT_OPTS} {...rest} />;

        case 'spin':
          return <SpinLoading {...DEFAULT_OPTS} {...rest} />;

        default:
          return <SpinLoading {...DEFAULT_OPTS} {...rest} />;
      }
    },
    [type],
  );

  return (
    <>
      {loading && (
        <div className={`pda-loading ${className}`} style={style}>
          {isPageLoading && (
            <Mask
              color={maskColor}
              visible
            >
              { renderLoading }
              <span className='pda-loading-text'>{ loadingText }</span>
            </Mask>
          )}
          {!isPageLoading && (
            <>
              { renderLoading }
              <span className='pda-loading-text'>{ loadingText }</span>
            </>
          )}
        </div>
      )}
      {(isLoadingShowChildren || !loading) && children}
    </>
  );
}

export default memo(Loading);
