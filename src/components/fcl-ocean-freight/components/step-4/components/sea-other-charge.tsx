import React, { useEffect, useState } from 'react';
import { Card, ConfigProvider, Table } from 'antd';
import COLORS from '@/constants/color';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import TotalPrice from './totalPrice';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { formatNumber } from '@/utils/format-number';

interface Props {
  dataPropsBooking: IDataBookingProps;
}
interface DataType {
  key: number;
  description: string;
  quantity: string;
  price: string;
  currency: string;
  vat: string;
  total: string;
}
export default function SeaOtherCharges({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
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
    },
    {
      title: <div className={style.titleTable}>Price</div>,
      dataIndex: 'price',
      key: 'price',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
    {
      title: <div className={style.titleTable}>Currency</div>,
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: <div className={style.titleTable}>VAT</div>,
      dataIndex: 'vat',
      key: 'vat',
    },
    {
      title: <div className={style.titleTable}>Total Amount</div>,
      dataIndex: 'total',
      key: 'total',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
  ];

  useEffect(() => {
    setData(
      dataPropsBooking?.detailBooking?.seaQuotationBooking.ortherChargeDetailForBookings.map(
        (item, index) => ({
          key: index,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          currency: item.currency,
          vat: item.vat,
          total: item.totalAmount,
        })
      ) || []
    );
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
        title="Sea other Charges"
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
          scroll={{
            x: 'max-content',
          }}
        />
        <TotalPrice />
      </Card>
    </ConfigProvider>
  );
}
