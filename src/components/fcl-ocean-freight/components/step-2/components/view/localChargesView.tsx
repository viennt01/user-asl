import React, { useMemo } from 'react';
import { Table, ConfigProvider } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import COLORS from '@/constants/color';

export interface DataType {
  key: string;
  chargeType: string;
  unit: string;
  dc: string;
  ot: string;
  hc: string;
  currency: string;
}

export interface ITypeDTOs {
  [key: string]: string;
}

const data = [
  {
    key: '1',
    chargeType: `HSS`,
    unit: '$500,000,000',
    dc: '1',
    ot: '1',
    hc: '1',
    currency: 'VND',
  },
  {
    key: '2',
    chargeType: `HSS`,
    unit: '$500,000,000',
    dc: '1',
    ot: '1',
    hc: '1',
    currency: 'VND',
  },
  {
    key: '3',
    chargeType: `HSS`,
    unit: '$500,000,000',
    dc: '1',
    ot: '1',
    hc: '1',
    currency: 'VND',
  },
];

export default function LocalChargesView() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Charge Type',
      dataIndex: 'chargeType',
      key: 'chargeType',
      align: 'center',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      align: 'center',
    },
    {
      title: '20’ DC',
      dataIndex: 'dc',
      key: 'dc',
      align: 'center',
    },
    {
      title: '20’ OT',
      dataIndex: 'ot',
      key: 'ot',
      align: 'center',
    },
    {
      title: `40’ HC`,
      dataIndex: 'hc',
      key: 'hc',
      align: 'center',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      align: 'center',
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: COLORS.GREY_COLOR_HOVER,
              headerColor: COLORS.WHITE,
              borderColor: COLORS.BLACK,
            },
          },
        }}
      >
        <Table
          scroll={{
            x: 'max-content',
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          style={{ marginBottom: '24px' }}
        />
      </ConfigProvider>
    </div>
  );
}
