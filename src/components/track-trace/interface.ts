export interface IRequestTrackTrade {
  hblNo: string;
  containerNo: string;
}

export interface IRequireTrackTrade {
  transID: string;
  hwbno: string;
  etd: string;
  pol: string;
  etdt: string;
  pot: string;
  etat: string;
  pod: string;
  eta: string;
  finalDestinationCode: string;
  finalDestination: string;
  placeOfDeliveryCode: string;
  placeOfDelivery: string;
  dateOfReleaseDO: string;
  documentReleaseDate: string;
  qty: string;
  containerType: string;
  containerNo: string;
  sealNo: string;
  qtyPkg: string;
  unitPkg: string;
  descriptionOfGood: string;
  gw: string;
  cbm: string;
  isPart: string;
  noPieces: string;
  totalGW: string;
  totalCBM: string;
  isSeaLCL: boolean;
  isSealFCL: boolean;
  localVessel: string;
  oceanVessel: string;
}
