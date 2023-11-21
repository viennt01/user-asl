import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row, Image, ConfigProvider } from 'antd';
import COLORS from '@/constants/color';
import CustomerInformation from './components/customer-information';

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Step4({ displayStep, setDisplayStep }: Props) {
  return (
    <div
      className={style.step4}
      style={{
        display: displayStep === 4 ? '' : 'none',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: '#E7EEFF',
              colorTextHeading: COLORS.GREY_COLOR_HOVER,
              headerFontSize: 22,
              colorBorderSecondary: COLORS.GREY_COLOR_HOVER,
              borderRadiusLG: 0,
              borderRadius: 0,
            },
          },
        }}
      >
        <Card className={style.cardMain} title="Review Booking">
          <Row gutter={26}>
            <Col
              span={24}
              style={{
                marginBottom: '24px',
              }}
            >
              <Image
                src={'/images/oceanFreight/contactAsl.png'}
                preview={false}
              />
            </Col>
            <CustomerInformation />
          </Row>
        </Card>
      </ConfigProvider>
    </div>
  );
}
