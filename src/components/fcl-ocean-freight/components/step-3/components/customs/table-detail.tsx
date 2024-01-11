import React from 'react';
import { Typography, Table } from 'antd';

import { ICustomQuotationFCLDetailForBookings } from '@/components/fcl-ocean-freight/interface';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatNumber } from '@/utils/format-number';

const { Text } = Typography;

interface Props {
  dataFeeDetail: ICustomQuotationFCLDetailForBookings[];
}

export default function CustomsDetail({ dataFeeDetail }: Props) {
  const columns: ColumnsType<ICustomQuotationFCLDetailForBookings> = [
    {
      title: 'Unit',
      dataIndex: 'internationalCode',
      align: 'center',
      render: (value) => {
        return <div>{value ? value : '-'}</div>;
      },
    },
    {
      title: <Text style={{ color: 'green' }}>Base Green Router</Text>,
      dataIndex: 'basePriceGreenLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <Text style={{ color: '#d4b106' }}>Base Yellow Router</Text>,
      dataIndex: 'basePriceYellowLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <Text style={{ color: '#cf1322' }}>Base Red Router</Text>,
      dataIndex: 'basePriceRedLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: (
        <Text color={'green'} style={{ color: 'green' }}>
          Green Router
        </Text>
      ),
      dataIndex: 'priceGreenLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <Text style={{ color: '#d4b106' }}>Yellow Router</Text>,
      dataIndex: 'priceYellowLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <Text style={{ color: '#cf1322' }}>Red Router</Text>,
      dataIndex: 'priceRedLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
  ];

  return (
    <Table
      scroll={{
        x: 'max-content',
      }}
      style={{ width: '100%' }}
      columns={columns}
      dataSource={dataFeeDetail || []}
      pagination={false}
    />
  );
}
