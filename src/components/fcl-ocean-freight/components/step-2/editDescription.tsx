import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import { Button, Col, Flex, Row } from 'antd';
import COLORS from '@/constants/color';
import LocalChargesEdit from './components/edit/localChargesEdit';
import TableContainerEdit from './components/edit/tableContainerEdit';
import { IDataBookingProps, IDataStep2Props } from '../..';
import { FeeTable, ISeaPricingDetail } from '../../interface';

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
  dataPropsBooking: IDataBookingProps;
  dataQuotation: ISeaPricingDetail | undefined;
  dataFeeTable: FeeTable[];
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}

export interface IQuantity {
  key: string;
  quantity: string;
}

export default function EditDescription({
  setDisplayStep,
  setDataPropsBooking,
  dataPropsBooking,
  dataFeeTable,
  setDataStep2PropsBooking,
  dataStep2PropsBooking,
}: Props) {
  return (
    <div className={style.description}>
      <Row gutter={16}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <TableContainerEdit
                dataPropsBooking={dataPropsBooking}
                setDataStep2PropsBooking={setDataStep2PropsBooking}
                dataStep2PropsBooking={dataStep2PropsBooking}
              />
            </Col>
            <Col span={24}>
              <LocalChargesEdit dataFeeTable={dataFeeTable} />
            </Col>
          </Row>
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
              onClick={() => (
                setDisplayStep(1),
                setDataPropsBooking((pre) => ({ ...pre, idQuotation: '' }))
              )}
            >
              Previous
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => setDisplayStep(3)}
            >
              Next
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
