import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row } from 'antd';
import COLORS from '@/constants/color';
import { IDataBookingProps, IDataStep2Props } from '../..';
import Trucking from './components/trucking';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../../fetcher';
import { IBooking } from '../../interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { useRouter } from 'next/router';

export enum TYPE_POL_POD {
  'POL' = 'POL',
  'POD' = 'POD',
}

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  dataStep2PropsBooking: IDataStep2Props | undefined;
  dataPropsBooking: IDataBookingProps;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
}

export default function ServiceStep3({
  setDisplayStep,
  dataStep2PropsBooking,
  dataPropsBooking,
  setDataPropsBooking,
}: Props) {
  const [selectedRowKeysPOL, setSelectedRowKeysPOL] = useState<string>('');
  const [selectedRowKeysPOD, setSelectedRowKeysPOD] = useState<string>('');
  const router = useRouter();

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
      podid: dataPropsBooking.dataQuotation?.aodid || '',
      polid: dataPropsBooking.dataQuotation?.aolid || '',
      typeOfPOLID: dataPropsBooking.step1?.trafficPol?.typeOfTransportID || '',
      typeOfPODID: dataPropsBooking.step1?.trafficPod?.typeOfTransportID || '',
      commodityID: dataPropsBooking.dataQuotation?.commodityID || '',
      currencyID: dataPropsBooking.dataQuotation?.currencyID || '',
      cargoReadyDated: dataPropsBooking.step1?.cargoReady?.valueOf() || 1,
      cargoCutOffDated:
        dataPropsBooking.step1?.cargoCutOffDated?.valueOf() || 1,
      placeOfRecipt: dataPropsBooking.step1?.receipt || '',
      placeOfDelivery: dataPropsBooking.step1?.delivery || '',
      note: '',
      statusBooking: 'DRAFT',
      isManualBooking: false,
      airQuotationID: dataPropsBooking.dataQuotation?.airQuotationID || '',
      truckingQuotationPOLID: selectedRowKeysPOL,
      truckingQuotationPODID: selectedRowKeysPOD,
      typeOfService: 'AIR',
      airBookingDetailRegisterRequest: {
        packageID:
          dataStep2PropsBooking?.packageBookingLCLDetail?.packageID || '',
        quantityPackage:
          dataStep2PropsBooking?.packageBookingLCLDetail?.quantityPackage || '',
        gw: dataStep2PropsBooking?.packageBookingLCLDetail?.gw || '',
        cw: dataStep2PropsBooking?.packageBookingLCLDetail?.cw || '',
      },
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
  console.log(
    'loadCapacityID',
    dataStep2PropsBooking?.listQuantityType?.[0]
  );
  console.log(
    'quantityLoadCapacity',
    dataStep2PropsBooking?.listQuantityType?.[0]?.quantity
  );
  console.log(
    'packageID',
    dataStep2PropsBooking?.packageBookingLCLDetail?.packageID,
    dataStep2PropsBooking?.packageBookingLCLDetail?.quantityPackage,
    dataStep2PropsBooking?.packageBookingLCLDetail?.cbm,
    dataStep2PropsBooking?.packageBookingLCLDetail?.gw,
    dataStep2PropsBooking?.packageBookingLCLDetail?.cw
  );

  return (
    <div className={style.service}>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={{ background: '#E7EEFF', marginBottom: '16px' }}>
            <Row gutter={16}>
              <Col span={24}>
                <div className={style.header}>Recommend Service</div>
              </Col>
              <Col
                span={
                  dataPropsBooking?.step1?.trafficPol?.name === 'DOOR' ? 24 : 0
                }
              >
                <Trucking
                  type={TYPE_POL_POD.POL}
                  dataPropsBooking={dataPropsBooking}
                  setSelectedRowKeys={setSelectedRowKeysPOL}
                  dataStep2PropsBooking={dataStep2PropsBooking}
                />
              </Col>
              <Col
                span={
                  dataPropsBooking?.step1?.trafficPod?.name === 'DOOR' ? 24 : 0
                }
              >
                <Trucking
                  type={TYPE_POL_POD.POD}
                  dataPropsBooking={dataPropsBooking}
                  setSelectedRowKeys={setSelectedRowKeysPOD}
                  dataStep2PropsBooking={dataStep2PropsBooking}
                />
              </Col>
            </Row>
          </Card>
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
                setDisplayStep(2.2), router.push('/air-freight/#headerStep')
              )}
            >
              Pervious
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => (
                submitBooking(), router.push('/air-freight/#headerStep')
              )}
            >
              Next
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
