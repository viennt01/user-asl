import { Col, Row } from 'antd';
import React from 'react';

import style from './index.module.scss';
import SvgWorldMap from './assets/world-map.svg';
import Link from 'next/link';
import ROUTERS from '@/constants/router';
import CustomButton from '@/components/common/custom-button';

const CONTENT = {
  title: 'MARKET',
  desc: 'At the forefront of the rapidly evolving trading landscape, our platform is committed to becoming the number one AI Trading Marketplace, offering unparalleled support and resources for algo trading enthusiasts worldwide.',
  keyValues: [
    {
      name: '1000+',
      desc: 'Strategies are created by Machine Learning, rigorously tested, and optimized.',
    },
    {
      name: '100%',
      desc: 'Offering a 100% automation process for all your trading needs.',
    },
    {
      name: '24/7',
      desc: "Round-the-clock service, 24/7 support to ensure that our user's need is always fulfill.",
    },
  ],
  link: ROUTERS.BOOKINGS_HISTORY,
  btnText: 'GO TO MARKET',
};

export const MarketInfoSection = () => {
  const keyValueColXL = 6;

  return (
    <section id="market" className={style.section}>
      <div className="container">
        <Row gutter={16}>
          <Col span={24} xl={12}>
            <p className={style.title}>{CONTENT.title}</p>
            <p className={style.desc}>{CONTENT.desc}</p>

            <Link href={CONTENT.link} title="Go to market">
              <CustomButton className={style.btn} append={<></>}>
                {CONTENT.btnText}
              </CustomButton>
            </Link>
          </Col>
          <Col span={24} xl={12} className={style.imgCol}>
            <SvgWorldMap className={style.img} />
          </Col>
        </Row>
        <Row gutter={16} className={style.infoRow}>
          {CONTENT.keyValues.map((keyValue, index) => (
            <Col key={index} span={24} md={8} xl={keyValueColXL}>
              <div className={style.keyName}>{keyValue.name}</div>
              <div className={style.keyDesc}>{keyValue.desc}</div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default MarketInfoSection;
