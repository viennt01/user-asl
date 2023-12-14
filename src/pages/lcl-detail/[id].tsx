import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import LclOceanFreightDetail from '@/components/lcl-sea-deatil';

function LclOceanFreightDetailPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Ocean Freight</title>
      </Head>
      <LclOceanFreightDetail />
    </>
  );
}
const Page = withAuthentication(LclOceanFreightDetailPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
