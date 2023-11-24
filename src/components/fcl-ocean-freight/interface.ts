export enum TYPE_LOCATION {
  'SEA' = 'Sea',
  'TRUCKING' = 'Truck',
  'AIR' = 'Air',
  'CUSTOM' = 'Custom',
  'ALL' = 'All',
  'TOTAL' = '',
}

// get all location
export interface IDataLocation {
  locationID: string;
  locationName: string;
}

export interface IRequireLocation {
  type: TYPE_LOCATION;
}

// get all type container
export interface RequireTypeContainer {
  containerTypeID: string;
  name: string;
  code: string;
}

// get all commodity
export interface RequireCommodity {
  commodityID: string;
  commodityName: string;
}
