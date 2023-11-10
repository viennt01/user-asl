import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import HistoryBooking from '@/components/history-booking';
import withAuthentication from '@/hook/useAuthentication';

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

const Page = withAuthentication(HistoryBookingPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
