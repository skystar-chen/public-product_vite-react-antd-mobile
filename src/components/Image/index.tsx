import { type FC, memo, useMemo } from 'react';
import { Image as AntImage, type ImageProps as AntImageProps } from 'antd-mobile';
// import Loading from '@/components/Loading';
import './index.scss';

interface ImageProps extends AntImageProps {
  className?: string,
  style?: React.CSSProperties,
  // [key: string]: any,
}

const Image: FC<ImageProps> = (props) => {
  const { className, style, src, ...rest } = props;

  const realSrc = useMemo(() => {
    return src ? src : '/404';
  }, [src]);

  return (
    <div className={`pda-image ${className}`} style={style}>
      <AntImage
        // 加载失败时显示的图片
        // fallback={}
        // 图片加载完成时显示的图片
        // placeholder={<Loading />}
        src={realSrc}
        fit='cover'
        {...rest}
      />
    </div>
  );
}

export default memo(Image);
