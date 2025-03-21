import {
  Toast,
  type ToastShowProps,
  NoticeBar,
  type NoticeBarProps,
} from 'antd-mobile';
import {
  SoundOutline,
  CheckCircleOutline,
  ExclamationCircleOutline,
  CloseCircleOutline,
  InformationCircleOutline,
} from 'antd-mobile-icons';

const MESSAGE_ICON_CONFIG = {
  'default': <SoundOutline />,
  'success': <CheckCircleOutline />,
  'alert': <ExclamationCircleOutline />,
  'error': <CloseCircleOutline />,
  'info': <InformationCircleOutline />,
};

type MessageConfig = {
  className?: string,
  style?: React.CSSProperties,
  type?: 'default' | 'success' | 'alert' | 'error' | 'info',
  contentConfig?: Omit<NoticeBarProps, 'content'>,
  // [key: string]: any,
} & ToastShowProps;

/**
 * 消息提示
 */
export default function message(
  config: Omit<MessageConfig, 'maskClassName' | 'maskStyle'> = {},
): void {
  const {
    className,
    style,
    type = 'alert',
    content = '提示',
    contentConfig,
    ...rest
  } = config;

  Toast.show({
    position: 'top',
    maskClassName: `pda-message ${className}`,
    maskStyle: style,
    content: (
      <NoticeBar
        color={type || contentConfig?.color || 'info'}
        bordered={false}
        shape='neutral'
        content={content}
        wrap
        icon={
          MESSAGE_ICON_CONFIG?.[type || contentConfig?.color || 'info']
        }
        {...contentConfig}
      />
    ),
    ...rest,
  });
}
