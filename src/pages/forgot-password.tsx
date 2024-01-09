import Head from 'next/head';
import { APP_NAME } from '@/constants/common';
import ForgotPasswordPage from '@/components/forgot-password';

function LoginPage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | FORGOT PASSWORD</title>
      </Head>
      <ForgotPasswordPage />
    </>
  );
}

export default LoginPage;
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'forgot-password']);
