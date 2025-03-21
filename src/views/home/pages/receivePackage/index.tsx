import { type FC, memo, useEffect, useState, useRef } from 'react';
import EnterInput from '@/components/EnterInput';
import Modal from '@/components/Modal';
import { getUsers } from '@/apis/common';
import type { UserList } from '@/types/apis/common';
import { pushReceivePackage, getReceivePackageResultList, pushReceivePackageInvalidSubmit } from '@/apis/receivePackage';
import type { ReceivePackageResultListItems } from '@/types/apis/receivePackage';
import { getURLSearchParamsObject, getObjectValueType } from '@/utils';
import message from '@/utils/message';
import Loading from '@/components/Loading';
import useCurrentStore from '@/hooks/useCurrentStore';
import './index.scss';

type SearchObj = {
  project_id: number,
  project_process_id: number,
  project_process_node: number,
};
const objPattern: Record<string, 'number'> = {
  project_id: 'number',
  project_process_id: 'number',
  project_process_node: 'number',
};
const searchObj = getObjectValueType(getURLSearchParamsObject(), objPattern);
const PAGE_BASE_CLASS: string = 'pda-enter-warehouse-receive-package-page';

const ReceivePackage: FC = () => {

  const { currentStore } = useCurrentStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<string>('');
  const [receiverLoading, setReceiverLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<ReceivePackageResultListItems>([]);
  const trackNumberRef = useRef<string>('');
  const [userList, setUserList] = useState<UserList>([]);
 
  // 扫描提交
  const handleSubmitReceivePackage = async (value: string) => {
    if (!value) {
      message({
        type: 'error',
        content: '没有扫描到内容！',
      });
      return;
    }
    setLoading(true);
    const res = await pushReceivePackage({
      package_code: value,
      current_store: currentStore,
      ...(searchObj as SearchObj),
    }).catch(async (err) => {
      // 无匹配
      if (err.data.code === 1001) {
        trackNumberRef.current = value;
        setVisibleModal(true);
        if (!userList.length) {
          setLoading(true);
          const res = await getUsers({
            current_store: currentStore,
            ...(searchObj as SearchObj),
          }).finally(() => {
            setLoading(false);
          });
          setUserList(res || []);
        }
        return Promise.reject(err);
      }
    }).finally(() => {
      setLoading(false);
    });
    // 刷新列表
    if (res?.code === 200) queryReceivePackageResultList();
  };

  // 无匹配提交
  const handleSubmitInvalidReceivePackage = async (action) => {
    if (action.key === 'confirm') {
      setReceiverLoading(true);
      await pushReceivePackageInvalidSubmit({
        track_number: trackNumberRef.current,
        stock_user_id: Number(receiver),
        current_store: currentStore,
        ...(searchObj as SearchObj),
      }).finally(() => {
        setReceiverLoading(false);
      });
    }
    setVisibleModal(false);
  }

  // 扫描结果列表查询
  const queryReceivePackageResultList = async () => {
    setLoading(true);
    const res = await getReceivePackageResultList({
      current_store: currentStore,
     ...(searchObj as SearchObj),
    }).finally(() => {
      setLoading(false);
    });
    setDataList(res.items);
  };

  useEffect(() => {
    currentStore && queryReceivePackageResultList();
  }, [currentStore]);

  return (
    <Loading loading={loading} isLoadingShowChildren>
      <div className={PAGE_BASE_CLASS}>
        <div className={`${PAGE_BASE_CLASS}-header`}>
          <EnterInput
            className={`${PAGE_BASE_CLASS}-header-input`}
            placeholder='请扫描物流面单'
            autoFocus
            isDisableKeyboard
            onEnter={handleSubmitReceivePackage}
          />
        </div>
        <div className={`${PAGE_BASE_CLASS}-body`}>
          <div className={`${PAGE_BASE_CLASS}-body-table-head`}>
            <div className={`${PAGE_BASE_CLASS}-body-table-head-tr`}>
              <div className={`${PAGE_BASE_CLASS}-body-table-head-td`}>快递单号</div>
              <div className={`${PAGE_BASE_CLASS}-body-table-head-td`}>类型</div>
              <div className={`${PAGE_BASE_CLASS}-body-table-head-td`}>操作结果/时间</div>
            </div>
          </div>
          <div className={`${PAGE_BASE_CLASS}-body-table-body`}>
            {dataList.map((t, i) => {
              return (
                <div key={i} className={`${PAGE_BASE_CLASS}-body-table-body-tr`}>
                  <div className={`${PAGE_BASE_CLASS}-body-table-body-td`}>{ t.stock_tracknumber[0].props.value || '-' }</div>
                  <div className={`${PAGE_BASE_CLASS}-body-table-body-td`}>{ t.goods_type[0].props.value || '-' }</div>
                  <div className={`${PAGE_BASE_CLASS}-body-table-body-td`}>
                    <div
                      className={`${PAGE_BASE_CLASS}-body-table-body-td-status`}
                      style={{
                        // 'var(--adm-color-danger)'
                        color: 'var(--adm-color-success)',
                      }}
                    >收包成功</div>
                    <div className={`${PAGE_BASE_CLASS}-body-table-body-td-time`}>{ t.scanned_time[0].props.value || '-' }</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          title='无匹配'
          labelText='收货人:'
          visible={visibleModal}
          confirmBtnLoading={receiverLoading}
          confirmBtnLoadingText='加载中'
          onAction={handleSubmitInvalidReceivePackage}
          onClose={() => setVisibleModal(false)}
          pickerValue={receiver}
          pickerColumns={userList}
          onPickerChange={(value) => setReceiver(value[0] as string)}
        />
      </div>
    </Loading>
  );
}

export default memo(ReceivePackage);