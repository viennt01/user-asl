import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import withAuthentication from '@/hook/useAuthentication';
import CustomService from '@/components/customs-service';

function CustomServicePage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Customs Service</title>
      </Head>
      <CustomService />
    </>
  );
}
const Page = withAuthentication(CustomServicePage);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Page.Layout = getAppLayout(LAYOUT_TYPES.MAIN);

export default Page;
