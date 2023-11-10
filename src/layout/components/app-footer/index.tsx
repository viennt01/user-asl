import { Layout } from 'antd';
import React from 'react';
import style from './index.module.scss';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className={style.appFooterWrapper}>
      <div className={style.appFooter} />

      {/*  COPYRIGHT */}
      <div className={style.moreInfo}>
        <div className={`container ${style.container}`} />
      </div>
    </Footer>
  );
};

export default AppFooter;
