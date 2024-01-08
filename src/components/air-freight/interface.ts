import { Dayjs } from 'dayjs';
import {
  IPagination,
  TYPE_LOAD_CAPACITY,
  TYPE_UNIT,
} from '../fcl-ocean-freight/interface';

// search quotations
export interface IQuotation {
  airQuotationID: string;
  aodName: string;
  aolName: string;
  commodityName: string;
  currencyAbbreviations: string;
  freqDate: string;
  fscAirQuotation: string;
  loadCapacityMinAirQuotation: string;
  priceLoadCapacityMinAirQuotation: string;
  sscAirQuotation: string;
  transitTimeAirQuotation: string;
  vendorName: string;
  airQuotationDetailDTOs: { [key: string]: string };
}
export interface IRequireSearchQuotation {
  aolid: string;
  aodid: string;
  cargoReady: number;
  commodities: string[];
  paginateRequest: IPagination;
}
export interface IQuotationRequire extends IPagination {
  data: IQuotation[];
}
export interface IQuotationTable extends Omit<IQuotation, 'airQuotationID'> {
  key: string;
}

export interface IStep1 {
  aolid: string;
  aodid: string;
  trafficPol?: ITypeOfTransport;
  trafficPod?: ITypeOfTransport;
  receipt?: string;
  delivery?: string;
  cargoReady: number;
  cargoCutOffDated: number;
  commodities: string;
}

export interface ISeaQuotationDetailDataBody {
  id: string;
}

export interface ISeaPricingDetail {
  airQuotationID: string;
  aodid: string;
  aolid: string;
  aodName: string;
  aolName: string;
  commodityID: string;
  note: string;
  validityDate: Dayjs;
  effectDated: Dayjs;
  freqDate: string;
  currencyID: string;
  public: boolean;
  statusAirQuotation: string;
  fscAirQuotation: string;
  sscAirQuotation: string;
  loadCapacityMinAirQuotation: string;
  priceLoadCapacityMinAirQuotation: string;
  gw: boolean;
  forNewUser: boolean;
  vendorID: string;
  transitTimeAirQuotation: string;
  airQuotationDetailDTOs: IAirQuotationDetailDTOsFormValue[];
  airQuotaionFeeGroupDTOs: IAirQuotationFeeFormValue[];
  salesLeadsAirQuotationDTOs: ISalesLeadsAirQuotationDTOs[];
  airPricingID: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export interface IAirQuotationFeeFormValue {
  airPricingFeeGroupID: string;
  feeGroupID: string;
}

export interface ISeaQuotationFee {
  feeGroupID: string;
  feeGroupName: string;
}

export interface ISalesLeadsAirQuotationDTOs {
  salesLeadsAirQuotationID?: string;
  partnerID: string;
}

export interface IAirQuotationDetailDTOsFormValue {
  airPricingDetailID: string;
  loadCapacityID: string;
  loadCapacityName: string;
  price: string;
}

// search trucking
export type LoadCapacitiesType = {
  [key: string]: string;
};

export interface IRequireSearchTrucking {
  pickupID: string;
  deliveryID: string;
  cargoReady: number;
  commodityID: string;
  loadcapacities: LoadCapacitiesType;
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
  totalPrice: string;
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
  cargoReadyDated: number;
  cargoCutOffDated: number;
  placeOfRecipt: string;
  placeOfDelivery: string;
  note: string;
  statusBooking: string;
  isManualBooking: boolean;
  airQuotationID: string;
  truckingQuotationPOLID: string;
  truckingQuotationPODID: string;
  typeOfService: string;
  airBookingDetailRegisterRequest: {
    packageID: string;
    quantityPackage: string;
    gw: string;
    cw: string;
  };
  truckBookingLCLDetailRegisterRequest: {
    loadCapacityID: string;
    packageID: string;
    quantityLoadCapacity: string;
    quantityPackage: string;
    gw: string;
    cbm: string;
  };
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
  cw: string;
  loadCapacity?: string[];
}
export interface ITruckBookingLCLDetailRegisterRequests {
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
  typeUnit: TYPE_UNIT;
}
//Detail booking
export interface IDetailBooking {
  customerInformation: ICustomerInformation;
  shipmentDetail: {
    aod: string;
    aol: string;
    bookingDated: string;
    bookingNo: string;
    cargoCutOffDated: string;
    cargoReadyDated: string;
    commodity: string;
    effectDated: string;
    freqDate: string;
    fscAirQuotaiton: string;
    modeOfTransportation: string;
    note: string;
    placeOfDelivery: string;
    placeOfRecipt: string;
    quotationNo: string;
    sscAirQuotaiton: string;
    transitTimeAirQuotation: string;
    typeOfServiceTransportation: string;
    valitidyTo: string;
    vendorName: string;
    airBookingDetailDTO: {
      cw: string;
      gw: string;
      package: string;
      quantityPackage: string;
    };
  };
  airQuotationSelected: {
    quotationNo: string;
    airQuotationDetailBooking: {
      package: string;
      currency: string;
      cw: string;
      gw: string;
      quantityPackage: string;
      totalAmount: string;
    };
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
