import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import AirDetail from '@/components/air-detail';

function AirFreightDetailPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Air Freight</title>
      </Head>
      <AirDetail />
    </>
  );
}
const Page = withAuthentication(AirFreightDetailPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
