import Head from 'next/head';
import getAppLayout from '@/components/layout';
import { APP_NAME } from '@/constants/common';
import Login from '@/components/login';
import { PageWithNoLayout } from '@/components/layout/no-layout';

function LoginPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Login</title>
      </Head>
      <Login />
      <div>s</div>
    </>
  );
}

LoginPage.Layout = getAppLayout();
LoginPage.Layout = PageWithNoLayout;
export default LoginPage;
