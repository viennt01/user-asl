import React, { useEffect, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import COLORS from '@/constants/color';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { formatNumber } from '@/utils/format-number';
import TotalPrice, { DataTypeTotalPrice } from './totalPrice';
import { IDetailBooking } from '../interface';

interface Props {
  dataPropsBooking: IDetailBooking | undefined;
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
  const [dataToTalPrice, setDataTotalPrice] = useState<DataTypeTotalPrice[]>(
    []
  );
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
      align: 'right',
      render: (value) => {
        return value ? value : '-';
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
          Price
        </div>
      ),
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (value) => {
        return value ? formatNumber(value) : '-';
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
          Currency
        </div>
      ),
      dataIndex: 'currency',
      key: 'currency',
      render: (value) => {
        return value ? value : '-';
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
          VAT
        </div>
      ),
      dataIndex: 'vat',
      key: 'vat',
      align: 'right',
      render: (value) => {
        return value ? value : '-';
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
          Total Amount
        </div>
      ),
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
  ];

  useEffect(() => {
    setData(
      dataPropsBooking?.airQuotationSelected.ortherChargeDetailForBookings.map(
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

  useEffect(() => {
    setDataTotalPrice(
      dataPropsBooking?.airQuotationSelected?.sumOrtherChargeDetailForBooking?.map(
        (item, index) => ({
          key: index,
          price: `${item.item2} ${item.item1}`,
        })
      ) || []
    );
  }, [dataPropsBooking]);

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
          display: data.length === 0 ? 'none' : '',
        }}
      >
        <div
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
          Other charges
        </div>
        <Table
          className={style.table}
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
        <TotalPrice dataToTalPrice={dataToTalPrice} />
      </div>
    </ConfigProvider>
  );
}