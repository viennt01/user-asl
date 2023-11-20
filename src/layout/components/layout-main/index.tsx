import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import style from './index.module.scss';
import AppHeader from '@/layout/components/app-header';
import AppFooter from '../app-footer';
import SHOW_ROUTER_HEADER from './constant';
import { useRouter } from 'next/router';
import ROUTERS from '@/constants/router';
import COLORS from '@/constants/color';

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const LayoutMain = ({ children }: Props) => {
  const router = useRouter();

  return (
    <Layout className="app-layout">
      <AppHeader />
      <Layout>
        <Layout>
          <div
            style={{
              display: router.pathname === ROUTERS.HOME ? 'none' : '',
              backgroundColor: COLORS.WHITE,
            }}
          >
            <Breadcrumb
              style={{ margin: '16px 46px' }}
              items={SHOW_ROUTER_HEADER()[router.pathname as never]}
              separator=">"
            />
          </div>
          <Content className={style.contentContainer}>{children}</Content>
        </Layout>
      </Layout>
      <AppFooter />
    </Layout>
  );
};

export default LayoutMain;
