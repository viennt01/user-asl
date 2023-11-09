import Head from 'next/head';
import getAppLayout from '@/components/layout';
import { APP_NAME } from '@/constants/common';
import { PageWithNoLayout } from '@/components/layout/no-layout';
import Register from '@/components/register';

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

RegisterPage.Layout = getAppLayout();
RegisterPage.Layout = PageWithNoLayout;
export default RegisterPage;
