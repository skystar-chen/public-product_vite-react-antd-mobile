import { type FC, memo, useRef, useState } from 'react';
import EnterInput, { type EnterInputRefProps } from '@/components/EnterInput';
import Image from '@/components/Image';
import NoData from '@/components/NoData';
import { pushSplitPackage } from '@/apis/splitPackage';
import { getURLSearchParamsObject, getObjectValueType } from '@/utils';
import message from '@/utils/message';
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
const PAGE_BASE_CLASS: string = 'pda-enter-warehouse-split-package-page';

const SplitPackage: FC = () => {

  const inputRef = useRef<EnterInputRefProps>(null);
  // inputRef.current?.onClear();
  const [visibleBtn, setVisibleBtn] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<any>(null);

  // 拆包扫描提交
  const handleSubmitSplitPackage = async (value: string) => {
    if (!value) {
      message({
        type: 'error',
        content: '没有扫描到内容！',
      });
      return;
    }
    const res = await pushSplitPackage({
      package_code: value,
      ...(searchObj as SearchObj),
    });
    console.log(res);
    setVisibleBtn(true);
  };

  return (
    <div className={PAGE_BASE_CLASS}>
      <div className={`${PAGE_BASE_CLASS}-header`}>
        <EnterInput
          ref={inputRef}
          className={`${PAGE_BASE_CLASS}-header-input`}
          placeholder='请扫描物流面单'
          autoFocus
          isDisableKeyboard
          readOnly={visibleBtn}
          onEnter={handleSubmitSplitPackage}
        />
        {visibleBtn && (
          <button
            className={`${PAGE_BASE_CLASS}-header-button`}
          >拆包确认</button>
        )}
      </div>
      <div className={`${PAGE_BASE_CLASS}-body`}>
        <div className={`${PAGE_BASE_CLASS}-body-table-head`}>
          <div className={`${PAGE_BASE_CLASS}-body-table-head-tr`}>
            <div className={`${PAGE_BASE_CLASS}-body-table-head-td`}>SKU信息</div>
            <div className={`${PAGE_BASE_CLASS}-body-table-head-td`}>可拆/拆包</div>
          </div>
        </div>
        <div className={`${PAGE_BASE_CLASS}-body-table-body`}>
          {!scanMessage ? <NoData /> : (
            <div className={`${PAGE_BASE_CLASS}-body-table-body-tr`}>
              <div className={`${PAGE_BASE_CLASS}-body-table-body-td ${PAGE_BASE_CLASS}-body-table-body-sku-td`}>
                <Image
                  className={`${PAGE_BASE_CLASS}-body-table-body-td-img`}
                  src=''
                  style={{
                    width: '1.6rem',
                    height: '1.2rem',
                    borderRadius: '0.04rem',
                  }}
                />
                <div className={`${PAGE_BASE_CLASS}-body-table-body-td-sku`}>MZ302888_03</div>
              </div>
              <div className={`${PAGE_BASE_CLASS}-body-table-body-td`}>
                <div className={`${PAGE_BASE_CLASS}-body-table-body-td-total`}>50 /</div>
                {/* <input className={`${PAGE_BASE_CLASS}-body-table-body-td-input`} /> */}
                <EnterInput
                  className={`${PAGE_BASE_CLASS}-body-table-body-td-input`}
                  isFocusSelectAll
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>
              <div className={`${PAGE_BASE_CLASS}-body-table-body-tr-title`}>蝴蝶公主抽屉式塑料化妆台收纳盒创意办公桌面多层彩色杂物整理盒 YB-1503四层粉色</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(SplitPackage);