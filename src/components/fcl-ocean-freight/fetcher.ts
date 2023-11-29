import { ResponseWithPayload, get, post } from '@/fetcherAxios';
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
  IQuotationTruckingRequire,
  IRequireTypeLoadCapacity,
  RequireTypeLoadCapacity,
  IRequireSearchCustoms,
  IQuotationCustomsRequire,
} from './interface';
import {
  API_BOOKING,
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_FEE_GROUP,
  API_LOAD_CAPACITY,
  API_LOCATION,
  API_SEA_QUOTATION,
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
  return post<
    IRequireSearchTrucking,
    ResponseWithPayload<IQuotationTruckingRequire>
  >({
    data,
  })(API_BOOKING.SEARCH_TRUCKING_QUOTATION);
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
  return post<
    IRequireSearchCustoms,
    ResponseWithPayload<IQuotationCustomsRequire>
  >({
    data,
  })(API_BOOKING.SEARCH_CUSTOMS_QUOTATION);
};
