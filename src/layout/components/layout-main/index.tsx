import React from 'react';
import { Layout } from 'antd';
import style from './index.module.scss';
import AppHeader from '@/layout/components/app-header';
import AppFooter from '../app-footer';

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const LayoutMain = ({ children }: Props) => {
  return (
    <Layout className="app-layout">
      <AppHeader />
      <Layout>
        <Layout>
          <Content className={style.contentContainer}>{children}</Content>
        </Layout>
      </Layout>
      <AppFooter />
    </Layout>
  );
};

export default LayoutMain;
