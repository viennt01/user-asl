import { ResponseWithPayload, post } from '@/fetcherAxios';
import { API_TRACK_TRADE } from '@/fetcherAxios/endpoint';
import { IRequestTrackTrade, IRequireTrackTrade } from './interface';

export const searchTrackTrade = (data: IRequestTrackTrade) => {
  return post<IRequestTrackTrade, ResponseWithPayload<IRequireTrackTrade>>({
    data,
  })(API_TRACK_TRADE.SEARCH);
};
