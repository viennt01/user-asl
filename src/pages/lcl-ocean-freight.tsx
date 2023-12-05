import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import LclOceanFreight from '@/components/lcl-ocean-freigh';

function FclOceanFreightPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Ocean Freight</title>
      </Head>
      <LclOceanFreight />
    </>
  );
}
const Page = withAuthentication(FclOceanFreightPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
