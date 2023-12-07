import React, { useEffect, useState } from 'react';
import { Card, Flex, ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { formatDate } from '@/utils/format-number';
interface Props {
  dataPropsBooking: IDataBookingProps;
}
interface DataType {
  key: string;
  right: string;
  left: string;
  'Mode of transportation'?: string;
  'Port of loading'?: string;
  'Port of discharge'?: string;
  Commodity?: string;
  'Quotation no'?: string;
  Date?: string;
  'Validity to'?: string;
  'Gross weight'?: string;
  Mearsurement?: string;
  Quantity?: string;
}
export default function ShipmentDetail({ dataPropsBooking }: Props) {
  const [data, setData] = useState<DataType[]>([]);
  const [dataQuantity, setDataQuantity] = useState<string>('');
  const {
    modeOfTransportation,
    pol,
    pod,
    quotationNo,
    date,
    valitidyTo,
    commodity,
    seaBookingFCLDetailDTOs,
  } = dataPropsBooking?.detailBooking?.shipmentDetail || {};

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

  useEffect(() => {
    setDataQuantity(
      seaBookingFCLDetailDTOs
        ?.map((item) => `${item.quantity} x ${item.containerTypeCode}`)
        .join(', ') || ''
    );
    setData([
      {
        key: '1',
        right: 'Mode of transportation',
        'Mode of transportation': modeOfTransportation || '',
        left: 'Quotation no',
        'Quotation no': quotationNo || '',
      },
      {
        key: '2',
        right: 'Port of loading',
        'Port of loading': pol || '',
        left: 'Date',
        Date: formatDate(Number(date)) || '',
      },
      {
        key: '3',
        right: 'Port of discharge',
        'Port of discharge': pod || '',
        left: 'Validity to',
        'Validity to': formatDate(Number(valitidyTo)) || '',
      },
      {
        key: '4',
        right: 'Commodity',
        Commodity: commodity || '',
        left: 'Gross weight',
        'Gross weight': '',
      },
      {
        key: '5',
        right: 'Mearsurement',
        Mearsurement: '',
        left: 'Quantity',
        Quantity: dataQuantity || '',
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
