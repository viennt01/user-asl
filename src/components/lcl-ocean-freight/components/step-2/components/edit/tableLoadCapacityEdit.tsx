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
import { IDataStep2Props } from '@/components/lcl-ocean-freight';
export interface IQuantity {
  loadCapacityID: string;
  quantity: string;
}

interface Props {
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
  dataStep2PropsBooking: IDataStep2Props | undefined;
  dataLoadCapacity: {
    label: string;
    value: string;
  }[];
  form: FormInstance<any>;
}

export interface DataType {
  key: string;
  loadCapacityID: string;
  quantity: string;
}

export interface ITypeDTOs {
  [key: string]: string;
}

export default function TableLoadCapacityEdit({
  setDataStep2PropsBooking,
  dataStep2PropsBooking,
  dataLoadCapacity,
  form,
}: Props) {
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const inputRefs = useRef<Array<React.MutableRefObject<any>>>([]);
  const loadCapacityID = Form.useWatch('loadCapacityID', form);
  // Thêm useEffect để khởi tạo mảng tham chiếu
  useEffect(() => {
    inputRefs.current = Array(dataTable.length)
      .fill(0)
      .map((_, index) => inputRefs.current[index] || createRef());
  }, [dataTable.length]);

  const save = (value: DataType, inputRef: React.MutableRefObject<any>) => {
    const filteredArray =
      dataStep2PropsBooking?.listQuantityTypeLoadCapacity?.filter(
        (item) => item.loadCapacityID !== value.loadCapacityID
      ) || [];
    const newData = [
      {
        quantity: inputRef?.current?.value || 1,
        loadCapacityID: value.loadCapacityID,
      },
    ];
    setDataStep2PropsBooking((pre) => ({
      ...pre,
      listQuantityTypeLoadCapacity: [...filteredArray, ...newData],
    }));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Flex align="center" justify="center">
          Load Capacity
        </Flex>
      ),
      dataIndex: 'loadCapacityID',
      key: 'loadCapacityID',
      align: 'left',
      render: (value) => {
        return dataLoadCapacity.find((item) => item.value === value)?.label;
      },
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
    setDataTable(
      loadCapacityID?.map((item: string, index: number) => ({
        loadCapacityID: item,
        quantity: '1',
        key: (index + 1).toString(),
      })) || []
    );
  }, [loadCapacityID]);

  useEffect(() => {
    setDataStep2PropsBooking((pre) => ({
      ...pre,
      listQuantityTypeLoadCapacity: dataTable.map((itemA) => {
        return {
          loadCapacityID: itemA.loadCapacityID,
          quantity: itemA.quantity,
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
