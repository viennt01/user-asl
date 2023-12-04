export const API_AUTHENTICATE = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REFRESH_TOKEN: '/refresh-token',
  CONFIRM_OTP: '/confirm-otp-with-login',
};

export const API_USER = {
  CHECK_USER: '/check-user',
  UPDATE_NEW_USER: '/change-status-new-user',
  GET_SEARCH: '/search-user',
  GET_DETAIL: '/get-user',
  UPDATE_STATUS: '/update-status-user',
  EXPORT: '/export-user-with-excel',
};

export const API_TRACK_TRADE = {
  SEARCH: '/track-and-trace',
};

export const API_LOCATION = {
  GET_ALL: '/get-all-location',
};

export const API_CONTAINER_TYPE = {
  GET_ALL: '/get-all-container-type',
};

export const API_COMMODITY = {
  GET_ALL: '/get-all-commodity',
};

export const API_BOOKING = {
  CREATE_BOOKING: '/create-booking',
  SEARCH_SEA: '/search-sea-quotation-for-booking',
  SEARCH_TRUCKING_QUOTATION: '/search-trucking-quotation-for-booking',
  SEARCH_CUSTOMS_QUOTATION: '/search-custom-quotation-for-booking',
  RECOMMEND_TRUCKING_QUOTATION_FOR_BOOKING: '/recommend-trucking-quotation-for-booking',
};

export const API_SEA_QUOTATION = {
  GET_DETAIL: '/get-sea-quotation-by-id',
};

export const API_FEE_GROUP = {
  GET_ALL_FEE_WITH_FEE_GROUP: '/get-all-fee-with-fee-group',
};

export const API_LOAD_CAPACITY = {
  GET_ALL: '/get-all-load-capacity',
};

export const API_TYPE_OF_TRANSPORT = {
  GET_ALL: '/get-all-type-of-transport',
};
