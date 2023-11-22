import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Image,
  ConfigProvider,
  Table,
} from 'antd';
import COLORS from '@/constants/color';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';

export default function ShipmentDetail() {
  interface DataType {
    key: string;
    right: string;
    left: string;
    'Mode of transportation'?: string;
    'Port of loading'?: string;
    'Place of pick up'?: string;
    Commodity?: string;
    'Customs declaration form'?: string;
    'HS code'?: string;
    'Quotation no'?: string;
    Date?: string;
    'Validity to'?: string;
    'Gross weight'?: string;
    Mearsurement?: string;
    Quantity?: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'right',
      key: 'right',
      width: '50%',
      render: (text, record) => {
        return (
          <Flex style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                width: '220px',
              }}
            >
              {text}:
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '400',
                // width: '80%',
              }}
            >
              {record[text as keyof DataType]}
            </div>
          </Flex>
        );
      },
    },
    {
      dataIndex: 'left',
      key: 'left',
      width: '50%',
      render: (text, record) => {
        return (
          <Flex style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                width: '130px',
              }}
            >
              {text}:
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '400',
                // width: '80%',
              }}
            >
              {record[text as keyof DataType]}
            </div>
          </Flex>
        );
      },
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      right: 'Mode of transportation',
      'Mode of transportation': 'Nguyen Thanh Vien',
      left: 'Quotation no',
      'Quotation no': 'Nguyen Thanh Vien',
    },
    {
      key: '2',
      right: 'Port of loading',
      'Port of loading': 'Nguyen Thanh Vien',
      left: 'Date',
      Date: 'Nguyen Thanh Vien',
    },
    {
      key: '3',
      right: 'Place of pick up',
      'Place of pick up': 'Nguyen Thanh Vien',
      left: 'Validity to',
      'Validity to': 'Nguyen Thanh Vien',
    },
    {
      key: '4',
      right: 'Commodity',
      Commodity: 'Nguyen Thanh Vien',
      left: 'Gross weight',
      'Gross weight': 'Nguyen Thanh Vien',
    },
    {
      key: '5',
      right: 'Customs declaration form',
      'Customs declaration form': 'Nguyen Thanh Vien',
      left: 'Mearsurement',
      Mearsurement: 'Nguyen Thanh Vien',
    },
    {
      key: '6',
      right: 'HS code',
      'HS code': 'Nguyen Thanh Vien',
      left: 'Quantity',
      Quantity: 'Nguyen Thanh Vien',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBorderSecondary: 'rgba(0, 0, 0, 0.1)',
            borderRadiusLG: 0,
            borderRadius: 0,
          },
          Table: {
            borderColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 0,
            borderRadiusLG: 0,
          },
        },
      }}
    >
      <Card
        title="Shipment details"
        style={{ width: '100%' }}
        className={style.cardCustomer}
      >
        <Table
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          showHeader={false}
          pagination={false}
          bordered
        />
      </Card>
    </ConfigProvider>
  );
}
