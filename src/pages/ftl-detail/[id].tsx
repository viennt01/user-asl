import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import FtlTruckDetail from '@/components/ftl-truck-detail';

function FclOceanFreightDetailPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Inland Trucking</title>
      </Head>
      <FtlTruckDetail />
    </>
  );
}
const Page = withAuthentication(FclOceanFreightDetailPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
