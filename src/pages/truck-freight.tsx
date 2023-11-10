import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import TruckingFreight from '@/components/trucking-freight';

function TruckingFreightPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Trucking Freight</title>
      </Head>
      <TruckingFreight />
    </>
  );
}
const Page = withAuthentication(TruckingFreightPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
