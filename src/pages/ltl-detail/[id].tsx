import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import LtlTruckDetail from '@/components/ltl-truck-detail';

function LtlTruckFreightDetailPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Inland Trucking</title>
      </Head>
      <LtlTruckDetail />
    </>
  );
}
const Page = withAuthentication(LtlTruckFreightDetailPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
