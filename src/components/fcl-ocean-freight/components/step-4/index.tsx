import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row, Image, ConfigProvider } from 'antd';
import COLORS from '@/constants/color';
import CustomerInformation from './components/customer-information';
import ShipmentDetail from './components/shipment-details';

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
          <ShipmentDetail />
        </Row>
      </Card>
    </div>
  );
}
