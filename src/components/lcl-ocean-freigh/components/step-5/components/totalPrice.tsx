import React from 'react';
import { ConfigProvider, Descriptions, Flex } from 'antd';
import type { DescriptionsProps } from 'antd';
import style from '../index.module.scss';

interface DataType {
  key: string;
  price?: string;
}

const dataList = [
  {
    key: '1',
    price: 'VND 100,000',
  },
  {
    key: '2',
    price: 'USD 100,000',
  },
];

const items: DescriptionsProps['items'] = [
  {
    key: '10',
    label: (
      <Flex
        justify="center"
        style={{
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        Total charges
      </Flex>
    ),
    children: (
      <div>
        {dataList.map((data, index) => (
          <div
            style={{
              width: '100%',
              fontSize: '16px',
              fontWeight: '700',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: index === dataList.length - 1 ? 'none' : '1px solid',
            }}
          >
            {data.price}
          </div>
        ))}
      </div>
    ),
  },
];

const TotalPrice: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Descriptions: {
          padding: 0,
        },
      },
    }}
  >
    <Descriptions
      className={style.description}
      style={{ width: '100%', padding: '0px', margin: '0px' }}
      bordered
      size="small"
      items={items}
    />
  </ConfigProvider>
);

export default TotalPrice;
