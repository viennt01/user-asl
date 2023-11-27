import React from 'react';
import { Card, ConfigProvider, Table } from 'antd';
import COLORS from '@/constants/color';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import TotalPrice from './totalPrice';

export default function OtherServiceCharges() {
  interface DataType {
    key: string;
    description?: string;
    quantity?: string;
    price?: string;
    currency?: string;
    total?: string;
    remark?: string;
  }

  const sharedOnCell = (_: DataType, index: number | undefined) => {
    if (index === 1) {
      return { colSpan: 0 };
    }

    return {};
  };

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          No.
        </div>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      fixed: 'right',
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Description of charges
        </div>
      ),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Quantity
        </div>
      ),
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Price
        </div>
      ),
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Currency
        </div>
      ),
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Total Amount
        </div>
      ),
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '720',
            textAlign: 'center',
          }}
        >
          Remark
        </div>
      ),
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      description: 'Import customs clearance fee',
      quantity: '1',
      price: '100,000,000',
      currency: 'VND',
      total: '100,000,000',
      remark: 'Additional CDS is VND 300,000',
    },
    {
      key: '2',
      description: 'Import customs clearance fee',
      quantity: '1',
      price: '100,000,000',
      currency: 'VND',
      total: '100,000,000',
      remark: 'Additional CDS is VND 300,000',
    },
    {
      key: '3',
      description: 'Import customs clearance fee',
      quantity: '1',
      price: '100,000,000',
      currency: 'VND',
      total: '100,000,000',
      remark: 'Additional CDS is VND 300,000',
    },
    {
      key: '4',
      description: 'Import customs clearance fee',
      quantity: '1',
      price: '100,000,000',
      currency: 'VND',
      total: '100,000,000',
      remark: 'Additional CDS is VND 300,000',
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#e7eeff',
            headerColor: COLORS.GREY_COLOR_HOVER,
            borderColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 0,
            borderRadiusLG: 0,
          },
          Descriptions: {
            colorTextSecondary: COLORS.GREY_COLOR_HOVER,
            colorFillAlter: '#e7eeff',
            colorSplit: '#000',
            borderRadiusLG: 0,
          },
        },
      }}
    >
      <div
        className={style.cardCustomer}
        style={{
          marginBottom: '16px',
        }}
      >
        <div
          className={style.cardCustomerHeader}
          style={{
            paddingLeft: '16px',
            backgroundColor: COLORS.GREY_COLOR_HOVER,
            border: '1px solid #1D4486',
            width: '100%',
            color: COLORS.WHITE,
            fontSize: '18px',
            fontWeight: 600,
            height: '50px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          OTHER SERVICE CHARGES (IF REQUEST)
        </div>
        <Table
          className={style.table}
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          // scroll={{
          //   x: 'max-content',
          // }}
        />
      </div>
    </ConfigProvider>
  );
}
