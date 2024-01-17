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

export const API_TYPE_DECLARATION = {
  GET_ALL: '/get-all-type-delaracrion',
};

export const API_BOOKING = {
  CREATE_BOOKING: '/create-sea-booking',
  CREATE_TRUCK_BOOKING: '/create-truck-booking',
  CREATE_AIR_BOOKING: '/create-air-booking',
  SEARCH_SEA: '/search-sea-quotation-for-booking',
  SEARCH_TRUCK: '/search-trucking-quotation-for-booking',
  SEARCH_AIR: '/search-air-quotation-for-booking',
  SEARCH_TRUCKING_QUOTATION_RECOMMEND_SERVICE_SEA:
    '/search-trucking-quotation-for-booking',
  SEARCH_CUSTOMS_QUOTATION_RECOMMEND_SERVICE_SEA:
    '/search-custom-quotation-for-booking',
  RECOMMEND_TRUCKING_QUOTATION_FOR_BOOKING_FCL:
    '/recommend-fcl-trucking-quotation-for-booking',
  RECOMMEND_TRUCKING_QUOTATION_FOR_BOOKING_LCL:
    '/recommend-lcl-trucking-quotation-for-booking',
  RECOMMEND_CUSTOM_QUOTATION_FOR_BOOKING:
    '/recommend-custom-quotation-for-booking',
  GET_SEA_BOOKING_BY_ID: '/get-sea-booking-by-id',
  GET_TRUCK_BOOKING_BY_ID: '/get-truck-booking-by-id',
  GET_AIR_BOOKING_BY_ID: '/get-air-booking-by-id',
  CONFIRM_BOOKING_BY_USER: '/comfirm-booking-by-user',
  UPLOAD_FILE_BOOKING_BY_USER: '/upload-file-booking',
  SEND_FILE_IN_EMAIL_BOOKING_BY_USER: '/send-file-in-email-booking',
  GET_HISTORY_BOOKING_BY_USER: '/get-history-booking-by-user',
};

export const API_SEA_QUOTATION = {
  GET_DETAIL: '/get-sea-quotation-by-id',
};

export const API_TRUCKING_QUOTATION = {
  GET_DETAIL: '/get-trucking-quotation-by-id',
};

export const API_AIR_QUOTATION = {
  GET_DETAIL: '/get-air-quotation-by-id',
};

export const API_FEE_GROUP = {
  GET_ALL_FEE_WITH_FEE_GROUP: '/get-all-fee-with-fee-group',
  GET_ALL_FEE_WITH_FEE_GROUP_OPTION: '/get-all-fee-with-fee-group-and-options',
};

export const API_LOAD_CAPACITY = {
  GET_ALL: '/get-all-load-capacity',
};

export const API_TYPE_OF_TRANSPORT = {
  GET_ALL: '/get-all-type-of-transport',
};
export const API_UNIT = {
  GET_ALL: '/get-all-unit',
};
