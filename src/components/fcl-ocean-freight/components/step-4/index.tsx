import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row, Image, ConfigProvider } from 'antd';
import COLORS from '@/constants/color';
import CustomerInformation from './components/customer-information';
import ShipmentDetail from './components/shipment-details';
import QuotationDetail from './components/sea-quotation-detail';
import TermsConditions from './components/terms-conditions';
import OtherServiceCharges from './components/other-service-charges';
import Finish from './components/finish';
import { IDataBookingProps } from '../..';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { useQuery } from '@tanstack/react-query';
import { getDetailBooking } from '../../fetcher';
import { ResponseWithPayload } from '@/fetcherAxios';
import { IDetailBooking } from '../../interface';
import { errorToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import SeaOtherCharges from './components/sea-other-charge';

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  dataPropsBooking: IDataBookingProps;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
}

export default function Step4({
  displayStep,
  setDisplayStep,
  dataPropsBooking,
  setDataPropsBooking,
}: Props) {
  useQuery({
    queryKey: [API_BOOKING.GET_SEA_BOOKING_BY_ID, dataPropsBooking.idBooking],
    queryFn: () => getDetailBooking({ id: dataPropsBooking.idBooking}),
    enabled: dataPropsBooking.idBooking !== '',
    onSuccess: (data: ResponseWithPayload<IDetailBooking>) => {
      if (data.status) {
        setDataPropsBooking((pre) => ({ ...pre, detailBooking: data.data }));
      }
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
    },
  });

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
          <CustomerInformation dataPropsBooking={dataPropsBooking} />
          <ShipmentDetail dataPropsBooking={dataPropsBooking} />
          <QuotationDetail dataPropsBooking={dataPropsBooking} />
          <SeaOtherCharges dataPropsBooking={dataPropsBooking} />
          <TermsConditions />
          <OtherServiceCharges dataPropsBooking={dataPropsBooking} />
          <Finish dataPropsBooking={dataPropsBooking} />
          <Col span={24} style={{ marginTop: '16px' }}>
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
