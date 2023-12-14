import React, { useEffect, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import COLORS from '@/constants/color';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { formatNumber } from '@/utils/format-number';

interface Props {
  dataPropsBooking: IDataBookingProps;
}
interface DataType {
  key: number;
  basePriceRedLane: string;
  basePriceYellowLane: string;
  basePriceGreenLane: string;
  priceRedLane: string;
  priceYellowLane: string;
  priceGreenLane: string;
  vat: string;
  unit: string;
  quantity: string;
  totalRedLane: string;
  totalYellowLane: string;
  totalGreenLane: string;
}

export default function CustomsQuotationPOL({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);

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
          Unit
        </div>
      ),
      dataIndex: 'unit',
      key: 'unit',
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
          VAT
        </div>
      ),
      dataIndex: 'vat',
      key: 'vat',
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
          Base Green Lane
        </div>
      ),
      dataIndex: 'basePriceGreenLane',
      key: 'basePriceGreenLane',
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
          Base Yellow Lane
        </div>
      ),
      dataIndex: 'basePriceYellowLane',
      key: 'basePriceYellowLane',
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
          Base Red Lane
        </div>
      ),
      dataIndex: 'basePriceRedLane',
      key: 'basePriceRedLane',
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
          Green Lane
        </div>
      ),
      dataIndex: 'priceGreenLane',
      key: 'priceGreenLane',
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
          Yellow Lane
        </div>
      ),
      dataIndex: 'priceYellowLane',
      key: 'priceYellowLane',
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
          Red Lane
        </div>
      ),
      dataIndex: 'priceRedLane',
      key: 'priceRedLane',
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
          Total Green Lane
        </div>
      ),
      dataIndex: 'totalGreenLane',
      key: 'totalGreenLane',
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
          Total Yellow Lane
        </div>
      ),
      dataIndex: 'totalYellowLane',
      key: 'totalYellowLane',
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
         Total Red Lane
        </div>
      ),
      dataIndex: 'totalGreenLane',
      key: 'totalGreenLane',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
  ];

  useEffect(() => {
    setData(
      dataPropsBooking?.detailBooking?.customQuotationPOLSelected?.customQuotationFCLDetailSelecteds?.map(
        (item, index) => ({
          key: index,
          basePriceRedLane: item.basePriceRedLane,
          basePriceYellowLane: item.basePriceYellowLane,
          basePriceGreenLane: item.basePriceGreenLane,
          priceRedLane: item.priceRedLane,
          priceYellowLane: item.priceYellowLane,
          priceGreenLane: item.priceGreenLane,
          vat: item.vat,
          unit: item.unit,
          quantity: item.quantity,
          totalRedLane: item.totalRedLane,
          totalYellowLane: item.totalYellowLane,
          totalGreenLane: item.totalGreenLane,
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
          Customs service (ORIGIN)
        </div>
        <Table
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          scroll={{
            x: 'max-content',
          }}
        />
      </div>
    </ConfigProvider>
  );
}
