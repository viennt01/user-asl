import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row } from 'antd';
import COLORS from '@/constants/color';
import CustomsPol from './components/customsPol';
import { IDataBookingProps, IDataStep2Props } from '../..';
import Trucking from './components/trucking';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../../fetcher';
import { IBooking } from '../../interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import CustomsPod from './components/customsPod';

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

  const createBookingMutation = useMutation({
    mutationFn: (body: IBooking) => {
      return createBooking(body);
    },
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
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
      cargoReadyDated: dataPropsBooking.step1?.cargoReady || '',
      cargoCutOffDated: dataPropsBooking.step1?.cargoCutOffDated || '',
      placeOfRecipt: dataPropsBooking.step1?.receipt || '',
      placeOfDelivery: dataPropsBooking.step1?.delivery || '',
      note: '',
      statusBooking: 'DRAFT',
      isManualBooking: false,
      seaBookingFCLDetailRegisterRequests:
        dataStep2PropsBooking?.listQuantityType?.map((item) => ({
          containerTypeID: item.key,
          quantityContainer: item.quantity,
        })) || [],
      quotationBookingDetailRegisterRequests: {
        seaQuotationID: dataPropsBooking.idQuotation || '',
        truckingQuotationPOLID: selectedRowKeysPOL[0] || '',
        truckingQuotationPODID: selectedRowKeysPOD[0] || '',
        customQuotationPOLID: selectedRowKeysCustomsPOL[0] || '',
        customQuotationPODID: selectedRowKeysCustomsPOD[0] || '',
      },
    };
    console.log(_requestData);

    setDisplayStep(4);
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
                <CustomsPol
                  dataPropsBooking={dataPropsBooking}
                  selectedRowKeys={selectedRowKeysCustomsPOL}
                  setSelectedRowKeys={setSelectedRowKeysCustomsPOL}
                />
              </Col>
              <Col span={24}>
                <CustomsPod
                  dataPropsBooking={dataPropsBooking}
                  selectedRowKeys={selectedRowKeysCustomsPOD}
                  setSelectedRowKeys={setSelectedRowKeysCustomsPOD}
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
