import { ResponseWithPayload, get, post } from '@/fetcherAxios';
import { IDataLocation, IRequireLocation, IRequireSearchQuotation, RequireCommodity, RequireTypeContainer, IQuotationRequire } from './interface';
import { API_BOOKING, API_COMMODITY, API_CONTAINER_TYPE, API_LOCATION } from '@/fetcherAxios/endpoint';

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
  return post<IRequireSearchQuotation, ResponseWithPayload<IQuotationRequire>>({ data })(
    API_BOOKING.SEARCH_SEA
  );
};