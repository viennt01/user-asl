import React, { useEffect, useState } from 'react';
import { InputNumber, Row, Col, Form, Select } from 'antd';
import { IDataStep2Props } from '@/components/lcl-ocean-freight';
import { useQuery } from '@tanstack/react-query';
import { API_UNIT } from '@/fetcherAxios/endpoint';
import { getListTypeUnit } from '@/components/fcl-ocean-freight/fetcher';
import { TYPE_UNIT } from '@/components/fcl-ocean-freight/interface';

interface Props {
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
}

const initalValue = {
  quantityPackage: '',
  gw: '',
  cbm: '',
};

export default function TableContainerEdit({
  setDataStep2PropsBooking,
}: Props) {
  const [form] = Form.useForm();
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
      <Form
        form={form}
        initialValues={initalValue}
        layout="vertical"
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={'Package'} name="packageID">
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
            <Form.Item label={'Quantity Package'} name="quantityPackage">
              <InputNumber
                placeholder="Please enter quantity package"
                style={{ width: '100%' }}
                min={0}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'CBM'} name="cbm">
              <InputNumber
                placeholder="Please enter CBM"
                style={{ width: '100%' }}
                min={0}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'GW'} name="gw">
              <InputNumber
                placeholder="Please enter GW"
                style={{ width: '100%' }}
                min={0}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
