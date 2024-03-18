import moment from 'moment';

export interface ListResponse<T> {
  totalPages: number;
  totalCount: number;
  totalRows: number;
  data: T[];
  pagination: PaginationParams;
  errorMessage?: any;
  succeed: boolean;
}
export interface ListResponsePeople<T> {
  totalPages: number;
  totalCount: number;
  totalRows: number;
  data: T;
  pagination: PaginationParams;
  errorMessage?: any;
  succeed: boolean;
}
export interface ListResponseRF<T> {
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  data: ListResponse<T>;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
export interface ListResponseZZZ<T> {
  totalPages: number;
  totalCount: number;
  totalRows: number;
  data: T;
  pagination: PaginationParams;
  errorMessage?: any;
  succeed: boolean;
}
export interface ResponseSetting<T> {
  data: T[];
  totalRows: number;
  totalPages: number;
}

export interface ListResponseSetting<T> {
  data: T[];
  pagination: PaginationParamsSetting;
  errorMessage?: any;
  succeed: boolean;
}
export interface ResponseMessage<T> {
  statusCode: number;
  message: any;
  Erorr: any;
  data: T;
  errorMessage?: any;
  succeed: boolean;
}

export interface PaginationParams {
  PageIndex: number;
  PageSize: number;
  // totalCount: number;
}
export interface PaginationParamsSetting {
  PageIndex: number;
  PageSize: number;
  // totalCount: number;
}
export interface ListParams {
  Name?: string;
  MTD?: string;
  PageIndex: number;
  PageSize: number;
  [key: string]: any;
}

export interface FromToParam {
  from?: Date;
  to?: Date;
  [key: string]: any;
}

export interface ResponseFromAPi<T> {
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
}

export interface ResponseAPi<T> {
  statusCode: string;
  messagae: string;
  data: T[];
}

export interface PagingResponse<T> {
  statusCode: string;
  messagae: string;
  data: ListResponse<T>;
}

export interface PagingResponseZZZ<T> {
  statusCode: string;
  messagae: string;
  data: T;
}

export interface errorMessage {
  message: string;
}
export const ViewPrice = (numberView: number) => {
  return `${numberView.toLocaleString()} VNĐ`;
};
export const ViewDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const ViewSession = (number: number) => {
  const arr = ['Sáng', 'Chiều', 'Tất cả'];
  return arr[number];
};

export const ViewHTTT = (aaa: string) => {
  if ((aaa = 'Cash')) {
    return 'Tiền mặt';
  }else{

    return 'Chuyển khoản';
  }
};

export const ViewHTTTSign = (aaa: string) => {
  if ((aaa = 'Cash')) {
    return 'TM';
  }else{

    return 'CK';
  }
};

export const CONG_KHAM = 'CongKham';
export const CONG_KHAM_NGOAI_GIO = 'CongKhamNgoaiGio';
export const CONG_KHAM_TRONG_GIO = 'CongKhamTrongGio';
