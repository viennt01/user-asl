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
  typeLocation: string[];
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
  vendorName: string;
  freqDate: string;
  demSeaQuotation: string;
  detSeaQuotation: string;
  stoSeaQuotation: string;
  transitTimeSeQuotaion: string;
  seaQuotationDetailDTOs: { [key: string]: string };
}
export interface IRequireSearchQuotation extends IStep1 {
  polid: string;
  podid: string;
  typeSeaService: string;
  cargoReady: number;
  commodities: string[];
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
  cargoReady: number;
  commodityID: string;
}
export interface IQuotationTrucking {
  truckingQuotationID: string;
  pickupID: string;
  pickupName: string;
  deliveryID: string;
  deliveryName: string;
  commodityID: string;
  commodityName: string;
  abbreviations: string;
  lclTruckingQuotationDetails: ILclTruckingQuotationDetails[];
}
export interface ILclTruckingQuotationDetails {
  loadCapacityID: string;
  loadCapacityCode: string;
  price: string;
  vat: string;
}
export interface ILclTruckingQuotationDetailsTable
  extends ILclTruckingQuotationDetails {
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
  typeDeclarationName?: string;
  commodityID?: string;
  polid?: string;
  podid?: string;
  customsService?: string;
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
  customQuotationLCLDetailForBooking: ICustomQuotationLCLDetailForBooking;
}

export interface ICustomQuotationLCLDetailForBooking {
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
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
  typeSeaService: string;
  typeOfService: string; // SEA
  cargoReadyDated: number;
  placeOfRecipt: string;
  placeOfDelivery: string;
  note: string;
  statusBooking: string;
  isManualBooking: boolean;
  quotationBookingDetailRegisterRequest: {
    seaQuotationID: string;
    truckingQuotationPOLID: React.Key;
    truckingQuotationPODID: React.Key;
    customQuotationPOLID: React.Key;
    customQuotationPODID: React.Key;
    customQuotationPOLDetailRegisterRequests: ICustomQuotationPOL[];
    customQuotationPODDetailRegisterRequests: ICustomQuotationPOD[];
  };
  seaBookingLCLDetailRegisterRequest: ISeaBookingLCLDetailRegisterRequest;
  truckBookingLCLDetailRegisterRequest: ITruckBookingLCLDetailRegisterRequest;
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

export interface ISeaBookingLCLDetailRegisterRequest {
  packageID: string;
  quantityPackage: string;
  gw: string;
  cbm: string;
  loadcapacity?: string[];
}
export interface ITruckBookingLCLDetailRegisterRequest {
  packageID: string;
  quantityPackage: string;
  loadCapacityID: string;
  gw: string;
  cbm: string;
}

export interface TypeUnitData {
  unitID: string;
  internationalCode: string;
}

export interface IRequireTypeUnit {
  type: TYPE_UNIT;
}
//Detail booking
export interface IDetailBooking {
  customerInformation: ICustomerInformation;
  shipmentDetail: {
    bookingNo: string;
    modeOfTransportation: string;
    pol: string;
    pod: string;
    quotationNo: string;
    bookingDated: string;
    valitidyTo: string;
    commodity: string;
    seaBookingLCLDetailDTO: {
      internationalCode: string;
      quantity: string;
      gw: string;
      cbm: string;
    };
    cargoReadyDated: string;
    demSeaQuotation: string;
    detSeaQuotation: string;
    stoSeaQuotation: string;
    effectDated: string;
    freqDate: string;
    transitTimeSeaQuotation: string;
    typeOfServiceTransportation: string;
    vendorName: string;
  };
  seaQuotationBooking: {
    quotationNo: string;
    seaQuotationLCLDetails: {
      package: string;
      quantityPackage: string;
      price: string;
      gw: string;
      cbm: string;
      quantity: string;
      currency: string;
      totalAmount: string;
    }[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  truckingQuotationPOLSelected: {
    quotationNo: string;
    truckingQuotationLCLDetails: IDetailPriceVAT[];
    sumTruckingQuotationFCLDetails: ITotalPrice[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  truckingQuotationPODSelected: {
    quotationNo: string;
    truckingQuotationLCLDetails: IDetailPriceVAT[];
    sumTruckingQuotationFCLDetails: ITotalPrice[];
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  customQuotationPOLSelected: {
    quotationNo: string;
    customQuotationLCLDetailSelecteds: ICustomQuotationLCLDetailSelecteds;
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  customQuotationPODSelected: {
    quotationNo: string;
    customQuotationLCLDetailSelecteds: ICustomQuotationLCLDetailSelecteds;
    ortherChargeDetailForBookings: IDetailPriceVAT[];
    sumOrtherChargeDetailForBooking: ITotalPrice[];
  };
  aslContactBooking: {
    issuedBy: string;
    possition: string[];
    email: string;
    tel: string;
  };
}
export interface ICustomerInformation {
  customer: string;
  companyName: string;
  email: string;
  address: string;
  addressCompany: string;
  tel: string;
  mobil: string;
  contact: string;
}
export interface ITotalPrice {
  item1: string;
  item2: string;
}
export interface IDetailPrice {
  description: string;
  unit: string;
  price: string;
  quantity: string;
  currency: string;
  totalAmount: string;
}
export interface IDetailPriceVAT extends IDetailPrice {
  vat: string;
}
export interface ICustomQuotationLCLDetailSelecteds {
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
  vat: string;
  gw: string;
  cbm: string;
  totalRedLane: string;
  totalYellowLane: string;
  totalGreenLane: string;
}
export interface IRequireDetailBooking {
  id?: string;
}
export interface IRequireConfirmBooking {
  id?: string;
}
