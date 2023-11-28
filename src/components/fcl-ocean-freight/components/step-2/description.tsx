import React from 'react';
import style from './index.module.scss';
import { Button, Col, Flex, Row } from 'antd';
import TableContainerView from './components/view/tableContainerView';
import LocalChargesView from './components/view/localChargesView';
import CardTotal from './components/view/cardTotal';
import { IDataBookingProps } from '../..';
import { FeeTable, ISeaPricingDetail } from '../../interface';

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
  dataPropsBooking: IDataBookingProps;
  dataQuotation: ISeaPricingDetail | undefined;
  dataFeeTable: FeeTable[];
}

export default function Description({
  setDisplayStep,
  setDataPropsBooking,
  dataPropsBooking,
  dataFeeTable,
}: Props) {
  return (
    <div className={style.description}>
      <Row gutter={16}>
        <Col span={24} lg={16}>
          <Row>
            <Col span={24}>
              <TableContainerView dataPropsBooking={dataPropsBooking} />
            </Col>
            <Col span={24}>
              <LocalChargesView dataFeeTable={dataFeeTable} />
            </Col>
          </Row>
        </Col>
        <Col span={24} lg={8}>
          <CardTotal />
        </Col>
        <Col span={24}>
          <Flex justify="space-between">
            <Button
              style={{
                marginRight: '8px',
                color: 'red',
                width: '120px',
                height: '40px',
              }}
              onClick={() => (
                setDisplayStep(1), setDataPropsBooking({ idQuotation: '' })
              )}
            >
              Close
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => setDisplayStep(2.2)}
            >
              Booking
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
