export enum TYPE_LOCATION {
  'SEA' = 'Sea',
  'TRUCKING' = 'Truck',
  'AIR' = 'Air',
  'CUSTOM' = 'Custom',
  'ALL' = 'All',
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
  type: TYPE_LOCATION;
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
export interface IRequireSearchQuotation {
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