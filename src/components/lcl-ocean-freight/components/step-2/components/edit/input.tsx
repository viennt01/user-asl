import React, { useEffect, useState } from 'react';
import { InputNumber, Row, Col, Form, Select, FormInstance } from 'antd';
import {
  IDataBookingProps,
  IDataStep2Props,
} from '@/components/lcl-ocean-freight';
import { useQuery } from '@tanstack/react-query';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import { getListTypeUnit } from '@/components/fcl-ocean-freight/fetcher';
import { TYPE_UNIT } from '@/components/fcl-ocean-freight/interface';

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
}

export default function TableContainerEdit({
  setDataStep2PropsBooking,
  dataLoadCapacity,
  form,
  dataPropsBooking,
}: Props) {
  const [dataUnit, setDataUnit] = useState<{ label: string; value: string }[]>(
    []
  );

  const packageID = Form.useWatch('packageID', form);
  const quantityPackage = Form.useWatch('quantityPackage', form);
  const gw = Form.useWatch('gw', form);
  const cbm = Form.useWatch('cbm', form);
  const loadCapacityID = Form.useWatch('loadCapacityID', form);

  useEffect(() => {
    setDataStep2PropsBooking((pre) => ({
      ...pre,
      packageBookingLCLDetail: {
        packageID: packageID,
        quantityPackage: quantityPackage,
        gw: gw,
        cbm: cbm,
        loadcapacity: [loadCapacityID],
      },
    }));
  }, [packageID, quantityPackage, gw, cbm, loadCapacityID]);

  useQuery({
    queryKey: [API_UNIT.GET_ALL],
    queryFn: () => getListTypeUnit({ typeUnit: TYPE_UNIT.SEA }),
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
              min={0}
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

        <Col
          span={
            dataPropsBooking?.step1?.trafficPol?.name === 'DOOR' ||
            dataPropsBooking?.step1?.trafficPod?.name === 'DOOR'
              ? 12
              : 0
          }
        >
          <Form.Item
            label={'Load Capacity'}
            name="loadCapacityID"
            rules={[
              {
                required: true,
                message: 'Please select Load Capacity',
              },
            ]}
          >
            <Select
              placeholder="Please select Load Capacity"
              showSearch
              // mode="multiple"
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
              options={dataLoadCapacity || []}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
