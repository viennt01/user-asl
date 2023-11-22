import React from 'react';
import { Badge, Descriptions, Flex, Table } from 'antd';
import type { DescriptionsProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from '../index.module.scss';

interface DataType {
  key: string;
  price?: string;
}

const data: DataType[] = [
  {
    key: '1',
    price: 'VND 100,000',
  },
  {
    key: '2',
    price: 'USD 100,000',
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: <div>No.</div>,
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render: (value) => {
      return <div style={{ fontSize: '16px', fontWeight: '700' }}>{value}</div>;
    },
  },
];

const items: DescriptionsProps['items'] = [
  {
    key: '10',
    label: <Flex justify="center">Total charges</Flex>,
    children: (
      <div>
        <Table
          className={style.descriptionTable}
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          showHeader={false}
          pagination={false}
        />
      </div>
    ),
  },
];

const TotalPrice: React.FC = () => (
  <Descriptions
    className={style.description}
    style={{ width: '100%' }}
    bordered
    size="small"
    items={items}
  />
);

export default TotalPrice;
