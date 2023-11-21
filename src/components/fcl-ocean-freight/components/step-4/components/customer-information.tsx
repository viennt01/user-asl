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

export default function CustomerInformation() {
  interface DataType {
    key: string;
    right: string;
    left: string;
    Customer?: string;
    Email?: string;
    Address?: string;
    Contact?: string;
    Mobile?: string;
    Tel?: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'right',
      key: 'right',
      render: (text, record) => {
        return (
          <Flex>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                width: '100px',
              }}
            >
              {text}:
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '400',
                width: '400px',
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
      render: (text, record) => {
        return (
          <Flex>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                width: '100px',
              }}
            >
              {text}:
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '400',
                width: '400px',
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
      right: 'Customer',
      Customer: 'Nguyen Thanh Vien',
      left: 'Email',
      Email: 'thanhviennguyen01@gmail.com',
    },
    {
      key: '2',
      right: 'Address',
      Address: 'Nguyen Thanh Vien',
      left: 'Mobile',
      Mobile: 'Nguyen Thanh Vien',
    },
    {
      key: '3',
      right: 'Contact',
      Contact: 'Nguyen Thanh Vien',
      left: 'Tel',
      Tel: 'Nguyen Thanh Vien',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: COLORS.GREY_COLOR_HOVER,
            colorTextHeading: COLORS.WHITE,
            headerFontSize: 18,
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
        title="Customer information"
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
          scroll={{
            x: 'max-content',
          }}
        />
      </Card>
    </ConfigProvider>
  );
}
