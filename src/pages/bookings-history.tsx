import Head from 'next/head';
import getAppLayout from '@/components/layout';
import { APP_NAME } from '@/constants/common';
import HistoryBooking from '@/components/history-booking';

function HistoryBookingPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | History Booking</title>
      </Head>
      <HistoryBooking />
    </>
  );
}

HistoryBookingPage.Layout = getAppLayout();

export default HistoryBookingPage;
