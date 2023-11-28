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
} from './interface';
import {
  API_BOOKING,
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_FEE_GROUP,
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
