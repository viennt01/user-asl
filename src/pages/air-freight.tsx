import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import AirFreight from '@/components/air-freight';

function AirFreightPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Air Freight</title>
      </Head>
      <AirFreight />
    </>
  );
}
const Page = withAuthentication(AirFreightPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
