export interface ReceivePackageMessage {
  code: number,
  data: [],
  message: string,
}

type ReceivePackageResultListItem = {
  type: string,
  props: {
    value: string,
  },
};

export type ReceivePackageResultListItems = {
  carrier_factory: ReceivePackageResultListItem[],
  carrier_grade: ReceivePackageResultListItem[],
  goods_type: ReceivePackageResultListItem[],
  package_boxsn: ReceivePackageResultListItem[],
  scanned_info: ReceivePackageResultListItem[],
  scanned_time: ReceivePackageResultListItem[],
  scanned_user: ReceivePackageResultListItem[],
  stock_tracknumber: ReceivePackageResultListItem[],
  store_info: ReceivePackageResultListItem[],
}[];

export interface ReceivePackageResultList {
  estimate: string,
  items: ReceivePackageResultListItems,
  page: {
    current_page: number,
    page_size: number,
    total_items: number,
    total_pages: number,
  },
  printer: string,
  yield: number,
}
