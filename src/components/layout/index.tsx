import React from 'react';
import LayoutMain from '@/components/layout/components/layout-main';

interface Props {
  children: React.ReactNode;
}

function getAppLayout() {
  return function AppLayout({ children }: Props) {
    return <LayoutMain>{children}</LayoutMain>;
  };
}

export default getAppLayout;
