import Head from 'next/head';
import Home from '@/components/home-page';
import getAppLayout from '@/layout';
import { APP_NAME } from '@/constants/common';

function HomePage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Home</title>
      </Head>
      <Home />
    </>
  );
}

HomePage.Layout = getAppLayout();

export default HomePage;
