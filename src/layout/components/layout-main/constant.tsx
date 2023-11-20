import ROUTERS from '@/constants/router';
import Link from 'next/link';

const SHOW_ROUTER_HEADER = () => {
  return {
    '/home': [
      {
        title: <Link href={ROUTERS.HOME}>Home</Link>,
      },
    ],

    '/booking': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
    ],
    '/ocean-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.OCEAN_FREIGHT}>Ocean Freight</Link> },
    ],
    '/fcl-ocean-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.OCEAN_FREIGHT}>Ocean Freight</Link> },
      { title: <Link href={ROUTERS.FCL_OCEAN_FREIGHT}>FCL Shipping</Link> },
    ],
    '/lcl-ocean-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.OCEAN_FREIGHT}>Ocean Freight</Link> },
      { title: <Link href={ROUTERS.LCL_OCEAN_FREIGHT}>FCL Shipping</Link> },
    ],
    '/air-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.AIR_FREIGHT}>Air Freight</Link> },
    ],
    '/truck-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.TRUCK_FREIGHT}>Truck Freight</Link> },
    ],
    '/customs-service': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.CUSTOMS_SERVICE}>Customs Service</Link> },
    ],

    '/bookings-history': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKINGS_HISTORY}>History Booking</Link> },
    ],

    '/track-trace': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKINGS_HISTORY}>Track & Trace</Link> },
    ],

    '/404': [{ title: `Error` }],
  };
};

export default SHOW_ROUTER_HEADER;
