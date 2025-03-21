import { type FC, memo, type ReactNode } from 'react';
import {
  Button,
  Modal as AntModal,
  type ModalProps as AntModalProps,
  PickerView,
  type PickerViewProps,
} from 'antd-mobile';
import './index.scss';

const PAGE_BASE_CLASS: string = 'pda-modal';

interface ModalProps extends AntModalProps {
  visible: boolean,
  labelText?: string,
  confirmBtnLoading?: boolean,
  confirmBtnLoadingText?: string,
  pickerValue?: string,
  pickerColumns?: (string | {
    label: ReactNode;
    value: string | number;
    key?: string | number;
  })[],
  onPickerChange?: PickerViewProps['onChange'],
}

const Modal: FC<ModalProps> = (props) => {

  const {
    visible,
    confirmBtnLoading,
    confirmBtnLoadingText,
    pickerValue,
    pickerColumns = [],
    onPickerChange,
    title,
    labelText,
    ...rest
  } = props;

  return (
    <AntModal
      bodyClassName={`${PAGE_BASE_CLASS}`}
      visible={visible}
      title={<div className={`${PAGE_BASE_CLASS}-title`}>{ title }</div>}
      content={
        <div className={`${PAGE_BASE_CLASS}-body`}>
          <div className={`${PAGE_BASE_CLASS}-body-label`}>{ labelText }</div>
          <PickerView
            columns={[pickerColumns]}
            value={[pickerValue || '']}
            onChange={onPickerChange}
          />
        </div>
      }
      showCloseButton
      actions={[
        {
          key: 'confirm',
          text: (
            <Button
              block
              color='primary'
              fill='solid'
              loading={confirmBtnLoading}
              loadingText={confirmBtnLoadingText}
            >确认</Button>
          ),
          // primary: true,
        },
        {
          key: 'cancel',
          text: <Button block fill='solid'>取消</Button>,
        },
      ]}
      {...rest}
    />
  );
}

export default memo(Modal);
