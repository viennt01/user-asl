import { ResponseWithPayload, post } from '@/fetcherAxios';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { IDetailBooking, IRequireBookingHistory } from './interface';

export const getHistoryBooking = (data: IRequireBookingHistory) => {
  return post<IRequireBookingHistory, ResponseWithPayload<IDetailBooking[]>>({
    data,
  })(API_BOOKING.GET_HISTORY_BOOKING_BY_USER);
};
