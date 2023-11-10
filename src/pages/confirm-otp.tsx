import Head from 'next/head';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import ConfirmOtp from '@/components/cofirm-otp';
import getAppLayout from '@/layout';

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

ConfirmPage.Layout = getAppLayout(LAYOUT_TYPES.NO_LAYOUT);
export default ConfirmPage;
