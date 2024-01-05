import { ResponseWithPayload, post } from '@/fetcherAxios';
import {
  IRequireSearchQuotation,
  IQuotationRequire,
  IQuotationDetail,
  IQuotationDetailDataBody,
  IBooking,
  IRequireDetailBooking,
  IDetailBooking,
} from './interface';
import { API_BOOKING, API_TRUCKING_QUOTATION } from '@/fetcherAxios/endpoint';

// Search quotation
export const searchQuotation = (data: IRequireSearchQuotation) => {
  return post<IRequireSearchQuotation, ResponseWithPayload<IQuotationRequire>>({
    data,
  })(API_BOOKING.SEARCH_TRUCK);
};

// Get truck quotation detail
export const getQuotationDetail = (id: string) => {
  return post<
    IQuotationDetailDataBody,
    ResponseWithPayload<IQuotationDetail>
  >({
    data: {
      id,
    },
  })(API_TRUCKING_QUOTATION.GET_DETAIL);
};

//Booking
export const createBooking = (data: IBooking) => {
  return post<IBooking, ResponseWithPayload<string>>({
    data,
  })(API_BOOKING.CREATE_TRUCK_BOOKING);
};
export const getDetailBooking = (data: IRequireDetailBooking) => {
  return post<IRequireDetailBooking, ResponseWithPayload<IDetailBooking>>({
    data,
  })(API_BOOKING.GET_TRUCK_BOOKING_BY_ID);
};
