import React from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row } from 'antd';
import TruckingPol from './components/truckingPol';
import COLORS from '@/constants/color';
import Customs from './components/customs';
import { IDataBookingProps, IDataStep2Props } from '../..';
import TruckingPod from './components/truckingPod';

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  dataStep2PropsBooking: IDataStep2Props | undefined;
  dataPropsBooking: IDataBookingProps;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
}

export default function ServiceStep3({
  setDisplayStep,
  dataStep2PropsBooking,
  dataPropsBooking,
  setDataPropsBooking,
}: Props) {
  console.log(dataPropsBooking);

  return (
    <div className={style.service}>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ background: '#E7EEFF', marginBottom: '16px' }}>
            <Row gutter={16}>
              <Col span={24}>
                <div className={style.header}>Recommend Service</div>
              </Col>
              <Col
                span={dataPropsBooking?.step1?.trafficPol === 'DOOR' ? 24 : 0}
              >
                <TruckingPol dataPropsBooking={dataPropsBooking} />
              </Col>
              <Col
                span={dataPropsBooking?.step1?.trafficPod === 'DOOR' ? 24 : 0}
              >
                <TruckingPod dataPropsBooking={dataPropsBooking} />
              </Col>
              <Col span={24}>
                <Customs dataPropsBooking={dataPropsBooking}/>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Flex justify="space-between">
            <Button
              style={{
                marginRight: '8px',
                color: COLORS.GREY_COLOR_HOVER,
                width: '120px',
                height: '40px',
              }}
              onClick={() => setDisplayStep(2.2)}
            >
              Pervious
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => setDisplayStep(4)}
            >
              Next
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
