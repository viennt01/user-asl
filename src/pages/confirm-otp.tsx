import Head from 'next/head';
import getAppLayout from '@/components/layout';
import { APP_NAME } from '@/constants/common';
import { PageWithNoLayout } from '@/components/layout/no-layout';
import ConfirmOtp from '@/components/cofirm-otp';

function ConfirmPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | CONFIRM OTP</title>
      </Head>
      <ConfirmOtp />
    </>
  );
}

ConfirmPage.Layout = getAppLayout();
ConfirmPage.Layout = PageWithNoLayout;
export default ConfirmPage;
