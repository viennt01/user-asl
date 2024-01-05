import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Col, Flex, Form, Row } from 'antd';
import COLORS from '@/constants/color';
import LocalChargesEdit from './components/localCharges';
import TableContainerEdit from './components/tableContainer';
import { IDataBookingProps, IDataStep2Props } from '../..';
import { IBooking, IQuotationDetail } from '../../interface';
import { useRouter } from 'next/router';
import {
  FeeTable,
  TYPE_LOAD_CAPACITY,
} from '@/components/fcl-ocean-freight/interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createBooking } from '../../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { API_LOAD_CAPACITY } from '@/fetcherAxios/endpoint';
import { getAllLoadCapacity } from '@/components/fcl-ocean-freight/fetcher';
import { TYPE_SERVICE } from '@/components/history-booking/interface';

const initalValue = {
  quantityPackage: '',
  gw: '',
  cbm: '',
  loadCapacityID: [],
};

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
  dataPropsBooking: IDataBookingProps;
  dataQuotation: IQuotationDetail | undefined;
  dataFeeTable: FeeTable[];
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}

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

  const createBookingMutation = useMutation({
    mutationFn: (body: IBooking) => {
      return createBooking(body);
    },
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        setDataPropsBooking((pre) => ({ ...pre, idBooking: data.data || '' }));
        setDisplayStep(4);
      }
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const submitBooking = () => {
    const _requestData = {
      truckingQuotationID: dataPropsBooking.idQuotation,
      podid: dataPropsBooking.dataQuotation?.pickupID || '',
      polid: dataPropsBooking.dataQuotation?.deliveryID || '',
      typeSeaService: TYPE_SERVICE.LTL,
      typeOfService: 'TRUCK',
      placeOfRecipt: dataPropsBooking.step1?.receipt || '',
      placeOfDelivery: dataPropsBooking.step1?.delivery || '',
      currencyID: dataPropsBooking.dataQuotation?.currencyID || '',
      commodityID: dataPropsBooking.dataQuotation?.commodityID || '',
      cargoReadyDated: dataPropsBooking.step1?.cargoReady?.valueOf() || 1,
      cargoCutOffDated:
        dataPropsBooking.step1?.cargoCutOffDated?.valueOf() || 1,
      note: '',
      statusBooking: 'DRAFT',
      isManualBooking: false,
      truckBookingLCLDetailRegisterRequest: {
        packageID:
          dataStep2PropsBooking?.packageBookingLCLDetail?.packageID || '',
        quantityPackage:
          dataStep2PropsBooking?.packageBookingLCLDetail?.quantityPackage || '',
        loadCapacityID: dataStep2PropsBooking?.listQuantityType?.[0]?.key || '',
        quantityLoadCapacity:
          dataStep2PropsBooking?.listQuantityType?.[0]?.quantity || '1',
        gw: dataStep2PropsBooking?.packageBookingLCLDetail?.gw || '',
        cbm: dataStep2PropsBooking?.packageBookingLCLDetail?.cbm || '',
      },
    };
    createBookingMutation.mutate(_requestData);
  };

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
                  dataStep2PropsBooking={dataStep2PropsBooking}
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
                  router.push('/ltl-truck-freight/#headerStep'),
                  setDataPropsBooking((pre) => ({ ...pre, idQuotation: '' }))
                )}
              >
                Previous
              </Button>
              <Button
                style={{ width: '120px', height: '40px' }}
                type="primary"
                onClick={() => (
                  submitBooking(), router.push('/ltl-truck-freight/#headerStep')
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
