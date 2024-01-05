enum ROUTERS {
  HOME = '/',
  PROFILE = '/profile?tab=profile',
  LOGIN = '/login',
  REGISTER = '/register',
  LOGOUT = '/logout',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  CONFIRM_OTP = '/confirm-otp',
  TRACK_TRACE = '/track-trace',
  BOOKINGS_HISTORY = '/bookings-history',
  BOOKING = '/booking',
  OCEAN_FREIGHT = '/ocean-freight',
  FCL_OCEAN_FREIGHT = '/fcl-ocean-freight',
  LCL_OCEAN_FREIGHT = '/lcl-ocean-freight',
  AIR_FREIGHT = '/air-freight',
  TRUCK_FREIGHT = '/truck-freight',
  FTL_TRUCK_FREIGHT = '/ftl-truck-freight',
  LTL_TRUCK_FREIGHT = '/ltl-truck-freight',
  CUSTOMS_SERVICE = '/customs-service',
}

export default ROUTERS;

export const ROUTERS_DYNAMIC = {
  LCL_DETAIL: (id: string) => `/lcl-detail/${id}`,
  FCL_DETAIL: (id: string) => `/fcl-detail/${id}`,
  LTL_DETAIL: (id: string) => `/ltl-detail/${id}`,
  FTL_DETAIL: (id: string) => `/ftl-detail/${id}`,
};
