import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  Table,
  ConfigProvider,
  InputNumber,
  Flex,
  FormInstance,
  Form,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import COLORS from '@/constants/color';
import { IDataBookingProps, IDataStep2Props } from '@/components/air-freight';

interface Props {
  dataPropsBooking: IDataBookingProps;
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
  dataStep2PropsBooking: IDataStep2Props | undefined;
  form: FormInstance<any>;
  dataLoadCapacity: {
    label: string;
    value: string;
  }[];
}

export interface DataType {
  key: string;
  containerType: string;
  quantity: string;
}

export interface ITypeDTOs {
  [key: string]: string;
}

export default function TableLoadCapacityEdit({
  dataPropsBooking,
  setDataStep2PropsBooking,
  dataStep2PropsBooking,
  form,
  dataLoadCapacity,
}: Props) {
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const inputRefs = useRef<Array<React.MutableRefObject<any>>>([]);
  const loadCapacityID = Form.useWatch('loadCapacityID', form);

  useEffect(() => {
    setDataTable([
      {
        containerType:
          dataLoadCapacity?.find((item) => item.value === loadCapacityID)
            ?.label || '',
        quantity: '1',
        key: loadCapacityID,
      },
    ]);
  }, [loadCapacityID]);
  console.log('dataTable', dataTable);

  // Thêm useEffect để khởi tạo mảng tham chiếu
  useEffect(() => {
    inputRefs.current = Array(dataTable?.length)
      .fill(0)
      .map((_, index) => inputRefs.current[index] || createRef());
  }, [dataTable?.length]);

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
          Load Capacity
        </Flex>
      ),
      dataIndex: 'containerType',
      width: '50%',
      key: 'containerType',
      align: 'left',
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
            size="large"
            style={{ width: '100%' }}
            ref={inputRef}
            defaultValue={1}
            min={1}
            onPressEnter={() => save(recode, inputRef)}
            onBlur={() => save(recode, inputRef)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    setDataStep2PropsBooking((pre) => ({
      ...pre,
      listQuantityType: dataTable?.map((itemA) => {
        const matchedContainer = dataPropsBooking?.listContainerType?.find(
          (itemB) => itemB.label === itemA.containerType
        );
        console.log('matchedContainer', matchedContainer);

        return {
          key: itemA?.key || '', // ID của container từ mảng B
          name: itemA.containerType,
          quantity: itemA.quantity, // Số lượng từ mảng A
        };
      }),
    }));
  }, [dataTable, loadCapacityID]);

  return (
    <div
      style={{
        display: loadCapacityID ? '' : 'none',
      }}
    >
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
