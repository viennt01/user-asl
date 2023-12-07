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

export enum TYPE_UNIT {
  'SEA' = 'Sea',
  'TRUCKING' = 'Truck',
  'AIR' = 'Air',
  'ALL' = 'All',
  'TOTAL' = '',
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
  trafficPol?: ITypeOfTransport;
  trafficPod?: ITypeOfTransport;
  receipt?: string;
  delivery?: string;
  cargoReady?: number;
  cargoCutOffDated?: number;
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
  feeGroupDetailID: string;
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
  commodityID: string;
  containers: string[];
  // loadCapacities: string[];
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
export interface IRequireSearchCustoms {
  cargoReady: number;
  commodityID?: string;
}
export interface IQuotationCustoms {
  customQuotationID: string;
  typeDelaracrionID: string;
  typeDelaracrionCode: string;
  transactionTypeID: string;
  transactionTypeName: string;
  currencyID: string;
  abbreviations: string;
  commodityID: string;
  commodityName: string;
  listFeeGroup: {
    feeGroupID: string;
    feeGroupName: string;
  }[];
  customQuotationFCLDetailForBookings: ICustomQuotationFCLDetailForBookings[];
}

export interface ICustomQuotationFCLDetailForBookings {
  unitID: string;
  internationalCode: string;
  basePriceRedLane: string;
  basePriceGreenLane: string;
  basePriceYellowLane: string;
  priceRedLane: string;
  priceGreenLane: string;
  priceYellowLane: string;
}
export interface IQuotationCustomsRequire extends IPagination {
  data: IQuotationCustoms[];
}
export interface IQuotationCustomsTable
  extends Omit<IQuotationCustoms, 'customQuotationID'> {
  key: React.Key;
}

export interface ITypeOfTransport {
  typeOfTransportID?: string;
  abbreviations: string;
  name: string;
  description: string;
}
//Booking
export interface IBooking {
  podid: string;
  polid: string;
  typeOfPOLID: string;
  typeOfPODID: string;
  commodityID: string;
  currencyID: string;
  typeOfSeaService: boolean; // true: FCL
  typeOfService: string; // SEA
  cargoReadyDated: number;
  cargoCutOffDated: number;
  placeOfRecipt: string;
  placeOfDelivery: string;
  note: string;
  statusBooking: string;
  isManualBooking: boolean;
  quotationBookingDetailRegisterRequests: {
    seaQuotationID: string;
    truckingQuotationPOLID: React.Key;
    truckingQuotationPODID: React.Key;
    customQuotationPOLID: React.Key;
    customQuotationPODID: React.Key;
    customQuotationPOLDetailRegisterRequests: ICustomQuotationPOL[];
    customQuotationPODDetailRegisterRequests: ICustomQuotationPOD[];
  };
  seaBookingFCLDetailRegisterRequests: {
    containerTypeID: string;
    quantityContainer: string;
  }[];
}
export interface ICustomQuotationPOL {
  feeGroupID: string;
  customQuotationPOLFeeDetailRegisterRequests: {
    feeGroupDetailID: React.Key;
  }[];
}
export interface ICustomQuotationPOD {
  feeGroupID: string;
  customQuotationPODFeeDetailRegisterRequests: {
    feeGroupDetailID: React.Key;
  }[];
}
export interface TypeUnitData {
  unitID: string;
  internationalCode: string;
}

export interface IRequireTypeUnit {
  typeUnit: TYPE_UNIT;
}
//Detail booking
export interface IDetailBooking {
  customerInformation: ICustomerInformation;
  shipmentDetail: {
    modeOfTransportation: string;
    pol: string;
    pod: string;
    quotationNo: string;
    date: string;
    valitidyTo: string;
    commodity: string;
    seaBookingFCLDetailDTOs: {
      containerTypeCode: string;
      quantity: string;
    }[];
  };
  seaQuotationBooking: {
    quotationNo: string;
    seaQuotationFCLDetails: {
      description: string;
      unit: string;
      price: string;
      quantity: string;
      currency: string;
      totalAmount: string;
    }[];
    ortherChargeDetailForBookings: // TODO: sea other charges
    {
      description: string;
      quantity: string;
      unit: string;
      price: string;
      vat: string;
      currency: string;
      totalAmount: string;
    }[];
  };
  aslContactBooking: {
    issuedBy: string;
    possition: string;
    email: string;
    tel: string;
  };
}
export interface ICustomerInformation {
  customer: string;
  companyName: string;
  email: string;
  addresss: string;
  companyAddress: string;
  tel: string;
  mobil: string;
  contact: string;
}
export interface IRequireDetailBooking {
  id?: string;
}
