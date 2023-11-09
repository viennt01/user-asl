import Head from 'next/head';
import getAppLayout from '@/components/layout';
import { APP_NAME } from '@/constants/common';
import Booking from '@/components/booking';

function BookingPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Booking</title>
      </Head>
      <Booking />
    </>
  );
}

BookingPage.Layout = getAppLayout();

export default BookingPage;
