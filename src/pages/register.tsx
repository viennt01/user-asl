import Head from 'next/head';
import { APP_NAME, LAYOUT_TYPES } from '@/constants/common';
import Register from '@/components/register';
import getAppLayout from '@/layout';

function RegisterPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Register</title>
      </Head>
      <Register />
    </>
  );
}

RegisterPage.Layout = getAppLayout(LAYOUT_TYPES.NO_LAYOUT);
export default RegisterPage;
