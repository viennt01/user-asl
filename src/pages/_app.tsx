import React from 'react';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

import { NextPage } from 'next';

import 'antd/dist/reset.css';
import '@/styles/globals.scss';
import { PageWithNoLayout } from '@/components/layout/no-layout';
import Head from 'next/head';
import { THEME_APP } from '@/constants/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  Layout: React.ElementType;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const AppLayout = Component.Layout || PageWithNoLayout;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="favicon" href={'/images/asl-logo.png'} />
        <link rel="shortcut icon" href={'/images/asl-logo.png'} />
      </Head>
      <ConfigProvider theme={THEME_APP}>
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
}
