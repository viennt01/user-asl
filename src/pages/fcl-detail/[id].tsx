import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import FclOceanFreightDetail from '@/components/fcl-sea-detail';

function FclOceanFreightDetailPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Ocean Freight</title>
      </Head>
      <FclOceanFreightDetail />
    </>
  );
}
const Page = withAuthentication(FclOceanFreightDetailPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
