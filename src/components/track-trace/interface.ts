export interface IRequestTrackTrade {
  hblNo: string;
  containerNo: string;
  bookingNo: string;
}

export interface IRequireTrackTrade {
  bookingNo: string;
  polName: string;
  podName: string;
  commodityName: string;
  etd: string; // ngay bat dau
  eta: number; // ngay ket thuc
  estimatedVessel: string; // nha cung cap
  refNo: string; // ten tau
  conformJobNo: string; // quy dinh kiem dinh
  confirmHBL: string; // van don
  hwbno: string; // van don thu cap
  completedOn: string; // ngay hoan thanh
}
