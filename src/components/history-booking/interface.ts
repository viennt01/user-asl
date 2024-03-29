import { IPagination } from '../fcl-ocean-freight/interface';

export enum TYPE_STATUS {
  'PENDING_CONFIRMATION' = 'PENDING',
  'PROCESSING' = 'PROCESSING',
  'COMPLETED' = 'COMPLETED',
  'CANCELLED' = 'CANCELLED',
}
export enum TYPE_TABS {
  PENDING_CONFIRMATION = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ALL = 'ALL',
}

export enum TYPE_SERVICE {
  'FCL' = 'FCL',
  'LCL' = 'LCL',
  'FTL' = 'FTL',
  'LTL' = 'LTL',
  'AIR' = 'AIR',
}

export interface IDetailBooking {
  bookingID: string;
  bookingNo: string;
  cancelDated: string;
  cargoCutOffDated: string;
  cargoReadyDated: string;
  commodityName: string;
  confirmByUser: string;
  confirmDated: string;
  currency: string;
  dateInserted: string;
  dateUpdated: string;
  insertedByUser: string;
  isCancel: string;
  isManualBooking: boolean;
  note: string;
  placeOfDelivery: string;
  placeOfRecipt: string;
  podName: string;
  polName: string;
  reasonCancel: string;
  statusBooking: string;
  typeOfPODName: string;
  typeOfPOLName: string;
  typeOfSeaService: string;
  typeOfService: string;
  updatedByUser: string;
}
export interface IRequireBookingHistory extends IPagination {
  data: IDetailBooking[];
}
export interface IRequestBookingHistory {
  startDate?: number;
  endDate?: number;
  statusBooking: string[];
  searchAll: string;
  paginateRequest: {
    currentPage: number;
    pageSize: number;
  };
}
export interface IFormSearch {
  searchAll: string;
}
