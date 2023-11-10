import Head from 'next/head';
import getAppLayout from '@/layout';
import { APP_NAME } from '@/constants/common';
import TraceTrace from '@/components/track-trace';

function TraceTracePage() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Track & Trace</title>
      </Head>
      <TraceTrace />
    </>
  );
}

TraceTracePage.Layout = getAppLayout();

export default TraceTracePage;
