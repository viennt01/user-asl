import React, { useMemo } from 'react';
import { Table, ConfigProvider } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import COLORS from '@/constants/color';

export interface DataType {
  key: string;
  containerType: string;
  oceanFreight: string;
  quantity: string;
}

export interface ITypeDTOs {
  [key: string]: string;
}

const data = [
  {
    key: '1',
    containerType: `20'DC`,
    oceanFreight: '$500,000,000',
    quantity: '1',
  },
  {
    key: '2',
    containerType: `20'OT`,
    oceanFreight: '$500,000,000',
    quantity: '1',
  },
  {
    key: '3',
    containerType: `20'HC`,
    oceanFreight: '$500,000,000',
    quantity: '1',
  },
];

export default function TableContainerView() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Container Type',
      dataIndex: 'containerType',
      key: 'containerType',
      align: 'center',
    },
    {
      title: 'Ocean Freight',
      dataIndex: 'oceanFreight',
      key: 'oceanFreight',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
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
              borderColor: COLORS.BLACK
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
          bordered
          pagination={false}
          style={{marginBottom: '24px'}}
        />
      </ConfigProvider>
    </div>
  );
}
