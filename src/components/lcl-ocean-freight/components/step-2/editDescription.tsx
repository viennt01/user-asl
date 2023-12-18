import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import { Button, Col, Flex, Form, Row } from 'antd';
import COLORS from '@/constants/color';
import LocalChargesEdit from './components/edit/localChargesEdit';
import TableContainerEdit from './components/edit/input';
import { IDataBookingProps, IDataStep2Props } from '../..';
import {
  FeeTable,
  ISeaPricingDetail,
  TYPE_LOAD_CAPACITY,
} from '../../interface';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getAllLoadCapacity } from '../../fetcher';
import { API_LOAD_CAPACITY } from '@/fetcherAxios/endpoint';
import TableLoadCapacityEdit from './components/edit/tableLoadCapacityEdit';

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
  dataPropsBooking: IDataBookingProps;
  dataQuotation: ISeaPricingDetail | undefined;
  dataFeeTable: FeeTable[];
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}

const initalValue = {
  quantityPackage: '',
  gw: '',
  cbm: '',
  loadCapacityID: [],
};

export default function EditDescription({
  setDisplayStep,
  setDataPropsBooking,
  dataPropsBooking,
  dataFeeTable,
  setDataStep2PropsBooking,
  dataStep2PropsBooking,
}: Props) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [dataLoadCapacity, setDataLoadCapacity] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  useQuery({
    queryKey: [API_LOAD_CAPACITY.GET_ALL],
    queryFn: () => getAllLoadCapacity({ type: TYPE_LOAD_CAPACITY.TRUCKING }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
      } else {
        setDataLoadCapacity(
          data.data.map((item) => ({
            label: item.name,
            value: item.loadCapacityID,
          }))
        );
      }
    },
    onError: () => {
      router.back();
    },
  });

  return (
    <div className={style.description}>
      <Form
        form={form}
        initialValues={initalValue}
        layout="vertical"
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <TableContainerEdit
                  setDataStep2PropsBooking={setDataStep2PropsBooking}
                  dataLoadCapacity={dataLoadCapacity}
                  form={form}
                  dataPropsBooking={dataPropsBooking}
                />
              </Col>
              <Col span={24}>
                <TableLoadCapacityEdit
                  setDataStep2PropsBooking={setDataStep2PropsBooking}
                  dataStep2PropsBooking={dataStep2PropsBooking}
                  dataLoadCapacity={dataLoadCapacity}
                  form={form}
                  dataPropsBooking={dataPropsBooking}
                />
              </Col>
              <Col span={24}>
                <LocalChargesEdit dataFeeTable={dataFeeTable} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Flex justify="space-between">
              <Button
                style={{
                  marginRight: '8px',
                  color: COLORS.GREY_COLOR_HOVER,
                  width: '120px',
                  height: '40px',
                }}
                onClick={() => (
                  setDisplayStep(1),
                  router.push(`/lcl-ocean-freight/#headerStep`),
                  setDataPropsBooking((pre) => ({ ...pre, idQuotation: '' }))
                )}
              >
                Previous
              </Button>
              <Button
                style={{ width: '120px', height: '40px' }}
                type="primary"
                onClick={() => (
                  router.push('/lcl-ocean-freight/#headerStep'),
                  setDisplayStep(3)
                )}
              >
                Next
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
