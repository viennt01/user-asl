import React, { useEffect, useState } from 'react';
import { ConfigProvider, Descriptions, Flex } from 'antd';
import type { DescriptionsProps } from 'antd';
import style from '../index.module.scss';
import { formatCurrencyHasCurrency } from '@/utils/format-number';
import { TYPE_TABLE } from '../interface';

interface Props {
  dataToTalPrice: DataTypeTotalPrice[];
  typeTable: TYPE_TABLE;
}

export interface DataTypeTotalPrice {
  key: number;
  price?: string;
}

const TotalPrice = ({ dataToTalPrice, typeTable }: Props) => {
  const [widthContentStyle, setWidthContentStyle] = useState<string>('200px');
  useEffect(() => {
    if (typeTable) {
      switch (typeTable) {
        case TYPE_TABLE.FREIGHT_CHARGES:
          setWidthContentStyle('200px');
          break;
        case TYPE_TABLE.OTHER_CHARGES:
          setWidthContentStyle('200px');
          break;
        default:
          setWidthContentStyle('200px');
          break;
      }
    }
  }, [typeTable]);
  const items: DescriptionsProps['items'] = [
    {
      key: '10',
      span: 0,
      contentStyle: { width: widthContentStyle }, // tổng px ở table
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
          {dataToTalPrice?.map((data, index) => (
            <div
              style={{
                width: '100%',
                fontSize: '16px',
                fontWeight: '700',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom:
                  index === dataToTalPrice.length - 1 ? 'none' : '1px solid',
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
        className={style.description}
        style={{ width: '100%', padding: '0px', margin: '0px' }}
        bordered
        size="small"
        items={items}
      />
    </ConfigProvider>
  );
};

export default TotalPrice;
