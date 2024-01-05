import React from 'react';
import { ConfigProvider, Descriptions, Flex, Table } from 'antd';
import type { DescriptionsProps } from 'antd';
import style from '../index.module.scss';
import { formatCurrencyHasCurrency } from '@/utils/format-number';

interface Props {
  dataToTalPrice: DataTypeTotalPrice[];
}

export interface DataTypeTotalPrice {
  key: number;
  price?: string;
}

const TotalPrice = ({ dataToTalPrice }: Props) => {
  const totalPrice = [
    { key: 1, price: '100000 VND' },
    { key: 2, price: '100000 USD' },
  ];
  const items: DescriptionsProps['items'] = [
    {
      key: '10',
      span: 0,
      contentStyle: { width: '627px'}, // tổng px ở table
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
          {totalPrice?.map((data, index) => (
            <div
              style={{
                fontSize: '16px',
                fontWeight: '700',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom:
                  index === totalPrice.length - 1 ? 'none' : '1px solid',
              }}
            >
              {formatCurrencyHasCurrency(data.price || '0')}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
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
        // className={style.description}
        style={{ width: '100%', padding: '0px', margin: '0px' }}
        bordered
        size="small"
        items={items}
      />
    </ConfigProvider>
  );
};

export default TotalPrice;
