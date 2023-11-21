import React, {
  MutableRefObject,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Table, ConfigProvider, Input, InputNumber } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import COLORS from '@/constants/color';

export interface DataType {
  key: string;
  containerType: string;
  oceanFreight: string;
  quantity: number;
}

export interface ITypeDTOs {
  [key: string]: string;
}

export interface IQuantity {
  key: string;
  quantity: number;
}

const data = [
  {
    key: '1',
    containerType: `20'DC`,
    oceanFreight: '$500,000,000',
    quantity: 1,
  },
  {
    key: '2',
    containerType: `20'OT`,
    oceanFreight: '$500,000,000',
    quantity: 1,
  },
  {
    key: '3',
    containerType: `20'HC`,
    oceanFreight: '$500,000,000',
    quantity: 1,
  },
];

export default function TableContainerEdit() {
  const inputRef = useRef();
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const [dataQuantity, setDataQuantity] = useState<IQuantity[]>([]);
  const save = (value: DataType, inputRef: React.MutableRefObject<any>) => {
    const filteredArray = dataQuantity.filter((item) => item.key !== value.key);
    const newData = [
      {
        key: value.key,
        quantity: inputRef?.current?.value || 1,
      },
    ];
    setDataQuantity([...filteredArray, ...newData]);
  };
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
      render: (_, recode) => {
        return (
          <InputNumber
            ref={inputRef as unknown as Ref<HTMLInputElement>}
            defaultValue={1}
            onPressEnter={() => save(recode, inputRef)}
            onBlur={() => save(recode, inputRef)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    setDataTable(data);
    setDataQuantity(
      data.map((value) => {
        return {
          key: value.key,
          quantity: value.quantity,
        };
      })
    );
  }, [data]);
  console.log(dataQuantity);

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
          dataSource={dataTable}
          bordered
          pagination={false}
          style={{ marginBottom: '24px' }}
        />
      </ConfigProvider>
    </div>
  );
}
