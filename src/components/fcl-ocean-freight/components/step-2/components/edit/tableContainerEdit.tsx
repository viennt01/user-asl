import React, {
  MutableRefObject,
  Ref,
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Table, ConfigProvider, InputNumber, Flex } from 'antd';
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
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const [dataTableS, setDataTableS] = useState<DataType[]>([]);
  const inputRefs = useRef<Array<React.MutableRefObject<any>>>([]);

  const data =
    Object.entries(
      dataPropsBooking?.dataColTableStep1?.seaQuotationDetailDTOs || {}
    )?.map(([containerType, oceanFreight], index) => ({
      containerType,
      oceanFreight,
      quantity: '1',
      key: (index + 1).toString(),
    })) || [];

  // Thêm useEffect để khởi tạo mảng tham chiếu
  useEffect(() => {
    inputRefs.current = Array(data.length)
      .fill(0)
      .map((_, index) => inputRefs.current[index] || createRef());
  }, [data.length]);

  const save = (value: DataType, inputRef: React.MutableRefObject<any>) => {
    const filteredArray =
      dataStep2PropsBooking?.listQuantityType?.filter(
        (item) => item.key !== value.key
      ) || [];
    const newData = [
      {
        key: value.key,
        quantity: inputRef?.current?.value || 1,
        name: value.containerType,
      },
    ];
    setDataStep2PropsBooking((pre) => ({
      ...pre,
      listQuantityType: [...filteredArray, ...newData],
    }));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Flex align="center" justify="center">
          Container Type
        </Flex>
      ),
      dataIndex: 'containerType',
      key: 'containerType',
      align: 'left',
    },
    {
      title: (
        <Flex align="center" justify="center">
          Ocean Freight
        </Flex>
      ),
      dataIndex: 'oceanFreight',
      key: 'oceanFreight',
      align: 'right',
      render: (value) => formatCurrencyHasCurrency(value),
    },
    {
      title: (
        <Flex align="center" justify="center">
          Quantity
        </Flex>
      ),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      render: (_, recode, index) => {
        const inputRef = inputRefs.current[index];
        return (
          <InputNumber
            ref={inputRef}
            defaultValue={0}
            min={0}
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
    setDataTable(dataTableS.filter((item) => item.oceanFreight !== ''));
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
          name: itemA.containerType,
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
