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
      { title: <Link href={ROUTERS.LCL_OCEAN_FREIGHT}>LCL Shipping</Link> },
    ],
    '/air-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.AIR_FREIGHT}>Air Freight</Link> },
    ],
    '/truck-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.TRUCK_FREIGHT}>Inland Trucking</Link> },
    ],
    '/ftl-truck-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.TRUCK_FREIGHT}>Inland Trucking</Link> },
      { title: <Link href={ROUTERS.FTL_TRUCK_FREIGHT}>FTL Shipping</Link> },
    ],
    '/ltl-truck-freight': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.TRUCK_FREIGHT}>Inland Trucking</Link> },
      { title: <Link href={ROUTERS.LTL_TRUCK_FREIGHT}>LTL Shipping</Link> },
    ],
    '/customs-service': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKING}>Booking</Link> },
      { title: <Link href={ROUTERS.CUSTOMS_SERVICE}>Customs Broker</Link> },
    ],

    '/bookings-history': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKINGS_HISTORY}>Manage Shipments</Link> },
    ],

    '/fcl-detail/[id]': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKINGS_HISTORY}>Manage Shipments</Link> },
    ],

    '/lcl-detail/[id]': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKINGS_HISTORY}>Manage Shipments</Link> },
    ],

    '/track-trace': [
      { title: <Link href={ROUTERS.HOME}>Home</Link> },
      { title: <Link href={ROUTERS.BOOKINGS_HISTORY}>Track & Trace</Link> },
    ],

    '/404': [{ title: `Error` }],
  };
};

export default SHOW_ROUTER_HEADER;
