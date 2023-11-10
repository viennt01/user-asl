import React from 'react';
import LayoutMain from '@/layout/components/layout-main';
import { LAYOUT_TYPES } from '@/constants/common';
import { PageWithNoLayout } from './no-layout';

interface Props {
  children: React.ReactNode;
}

function getAppLayout(layoutType?: string) {
  return function AppLayout({ children }: Props) {
    switch (layoutType) {
      case LAYOUT_TYPES.NO_LAYOUT: {
        return (
          <PageWithNoLayout>
            {/* {contextHolder} */}
            {children}
          </PageWithNoLayout>
        );
      }
      default: {
        return (
          <LayoutMain>
            {/* {contextHolder} */}
            {children}
          </LayoutMain>
        );
      }
    }
  };
}

export default getAppLayout;
