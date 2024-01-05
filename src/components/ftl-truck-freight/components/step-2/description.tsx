import React from 'react';
import style from './index.module.scss';
import { Button, Col, Flex, Row } from 'antd';
import COLORS from '@/constants/color';
import LocalChargesEdit from './components/localCharges';
import TableContainerEdit from './components/tableContainer';
import { IDataBookingProps, IDataStep2Props } from '../..';
import { IBooking, IQuotationDetail } from '../../interface';
import { useRouter } from 'next/router';
import { FeeTable } from '@/components/fcl-ocean-freight/interface';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../../fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { TYPE_SERVICE } from '@/components/history-booking/interface';

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

export interface IQuantity {
  key: string;
  quantity: string;
  name: string;
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

  const createBookingMutation = useMutation({
    mutationFn: (body: IBooking) => {
      return createBooking(body);
    },
    onSuccess: (data) => {
      if (data.status) {
        successToast(data.message);
        setDataPropsBooking((pre) => ({ ...pre, idBooking: data.data || '' }));
        setDisplayStep(3);
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
      typeSeaService: TYPE_SERVICE.FTL,
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
      truckBookingFCLDetailRegisterRequests:
        dataStep2PropsBooking?.listQuantityType?.map((item) => ({
          containerTypeID: item.key || '',
          quantityContainer: item.quantity || '',
        })) || [],
    };
    createBookingMutation.mutate(_requestData);
  };

  return (
    <div className={style.description}>
      <Row gutter={16}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <TableContainerEdit
                dataPropsBooking={dataPropsBooking}
                setDataStep2PropsBooking={setDataStep2PropsBooking}
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
                router.push('/fcl-ocean-freight/#headerStep'),
                setDataPropsBooking((pre) => ({ ...pre, idQuotation: '' }))
              )}
            >
              Previous
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => (
                submitBooking(), router.push('/ftl-truck-freight/#headerStep')
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
