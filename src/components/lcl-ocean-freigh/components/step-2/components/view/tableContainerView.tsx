import React, { useMemo } from 'react';
import { Table, ConfigProvider } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import COLORS from '@/constants/color';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { ISeaPricingDetail } from '@/components/fcl-ocean-freight/interface';
import { formatCurrencyHasCurrency } from '@/utils/format-number';

interface Props {
  dataPropsBooking: IDataBookingProps;
}

export interface DataType {
  key: string;
  containerType: string;
  oceanFreight: string;
  quantity: string;
}

export interface ITypeDTOs {
  [key: string]: string;
}

export default function TableContainerView({ dataPropsBooking }: Props) {
  const data =
    Object.entries(
      dataPropsBooking?.dataColTableStep1?.seaQuotationDetailDTOs || {}
    )?.map(([containerType, oceanFreight], index) => ({
      containerType,
      oceanFreight,
      quantity: '1',
      key: (index + 1).toString(),
    })) || [];

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
      render: (value) => formatCurrencyHasCurrency(value),
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
          bordered
          pagination={false}
          style={{ marginBottom: '24px' }}
        />
      </ConfigProvider>
    </div>
  );
}
