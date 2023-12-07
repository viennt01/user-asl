import React, { useEffect, useState } from 'react';
import { Card, Flex, ConfigProvider, Table } from 'antd';
import COLORS from '@/constants/color';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';

interface Props {
  dataPropsBooking: IDataBookingProps;
}
interface DataType {
  key: string;
  right: string;
  left: string;
  'Company Name'?: string;
  'Company Address'?: string;
  Customer?: string;
  Email?: string;
  Address?: string;
  Contact?: string;
  Mobile?: string;
  Tel?: string;
}

export default function CustomerInformation({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([
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
  ]);
  const {
    customer,
    companyName,
    email,
    addresss,
    companyAddress,
    tel,
    mobil,
    contact,
  } = dataPropsBooking?.detailBooking?.customerInformation || {};

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'right',
      key: 'right',
      width: '50%',
      render: (text, record) => {
        return (
          <Flex>
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
                width: '80%',
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
          <Flex>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                width: '155px',
              }}
            >
              {text}:
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '400',
                width: '80%',
              }}
            >
              {record[text as keyof DataType]}
            </div>
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    setData([
      {
        key: '0',
        right: 'Company Name',
        'Company Name': companyName || '',
        left: 'Company Address',
        'Company Address': companyAddress || '',
      },
      {
        key: '1',
        right: 'Customer',
        Customer: customer || '',
        left: 'Email',
        Email: email || '',
      },
      {
        key: '2',
        right: 'Address',
        Address: addresss || '',
        left: 'Mobile',
        Mobile: mobil || '',
      },
      {
        key: '3',
        right: 'Contact',
        Contact: contact || '',
        left: 'Tel',
        Tel: tel || '',
      },
    ]);
  }, [dataPropsBooking]);

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
        />
      </Card>
    </ConfigProvider>
  );
}
