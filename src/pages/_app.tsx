import React from 'react';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import AppContextProvider from '@/app-context';
import { NextPage } from 'next';

import 'antd/dist/reset.css';
import '@/styles/globals.scss';
import Head from 'next/head';
import { THEME_APP } from '@/constants/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LAYOUT_TYPES } from '@/constants/common';
import getAppLayout from '@/layout';
export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  Layout?: React.ElementType;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const AppLayout = Component.Layout
    ? Component.Layout
    : getAppLayout(LAYOUT_TYPES.NO_LAYOUT);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <>
      <ConfigProvider theme={THEME_APP}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="favicon" href={'/images/asl-logo.png'} />
          <link rel="shortcut icon" href={'/images/asl-logo.png'} />
        </Head>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AppContextProvider>
      </ConfigProvider>
    </>
  );
}
