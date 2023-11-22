import React from 'react';
import { Card, ConfigProvider, Table } from 'antd';
import COLORS from '@/constants/color';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import TotalPrice from './totalPrice';

export default function QuotationDetail() {
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
      title: <div className={style.titleTable}>No.</div>,
      dataIndex: 'index',
      width: 50,
      align: 'center',
      fixed: 'right',
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: <div className={style.titleTable}>Description of charges</div>,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <div className={style.titleTable}>Quantity</div>,
      dataIndex: 'quantity',
      key: 'quantity',
      // onCell: sharedOnCell,
    },
    {
      title: <div className={style.titleTable}>Price</div>,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: <div className={style.titleTable}>Currency</div>,
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: <div className={style.titleTable}>Total Amount</div>,
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: <div className={style.titleTable}>Remark</div>,
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
    {
      key: '4',
    },
    {
      key: '5',
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
      <Card
        title="Quotation details"
        style={{ width: '100%' }}
        className={style.cardCustomer}
      >
        <Table
          className={style.table}
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
        <TotalPrice />
      </Card>
    </ConfigProvider>
  );
}
