import { type FC, memo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { loginApi } from '@/apis/common';
import { StorageTokenEnum } from '@/https/enums';
import message from '@/utils/message';
import { setItem } from '@/utils';
import Modal from '@/components/Modal';
import useCurrentStore, { CurrentStoreKeyEnum } from '@/hooks/useCurrentStore';
import './index.scss';

const PAGE_BASE_CLASS: string = 'pda-login-page';

// interface LoginProps {}

// const DEFAUTL_PROPS: LoginProps = {};

const Login: FC = () => {

  const navigate = useNavigate();
  const { setCurrentStore } = useCurrentStore();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginWarehouseLoading, setLoginWarehouseLoading] = useState<boolean>(false);
  const [warehouse, setWarehouse] = useState<string>('');
  const inputRef = useRef(null);

  const handleClickLogin = async () => {
    if (!username || !password) {
      message({
        type: 'error',
        content: '请输入账号和密码',
      });
      return;
    }
    setLoginLoading(true);
    try {
      const res = await loginApi({ username, password });
      setItem(StorageTokenEnum.TOKEN, res.token); // 保存 Token
      // todo
      // message.success('登录成功');
      setItem(CurrentStoreKeyEnum.STORE_KEY, 103);
      setCurrentStore(103);
      setVisibleModal(true);
      navigate('/home');
    } catch (error) {
      console.error(error);
      message({
        type: 'error',
        content: '登录失败',
      });
    }
    setLoginLoading(false);
  }

  return (
    <div className={`${PAGE_BASE_CLASS}`}>
      <div className={`${PAGE_BASE_CLASS}-content`}>
        <div className={`${PAGE_BASE_CLASS}-title ${PAGE_BASE_CLASS}-item`}>WMS</div>
        <div className={`${PAGE_BASE_CLASS}-item ${PAGE_BASE_CLASS}-item-input-box`}>
          <Input
            ref={inputRef}
            autoFocus
            placeholder='账号'
            type='text'
            value={username}
            onChange={(e) => setUsername(e)}
          />
        </div>
        <div className={`${PAGE_BASE_CLASS}-password ${PAGE_BASE_CLASS}-item ${PAGE_BASE_CLASS}-item-input-box`}>
          <Input
            placeholder='密码'
            type={visiblePassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e)}
          />
          <div className={`${PAGE_BASE_CLASS}-eye-icon-box`}>
            {!visiblePassword ? (
              <EyeInvisibleOutline onClick={() => setVisiblePassword(true)} />
            ) : (
              <EyeOutline onClick={() => setVisiblePassword(false)} />
            )}
          </div>
        </div>
        <div className={`${PAGE_BASE_CLASS}-item`}>
          <Button
            color='primary'
            fill='solid'
            shape='rounded'
            block
            loading={loginLoading}
            loadingText='登录中'
            onClick={handleClickLogin}
          >
            登录
          </Button>
        </div>
      </div>
      <Modal
        title='登录'
        labelText='登录仓库:'
        visible={visibleModal}
        confirmBtnLoading={loginWarehouseLoading}
        confirmBtnLoadingText='登录中'
        onAction={(action) => {
          console.log('action', action);
          if (action.key === 'confirm') {
            // todo 跳转回对应页面，存储仓库信息
            setLoginWarehouseLoading(true);
            setTimeout(() => {
              setLoginWarehouseLoading(false);
            }, 1000);
          } else {
            setVisibleModal(false);
          }
        }}
        onClose={() => setVisibleModal(false)}
        pickerValue={warehouse}
        onPickerChange={(value) => setWarehouse(value[0] as string)}
      />
    </div>
  );
}

// Login.defaultProps = DEFAUTL_PROPS;

export default memo(Login);
