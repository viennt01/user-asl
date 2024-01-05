import React, { useEffect, useState } from 'react';
import { InputNumber, Row, Col, Form, Select, FormInstance } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import { getListTypeUnit } from '@/components/fcl-ocean-freight/fetcher';
import { TYPE_UNIT } from '@/components/fcl-ocean-freight/interface';
import {
  IDataBookingProps,
  IDataStep2Props,
} from '@/components/ltl-truck-freight';
import TableLoadCapacityEdit from './tableLoadCapacity';

interface Props {
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
  dataLoadCapacity: {
    label: string;
    value: string;
  }[];
  form: FormInstance<any>;
  dataPropsBooking: IDataBookingProps;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}

export default function TableContainerEdit({
  setDataStep2PropsBooking,
  dataLoadCapacity,
  form,
  dataPropsBooking,
  dataStep2PropsBooking,
}: Props) {
  const [dataUnit, setDataUnit] = useState<{ label: string; value: string }[]>(
    []
  );

  const packageID = Form.useWatch('packageID', form);
  const quantityPackage = Form.useWatch('quantityPackage', form);
  const gw = Form.useWatch('gw', form);
  const cbm = Form.useWatch('cbm', form);

  useEffect(() => {
    setDataStep2PropsBooking((pre) => ({
      ...pre,
      packageBookingLCLDetail: {
        packageID: packageID,
        quantityPackage: quantityPackage,
        gw: gw,
        cbm: cbm,
      },
    }));
  }, [packageID, quantityPackage, gw, cbm]);

  useQuery({
    queryKey: [API_UNIT.GET_ALL],
    queryFn: () => getListTypeUnit({ typeUnit: TYPE_UNIT.TRUCKING }),
    onSuccess: (data) => {
      if (data.status) {
        const newData = data.data.map((unit) => ({
          label: unit.internationalCode,
          value: unit.unitID,
        }));
        setDataUnit(newData);
      }
    },
  });

  return (
    <div
      style={{
        color: '#000',
        borderRadius: '12px',
        background: '#eee',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        padding: '16px',
        marginBottom: '16px',
      }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label={'Package'}
            name="packageID"
            rules={[
              {
                required: true,
                message: 'Please select package',
              },
            ]}
          >
            <Select
              placeholder="Please select package"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              size="large"
              options={dataUnit || []}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={'Quantity Package'}
            name="quantityPackage"
            rules={[
              {
                required: true,
                message: 'Please enter quantity package',
              },
            ]}
          >
            <InputNumber
              placeholder="Please enter quantity package"
              style={{ width: '100%' }}
              min={1}
              size="large"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={'CBM'}
            name="cbm"
            rules={[
              {
                required: true,
                message: 'Please enter CBM',
              },
            ]}
          >
            <InputNumber
              placeholder="Please enter CBM"
              style={{ width: '100%' }}
              min={0}
              size="large"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={'GW'}
            name="gw"
            rules={[
              {
                required: true,
                message: 'Please enter GW',
              },
            ]}
          >
            <InputNumber
              placeholder="Please enter GW"
              style={{ width: '100%' }}
              min={0}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
      <TableLoadCapacityEdit
        dataPropsBooking={dataPropsBooking}
        setDataStep2PropsBooking={setDataStep2PropsBooking}
        dataStep2PropsBooking={dataStep2PropsBooking}
      />
    </div>
  );
}
