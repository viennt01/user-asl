import React from 'react';
import { Flex, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from '@/utils/format-number';
import { IFclTruckingQuotationDetails } from '@/components/fcl-ocean-freight/interface';
interface Props {
  lclTruckingQuotationDetails: IFclTruckingQuotationDetails[];
  abbreviations: string;
}

export default function DetailTrucking({
  lclTruckingQuotationDetails,
  abbreviations,
}: Props) {
  const columns: ColumnsType<IFclTruckingQuotationDetails> = [
    {
      title: (
        <Flex align="center" justify="center">
          Container type
        </Flex>
      ),
      dataIndex: 'containerTypeCode',
      key: 'containerTypeCode',
    },
    {
      title: (
        <Flex align="center" justify="center">
          Price
        </Flex>
      ),
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (value) => {
        return (
          <Tag color="#F2F48E" style={{ color: '#000', fontWeight: '450' }}>
            {value ? `${formatNumber(value)} ${abbreviations}` : '-'}
          </Tag>
        );
      },
    },
    {
      title: (
        <Flex align="center" justify="center">
          VAT
        </Flex>
      ),
      dataIndex: 'vat',
      key: 'vat',
      align: 'right',
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
  ];

  return (
    <Flex
      style={{
        padding: '0 8px',
      }}
    >
      <div
        style={{
          width: '100%',
          display: lclTruckingQuotationDetails ? '' : 'none',
        }}
      >
        <Table
          scroll={{
            x: 'max-content',
          }}
          columns={columns}
          dataSource={lclTruckingQuotationDetails || []}
          pagination={false}
        />
      </div>
    </Flex>
  );
}
