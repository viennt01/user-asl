import { Dayjs } from 'dayjs';
import { IPagination } from '@/components/fcl-ocean-freight/interface';

export enum TYPE_TABLE {
  'FREIGHT_CHARGES' = 'FREIGHT_CHARGES',
  'OTHER_CHARGES' = 'OTHER_CHARGES',
}

// search quotations
export interface IQuotation {
  truckingQuotationID: string;
  deliveryID: string;
  deliveryName: string;
  pickupID: string;
  pickupName: string;
  commodityID: string;
  commodityName: string;
  truckingQuotationDetailDTOs: { [key: string]: string };
}
export interface IRequireSearchQuotation extends IStep1 {
  pickupID: string;
  deliveryID: string;
  typeSeaService: string;
  cargoReady: number;
  commodities: string[];
  containers: string[];
  paginateRequest: IPagination;
}
export interface IQuotationRequire extends IPagination {
  data: IQuotation[];
}
export interface IQuotationTable
  extends Omit<IQuotation, 'truckingQuotationID'> {
  key: string;
}

export interface IStep1 {
  receipt?: string;
  delivery?: string;
  cargoReady?: number;
  containers?: string[];
  commodities?: string[];
}

export interface IQuotationDetailDataBody {
  id: string;
}

export interface IQuotationDetail {
  truckingQuotationID: string;
  truckingPricingID: string;
  truckingQuotationNo: string;
  pickupID: string;
  deliveryID: string;
  commodityID: string;
  currencyID: string;
  vendorID: string;
  note: string;
  effectDated: Dayjs;
  validityDate: Dayjs;
  freqDate: string;
  forNewUser: boolean;
  public: boolean;
  statusTruckingQuotation: string;
  transitTimetruckingPricing: string;
  pickupName: string;
  deliveryName: string;
  commodityName: string;
  currencyAbbreviations: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
  confirmDated: string;
  confirmByUser: string;
  truckingQuotationDetailByContainerTypeDTOs: IContainerDTOFormValue[];
  truckingQuotationDetailByLoadCapacityDTOs: ILoadCapacityDTOFormValue[];
  truckingQuotationFeeGroupDTOs: ITruckQuotationFeeFormValue[];
  salesLeadsTruckingQuotationDTOs: ISalesLeadsSeaQuotationDTOs[];
  truckingQuotaionGroupPartnerDTOs: ITruckQuotaionGroupPartnerDTOs[];
}

export interface IContainerDTOFormValue {
  truckingQuotationDetailByContainerTypeID: string;
  containerTypeID: string;
  containerTypeCode: string;
  containerTypeName: string;
  currencyID: string;
  currencyName: string;
  price: string;
  vat: string;
}

export interface ILoadCapacityDTOFormValue {
  truckingQuotationDetailByLoadCapacityID: string;
  loadCapacityID: string;
  loadCapacityCode: string;
  loadCapacityName: string;
  currencyID: string;
  currencyName: string;
  price: string;
  vat: string;
}

export interface ITruckQuotationFeeFormValue {
  feeGroupID: string;
  feeGroupName: string;
}

export interface ISalesLeadsSeaQuotationDTOs {
  salesLeadsTruckingQuotationID?: string;
  partnerID: string;
}

export interface ITruckQuotaionGroupPartnerDTOs {
  truckingQuotationGroupPartnerID: string;
  groupPartnerID: string;
}

//Booking
export interface IBooking {
  podid: string; // pickup
  polid: string; // delivery
  typeSeaService: string; // FTL
  typeOfService: string; // TRUCK
  currencyID: string;
  commodityID: string;
  cargoReadyDated: number;
  placeOfRecipt: string;
  placeOfDelivery: string;
  note: string;
  statusBooking: string;
  isManualBooking: boolean;
  truckingQuotationID: string;
  truckBookingFCLDetailRegisterRequests: {
    containerTypeID: string;
    quantityContainer: string;
  }[];
}

//Detail booking
export interface IDetailBooking {
  customerInformation: ICustomerInformation;
  shipmentDetail: {
    bookingNo: string;
    modeOfTransportation: string;
    pickupName: string;
    deliveryName: string;
    placeOfRecipt: string;
    placeOfDelivery: string;
    quotationNo: string;
    freqDate: string;
    effectDated: string;
    valitidyTo: string;
    commodity: string;
    truckBookingFCLDetailDTOs: {
      containerTypeCode: string;
      quantity: string;
    }[];
    transitTimeTruckingQuotation: string;
    cargoReadyDated: string;
    cargoCutOffDated: string;
    bookingDated: string;
    note: string;
  };
  truckingQuotationSelected: {
    quotationNo: string;
    truckingQuotationFCLDetails: IDetailPriceVAT[];
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
//
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
export interface IRequireDetailBooking {
  id?: string;
}
