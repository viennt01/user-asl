import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row } from 'antd';
import COLORS from '@/constants/color';
import Customs from './components/customsPol';
import { IDataBookingProps, IDataStep2Props } from '../..';
import Trucking from './components/trucking';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../../fetcher';
import {
  IBooking,
  ICustomQuotationPOD,
  ICustomQuotationPOL,
} from '../../interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import CustomsPod from './components/customsPod';
import { ISubmitFeeCustoms } from './components/customsPol/feeOfCustoms';

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
  const [selectedRowKeysPOL, setSelectedRowKeysPOL] = useState<React.Key[]>([]);
  const [selectedRowKeysPOD, setSelectedRowKeysPOD] = useState<React.Key[]>([]);
  const [selectedRowKeysCustomsPOL, setSelectedRowKeysCustomsPOL] = useState<
    React.Key[]
  >([]);
  const [selectedRowKeysCustomsPOD, setSelectedRowKeysCustomsPOD] = useState<
    React.Key[]
  >([]);
  const [submitFeeCustomsPOL, setSubmitFeeCustomsPOL] = useState<
    ISubmitFeeCustoms[]
  >([]);
  const [submitFeeCustomsPOD, setSubmitFeeCustomsPOD] = useState<
    ISubmitFeeCustoms[]
  >([]);

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
        setDisplayStep(4);
      }
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const submitBooking = () => {
    const _requestData = {
      podid: dataPropsBooking.dataQuotation?.podid || '',
      polid: dataPropsBooking.dataQuotation?.polid || '',
      typeOfPOLID: dataPropsBooking.step1?.trafficPol?.typeOfTransportID || '',
      typeOfPODID: dataPropsBooking.step1?.trafficPod?.typeOfTransportID || '',
      commodityID: dataPropsBooking.dataQuotation?.commodityID || '',
      currencyID: dataPropsBooking.dataQuotation?.currencyID || '',
      typeOfSeaService: true,
      typeOfService: 'SEA',
      cargoReadyDated: dataPropsBooking.step1?.cargoReady || 1,
      cargoCutOffDated: dataPropsBooking.step1?.cargoCutOffDated || 1,
      placeOfRecipt: dataPropsBooking.step1?.receipt || '',
      placeOfDelivery: dataPropsBooking.step1?.delivery || '',
      note: '',
      statusBooking: 'DRAFT',
      isManualBooking: false,
      quotationBookingDetailRegisterRequests: {
        seaQuotationID: dataPropsBooking.idQuotation || '',
        truckingQuotationPOLID: selectedRowKeysPOL[0] || '',
        truckingQuotationPODID: selectedRowKeysPOD[0] || '',
        customQuotationPOLID: selectedRowKeysCustomsPOL[0] || '',
        customQuotationPODID: selectedRowKeysCustomsPOD[0] || '',
        customQuotationPOLDetailRegisterRequests: FeeCustomsPOL || [],
        customQuotationPODDetailRegisterRequests: FeeCustomsPOD || [],
      },
      seaBookingFCLDetailRegisterRequests:
        dataStep2PropsBooking?.listQuantityType?.map((item) => ({
          containerTypeID: item.key || '',
          quantityContainer: item.quantity || '',
        })) || [],
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
                  dataPropsBooking?.step1?.trafficPol?.name === 'DOOR' ? 24 : 0
                }
              >
                <Trucking
                  type={TYPE_POL_POD.POL}
                  dataPropsBooking={dataPropsBooking}
                  selectedRowKeys={selectedRowKeysPOL}
                  setSelectedRowKeys={setSelectedRowKeysPOL}
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
                  selectedRowKeys={selectedRowKeysPOD}
                  setSelectedRowKeys={setSelectedRowKeysPOD}
                />
              </Col>

              <Col span={24}>
                <Customs
                  type={TYPE_POL_POD.POL}
                  dataPropsBooking={dataPropsBooking}
                  setSubmitFeeCustoms={setSubmitFeeCustomsPOL}
                />
              </Col>
              <Col span={24}>
                <Customs
                  type={TYPE_POL_POD.POD}
                  dataPropsBooking={dataPropsBooking}
                  setSubmitFeeCustoms={setSubmitFeeCustomsPOD}
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
              onClick={() => setDisplayStep(2.2)}
            >
              Pervious
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => submitBooking()}
            >
              Next
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
