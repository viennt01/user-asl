import Head from 'next/head';
import { APP_NAME } from '@/constants/common';
import Login from '@/components/login';

function LoginPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Login</title>
      </Head>
      <Login />
    </>
  );
}

export default LoginPage;
