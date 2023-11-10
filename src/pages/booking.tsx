import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import Booking from '@/components/booking';
import withAuthentication from '@/hook/useAuthentication';

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
const Page = withAuthentication(BookingPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
