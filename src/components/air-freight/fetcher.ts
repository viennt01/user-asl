import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  IRequireSearchQuotation,
  IQuotationRequire,
  ISeaPricingDetail,
  ISeaQuotationDetailDataBody,
  IBooking,
  IRequireDetailBooking,
  IDetailBooking,
} from './interface';
import { API_AIR_QUOTATION, API_BOOKING } from '@/fetcherAxios/endpoint';

// Search quotation
export const searchQuotation = (data: IRequireSearchQuotation) => {
  return post<IRequireSearchQuotation, ResponseWithPayload<IQuotationRequire>>({
    data,
  })(API_BOOKING.SEARCH_AIR);
};

// Get air quotation detail
export const getSeaQuotationDetail = (id: string) => {
  return post<
    ISeaQuotationDetailDataBody,
    ResponseWithPayload<ISeaPricingDetail>
  >({
    data: {
      id,
    },
  })(API_AIR_QUOTATION.GET_DETAIL);
};

//Booking
export const createBooking = (data: IBooking) => {
  return post<IBooking, ResponseWithPayload<string>>({
    data,
  })(API_BOOKING.CREATE_AIR_BOOKING);
};
export const getDetailBooking = (data: IRequireDetailBooking) => {
  return post<IRequireDetailBooking, ResponseWithPayload<IDetailBooking>>({
    data,
  })(API_BOOKING.GET_AIR_BOOKING_BY_ID);
};
