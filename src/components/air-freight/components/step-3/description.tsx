import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Result, Row } from 'antd';
import COLORS from '@/constants/color';
import { IDataBookingProps, IDataStep2Props } from '../..';
import Trucking from './components/truck';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../../fetcher';
import { IBooking } from '../../interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { useRouter } from 'next/router';
import {
  ICustomQuotationPOD,
  ICustomQuotationPOL,
} from '@/components/fcl-ocean-freight/interface';
import { ISubmitFeeCustoms } from '@/components/fcl-ocean-freight/components/step-3/components/customs/feeOfCustoms';
import Customs from './components/customs';

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

  const [selectedRowKeysCustomsPOL, setSelectedRowKeysCustomsPOL] =
    useState<string>('');
  const [selectedRowKeysCustomsPOD, setSelectedRowKeysCustomsPOD] =
    useState<string>('');
  const [submitFeeCustomsPOL, setSubmitFeeCustomsPOL] = useState<
    ISubmitFeeCustoms[]
  >([]);
  const [submitFeeCustomsPOD, setSubmitFeeCustomsPOD] = useState<
    ISubmitFeeCustoms[]
  >([]);
  const router = useRouter();

  const FeeCustomsPOL: ICustomQuotationPOL[] = submitFeeCustomsPOL
    .map((itemA) => {
      if (itemA.listFee.length === 0) return null;
      const itemB: ICustomQuotationPOL = {
        feeGroupID: itemA.feeGroupID,
        customQuotationPOLFeeDetailRegisterRequests: itemA.listFee.map(
          (detailID) => ({
            feeGroupDetailID: detailID,
          })
        ),
      };
      return itemB;
    })
    .filter((item) => item !== null) as ICustomQuotationPOL[];

  const FeeCustomsPOD: ICustomQuotationPOD[] = submitFeeCustomsPOD
    .map((itemA) => {
      if (itemA.listFee.length === 0) return null;
      const itemB: ICustomQuotationPOD = {
        feeGroupID: itemA.feeGroupID,
        customQuotationPODFeeDetailRegisterRequests: itemA.listFee.map(
          (detailID) => ({
            feeGroupDetailID: detailID,
          })
        ),
      };
      return itemB;
    })
    .filter((item) => item !== null) as ICustomQuotationPOD[];

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
        loadCapacityID:
          dataStep2PropsBooking?.packageBookingLCLDetail?.loadCapacity?.[0] ||
          '',
        quantityLoadCapacity: '1',
        gw: dataStep2PropsBooking?.packageBookingLCLDetail?.gw || '',
        cbm: dataStep2PropsBooking?.packageBookingLCLDetail?.cbm || '',
      },
      quotationBookingDetailRegisterRequest: {
        airQuotationID: dataPropsBooking.idQuotation || '',
        truckingQuotationPOLID: selectedRowKeysPOL || '',
        truckingQuotationPODID: selectedRowKeysPOD || '',
        customQuotationPOLID: FeeCustomsPOL
          ? selectedRowKeysCustomsPOL || ''
          : '',
        customQuotationPODID: FeeCustomsPOD
          ? selectedRowKeysCustomsPOD || ''
          : '',
        customQuotationPOLDetailRegisterRequests: FeeCustomsPOL || [],
        customQuotationPODDetailRegisterRequests: FeeCustomsPOD || [],
      },
    };
    createBookingMutation.mutate(_requestData);
  };

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
                  dataPropsBooking?.step1?.trafficPol?.name === 'DOOR' ||
                  dataPropsBooking?.step1?.trafficPod?.name === 'DOOR'
                    ? 0
                    : 24
                }
              >
                <Result
                  status="success"
                  title="Please skip this step!"
                  subTitle="If you wish to use the service, go back to step 1 and select traffic mode as DOOR."
                />
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

              <Col
                span={
                  dataPropsBooking?.step1?.trafficPol?.name === 'DOOR' ? 24 : 0
                }
              >
                <Customs
                  type={TYPE_POL_POD.POL}
                  dataPropsBooking={dataPropsBooking}
                  setSubmitFeeCustoms={setSubmitFeeCustomsPOL}
                  setSelectedRowKey={setSelectedRowKeysCustomsPOL}
                  selectedRowKey={selectedRowKeysCustomsPOL}
                  dataStep2PropsBooking={dataStep2PropsBooking}
                />
              </Col>
              <Col
                span={
                  dataPropsBooking?.step1?.trafficPod?.name === 'DOOR' ? 24 : 0
                }
              >
                <Customs
                  type={TYPE_POL_POD.POD}
                  dataPropsBooking={dataPropsBooking}
                  setSubmitFeeCustoms={setSubmitFeeCustomsPOD}
                  setSelectedRowKey={setSelectedRowKeysCustomsPOD}
                  selectedRowKey={selectedRowKeysCustomsPOD}
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
