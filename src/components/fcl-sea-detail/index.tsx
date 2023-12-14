import React, { useState } from 'react';
import style from './index.module.scss';
import { Flex } from 'antd';
import HeaderFclOceanFreight from './components/header';
import Step5 from './components/step-5';
import Service from '../home-page/components/service';
import {
  DEFAULT_PAGINATION,
  IDetailBooking,
  ISeaPricingDetail,
  TYPE_SERVICE,
} from './interface';
import { useQuery } from '@tanstack/react-query';
import { getDetailBooking } from './fetcher';
import { errorToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import router from 'next/router';

export interface IDataBookingProps {
  idBooking?: string;
  idQuotation: string;
  dataQuotation?: ISeaPricingDetail;
  detailBooking?: IDetailBooking;
}

export const initalValueProps = {
  idQuotation: '',
  idBooking: '',
};

export const initalValueForm = {
  polid: '',
  podid: '',
  typeSeaService: TYPE_SERVICE.FCL,
  cargoReady: 1,
  commodities: [''],
  containers: [''],
  paginateRequest: {
    currentPage: DEFAULT_PAGINATION.current,
    pageSize: DEFAULT_PAGINATION.pageSize,
  },
};

export default function FclOceanFreightDetail() {
  const { id } = router.query;

  const [displayStep, setDisplayStep] = useState<number>(5);
  const [dataPropsBooking, setDataPropsBooking] =
    useState<IDataBookingProps>(initalValueProps);
  useQuery({
    queryKey: [API_BOOKING.GET_SEA_BOOKING_BY_ID, id],
    queryFn: () => getDetailBooking({ id: id as string }),
    enabled: id !== undefined,
    onSuccess: (data: ResponseWithPayload<IDetailBooking>) => {
      if (data.status) {
        setDataPropsBooking((pre) => ({ ...pre, detailBooking: data.data }));
      }
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
    },
  });
  return (
    <section className={style.wrapper}>
      <div className={style.bg}>
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex>
                <h1>Ocean Freight</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Find the right route for your goods with guaranteed container
                  allocation by ocean freight.
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex className={style.checkPrice} vertical>
        <div className={style.content}>
          <HeaderFclOceanFreight displayStep={displayStep} />
          <Step5
            displayStep={displayStep}
            dataPropsBooking={dataPropsBooking}
          />
        </div>
      </Flex>
      <Service />
    </section>
  );
}
