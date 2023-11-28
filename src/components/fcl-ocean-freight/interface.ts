import { Dayjs } from 'dayjs';

export enum TYPE_LOCATION {
  'PORT' = 'Port',
  'INDUSTRIAL_ZONE' = 'Industrial Zone',
  'DEPOT' = 'Depot',
  'AIR_PORT' = 'Airport',
}

export enum TYPE_LOAD_CAPACITY {
  'TRUCKING' = 'Truck',
  'AIR' = 'Air',
  'TOTAL' = '',
}

export enum TYPE_SERVICE {
  'FCL' = 'FCL',
  'LCL' = 'LCL',
}
export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalPages?: number;
}

export interface IPaginationOfAntd {
  current: number;
  pageSize: number;
  total?: number;
}

export const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 20,
};

// get all location
export interface IDataLocation {
  locationID: string;
  locationName: string;
}

export interface IRequireLocation {
  type: TYPE_LOCATION[];
}

// get all type container
export interface RequireTypeContainer {
  containerTypeID: string;
  name: string;
  code: string;
}

// get all commodity
export interface RequireCommodity {
  commodityID: string;
  commodityName: string;
}

// search quotations
export interface IQuotation {
  seaQuotationID: string;
  polid: string;
  polName: string;
  podid: string;
  podName: string;
  commodityID: string;
  commodityName: string;
  seaQuotationDetailDTOs: { [key: string]: string };
}
export interface IRequireSearchQuotation extends IStep1 {
  polid: string;
  podid: string;
  typeService: string;
  cargoReady: number;
  commodities: string[];
  containers: string[];
  paginateRequest: IPagination;
}
export interface IQuotationRequire extends IPagination {
  data: IQuotation[];
}
export interface IQuotationTable extends Omit<IQuotation, 'seaQuotationID'> {
  key: string;
}

export interface IStep1 {
  trafficPol?: string;
  trafficPod?: string;
  receipt?: string;
  delivery?: string;
  cargoReady?: number;
  containers?: string[];
  commodities?: string[];
}

export interface ISeaQuotationDetailDataBody {
  id: string;
}

export interface ISeaPricingDetail {
  seaQuotationID: string;
  podid: string;
  polid: string;
  podName: string;
  polName: string;
  commodityID: string;
  note: string;
  dateEffect: Dayjs;
  validityDate: Dayjs;
  vendor: string;
  freqDate: string;
  demSeaQuotation: string;
  detSeaQuotation: string;
  stoSeaQuotation: string;
  lclMinSeaQuotation: string;
  lclSeaQuotation: string;
  currencyID: string;
  public: boolean;
  statusSeaQuotation: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  seaQuotationDetailDTOs: ISeaQuotationDetailDTOs[];
  seaQuotaionFeeGroupDTOs: ISeaQuotationFee[];
  salesLeadsSeaQuotationDTOs: ISalesLeadsSeaQuotationDTOs[];
  seaQuotaionGroupPartnerDTOs: ISeaQuotaionGroupPartnerDTOs[];
}

export interface ISeaQuotationDetailDTOs {
  seaQuotationDetailID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
}

export interface ISeaQuotationFee {
  feeGroupID: string;
  feeGroupName: string;
}

export interface ISalesLeadsSeaQuotationDTOs {
  salesLeadsSeaQuotationID?: string;
  partnerID: string;
}

export interface ISeaQuotaionGroupPartnerDTOs {
  seaQuotationGroupPartnerID: string;
  groupPartnerID: string;
}

//table fee
export interface Fee {
  feeID: string;
  priceFeeGroup: string;
  vatFeeGroup: string;
  unitID: string;
  currencyID: string;
}
export interface FeeTable extends Fee {
  key: React.Key;
  currencyName: string;
  unitInternationalCode: string;
  feeNo: string;
  feeName: string;
  typeFeeName?: string;
}
export interface RequestFee {
  id: string[];
}

// search trucking
export interface IRequireSearchTrucking {
  pickupID: string;
  deliveryID: string;
  typeService: string;
  cargoReady: number;
  commodities: string[];
  containers: string[];
  // loadCapacities: string[];
  paginateRequest: IPagination;
}
export interface IQuotationTrucking {
  truckingQuotationID: string;
  pickupID: string;
  pickupName: string;
  deliveryID: string;
  deliveryName: string;
  commodityID: string;
  commodityName: string;
  truckingQuotationDetailDTOs: { [key: string]: string };
}
export interface IQuotationTruckingRequire extends IPagination {
  data: IQuotationTrucking[];
}
export interface IQuotationTruckingTable
  extends Omit<IQuotationTrucking, 'truckingQuotationID'> {
  key: React.Key;
}
// get all type capacity
export interface RequireTypeLoadCapacity {
  loadCapacityID: string;
  name: string;
}
export interface IRequireTypeLoadCapacity {
  type: TYPE_LOAD_CAPACITY;
}
