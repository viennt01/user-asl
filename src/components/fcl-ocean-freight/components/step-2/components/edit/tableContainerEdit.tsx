import React, {
  MutableRefObject,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Table, ConfigProvider, InputNumber } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import COLORS from '@/constants/color';
import {
  IDataBookingProps,
  IDataStep2Props,
} from '@/components/fcl-ocean-freight';
import { formatCurrencyHasCurrency } from '@/utils/format-number';

interface Props {
  dataPropsBooking: IDataBookingProps;
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
  dataStep2PropsBooking: IDataStep2Props | undefined;
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

export default function TableContainerEdit({
  dataPropsBooking,
  setDataStep2PropsBooking,
  dataStep2PropsBooking,
}: Props) {
  const inputRef = useRef();
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const [dataTableS, setDataTableS] = useState<DataType[]>([]);

  const data =
    Object.entries(
      dataPropsBooking?.dataColTableStep1?.seaQuotationDetailDTOs || {}
    )?.map(([containerType, oceanFreight], index) => ({
      containerType,
      oceanFreight,
      quantity: '1',
      key: (index + 1).toString(),
    })) || [];

  const save = (value: DataType, inputRef: React.MutableRefObject<any>) => {
    const filteredArray =
      dataStep2PropsBooking?.listQuantityType?.filter(
        (item) => item.key !== value.key
      ) || [];
    const newData = [
      {
        key: value.key,
        quantity: inputRef?.current?.value || 1,
      },
    ];
    setDataStep2PropsBooking((pre) => ({
      ...pre,
      listQuantityType: [...filteredArray, ...newData],
    }));
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
      render: (value) => formatCurrencyHasCurrency(value),
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
    setDataTableS(
      data.map((itemC) => {
        const matchedContainer = dataPropsBooking?.listContainerType?.find(
          (itemB) => itemB.label === itemC.containerType
        );
        return {
          ...itemC,
          key: matchedContainer?.value || '', // Sử dụng ID của container từ mảng B làm key
        };
      })
    );
  }, [dataPropsBooking]);

  useEffect(() => {
    setDataTable(dataTableS);
  }, [dataTableS]);

  useEffect(() => {
    setDataStep2PropsBooking((pre) => ({
      ...pre,
      listQuantityType: dataTable.map((itemA) => {
        const matchedContainer = dataPropsBooking?.listContainerType?.find(
          (itemB) => itemB.label === itemA.containerType
        );
        return {
          key: matchedContainer?.value || '', // ID của container từ mảng B
          quantity: itemA.quantity, // Số lượng từ mảng A
        };
      }),
    }));
  }, [dataTable]);

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
