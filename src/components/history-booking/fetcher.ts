import { ResponseWithPayload, post } from '@/fetcherAxios';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { IDetailBookingLCL, IRequireBookingHistory } from './interface';

export const getHistoryBooking = (data: IRequireBookingHistory) => {
  return post<IRequireBookingHistory, ResponseWithPayload<IDetailBookingLCL[]>>({
    data,
  })(API_BOOKING.GET_HISTORY_BOOKING_BY_USER);
};
