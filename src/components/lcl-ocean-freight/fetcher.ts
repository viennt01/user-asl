import { ResponseWithPayload, get, post, uploadFile } from '@/fetcherAxios';
import {
  IDataLocation,
  IRequireLocation,
  IRequireSearchQuotation,
  RequireCommodity,
  RequireTypeContainer,
  IQuotationRequire,
  ISeaPricingDetail,
  ISeaQuotationDetailDataBody,
  FeeTable,
  RequestFee,
  IRequireSearchTrucking,
  IRequireTypeLoadCapacity,
  RequireTypeLoadCapacity,
  IRequireSearchCustoms,
  IQuotationCustomsRequire,
  ITypeOfTransport,
  IBooking,
  IQuotationTrucking,
  IQuotationCustoms,
  IRequireTypeUnit,
  TypeUnitData,
  IRequireDetailBooking,
  IDetailBooking,
  IRequireConfirmBooking,
} from './interface';
import {
  API_BOOKING,
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_FEE_GROUP,
  API_LOAD_CAPACITY,
  API_LOCATION,
  API_SEA_QUOTATION,
  API_TYPE_OF_TRANSPORT,
  API_UNIT,
} from '@/fetcherAxios/endpoint';

// Get all location
export const getAllLocation = (data: IRequireLocation) => {
  return post<IRequireLocation, ResponseWithPayload<IDataLocation[]>>({ data })(
    API_LOCATION.GET_ALL
  );
};

// Get all Container Type
export const getAllContainerType = () => {
  return get<ResponseWithPayload<RequireTypeContainer[]>>({})(
    API_CONTAINER_TYPE.GET_ALL
  );
};

//Get all Commodity
export const getAllCommodity = () => {
  return get<ResponseWithPayload<RequireCommodity[]>>({})(
    API_COMMODITY.GET_ALL
  );
};

// Search quotation
export const searchQuotation = (data: IRequireSearchQuotation) => {
  return post<IRequireSearchQuotation, ResponseWithPayload<IQuotationRequire>>({
    data,
  })(API_BOOKING.SEARCH_SEA);
};

// Get sea quotation detail
export const getSeaQuotationDetail = (id: string) => {
  return post<
    ISeaQuotationDetailDataBody,
    ResponseWithPayload<ISeaPricingDetail>
  >({
    data: {
      id,
    },
  })(API_SEA_QUOTATION.GET_DETAIL);
};

// Get table fee with feeGroup
export const getFeeWithFeeGroup = (data: RequestFee) => {
  return post<RequestFee, ResponseWithPayload<FeeTable[]>>({ data })(
    API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP
  );
};

// Get price trucking
export const getPriceTrucking = (data: IRequireSearchTrucking) => {
  return post<IRequireSearchTrucking, ResponseWithPayload<IQuotationTrucking>>({
    data,
  })(API_BOOKING.RECOMMEND_TRUCKING_QUOTATION_FOR_BOOKING_LCL);
};

//Get all Load Capacity
export const getAllLoadCapacity = (data: IRequireTypeLoadCapacity) => {
  return post<
    IRequireTypeLoadCapacity,
    ResponseWithPayload<RequireTypeLoadCapacity[]>
  >({ data })(API_LOAD_CAPACITY.GET_ALL);
};

// Get price custom
export const getPriceCustom = (data: IRequireSearchCustoms) => {
  return post<IRequireSearchCustoms, ResponseWithPayload<IQuotationCustoms[]>>({
    data,
  })(API_BOOKING.RECOMMEND_CUSTOM_QUOTATION_FOR_BOOKING);
};
//Get type of transport
export const getListTypeTransport = () => {
  return get<ResponseWithPayload<ITypeOfTransport[]>>({})(
    API_TYPE_OF_TRANSPORT.GET_ALL
  );
};
//Booking
export const createBooking = (data: IBooking) => {
  return post<IBooking, ResponseWithPayload<string>>({
    data,
  })(API_BOOKING.CREATE_BOOKING);
};
export const getDetailBooking = (data: IRequireDetailBooking) => {
  return post<IRequireDetailBooking, ResponseWithPayload<IDetailBooking>>({
    data,
  })(API_BOOKING.GET_SEA_BOOKING_BY_ID);
};
//Get type unit
export const getListTypeUnit = (data: IRequireTypeUnit) => {
  return post<IRequireTypeUnit, ResponseWithPayload<TypeUnitData[]>>({ data })(
    API_UNIT.GET_ALL
  );
};
//confirm booking
export const confirmBooking = (data: IRequireConfirmBooking) => {
  return post<IRequireConfirmBooking, ResponseWithPayload<string>>({
    data,
  })(API_BOOKING.CONFIRM_BOOKING_BY_USER);
};

//upload form booking
export const sendFilePdfBooking = (data: FormData) => {
  return uploadFile({
    data,
  })(API_BOOKING.UPLOAD_FILE_BOOKING_BY_USER);
};
