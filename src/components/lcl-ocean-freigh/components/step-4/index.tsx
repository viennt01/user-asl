import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row, Image, ConfigProvider } from 'antd';
import COLORS from '@/constants/color';
import CustomerInformation from './components/customer-information';
import ShipmentDetail from './components/shipment-details';
import QuotationDetail from './components/quotation-detail';
import TermsConditions from './components/terms-conditions';
import OtherServiceCharges from './components/other-service-charges';
import Finish from './components/finish';

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
          <QuotationDetail />
          <TermsConditions />
          <OtherServiceCharges />
          <Finish />
          <Col span={24} style={{marginTop: '16px'}}>
            <Flex justify="space-between">
              <Button
                style={{
                  marginRight: '8px',
                  color: COLORS.GREY_COLOR_HOVER,
                  width: '120px',
                  height: '40px',
                }}
                onClick={() => setDisplayStep(3)}
              >
                Pervious
              </Button>
              <Button
                style={{ width: '120px', height: '40px' }}
                type="primary"
                onClick={() => setDisplayStep(5)}
              >
                Next
              </Button>
            </Flex>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
