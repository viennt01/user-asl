import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import FtlTruckFreight from '@/components/ftl-truck-freight';

function FclOceanFreightPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Inland Trucking</title>
      </Head>
      <FtlTruckFreight />
    </>
  );
}
const Page = withAuthentication(FclOceanFreightPage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
