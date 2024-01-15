import { ResponseWithPayload, post } from '@/fetcherAxios';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import {
  IDetailBooking,
  IRequestBookingHistory,
  IRequireBookingHistory,
} from './interface';

export const getHistoryBooking = (data: IRequestBookingHistory) => {
  return post<
    IRequestBookingHistory,
    ResponseWithPayload<IRequireBookingHistory>
  >({
    data,
  })(API_BOOKING.GET_HISTORY_BOOKING_BY_USER);
};
