import React, { useState } from 'react';
import style from './index.module.scss';
import { Flex } from 'antd';
import Step5 from './components';
import Service from '../home-page/components/service';
import { useQuery } from '@tanstack/react-query';
import { errorToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import router from 'next/router';
import { getDetailBooking } from '@/components/ftl-truck-freight/fetcher';
import { IDetailBooking } from '@/components/ftl-truck-freight/interface';

export interface IDataBookingProps {
  detailBooking?: IDetailBooking;
}

export default function FtlTruckDetail() {
  const { id } = router.query;
  const [dataPropsBooking, setDataPropsBooking] = useState<IDataBookingProps>();

  useQuery({
    queryKey: [API_BOOKING.GET_SEA_BOOKING_BY_ID, id],
    queryFn: () => getDetailBooking({ id: id as string }),
    enabled: id !== undefined,
    onSuccess: (data: ResponseWithPayload<IDetailBooking>) => {
      if (data.status) {
        setDataPropsBooking(() => ({ detailBooking: data.data }));
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
                <h1>Inland Trucking</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Watch how your cargo travels with ASL and learn how we can
                  help with each step!
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex className={style.checkPrice} vertical>
        <div className={style.content}>
          <Step5 dataPropsBooking={dataPropsBooking} />
        </div>
      </Flex>
      <Service />
    </section>
  );
}
