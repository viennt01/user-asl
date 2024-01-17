import React, { useState } from 'react';
import style from './index.module.scss';
import { Flex } from 'antd';
import Service from '../home-page/components/service';
import { useQuery } from '@tanstack/react-query';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';

import { errorToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { useRouter } from 'next/router';
import { IDetailBooking } from '../air-freight/interface';
import { getDetailBooking } from '../air-freight/fetcher';
import Step5 from './components';

export interface IDataBookingProps {
  detailBooking?: IDetailBooking;
}

export default function AirDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [dataPropsBooking, setDataPropsBooking] = useState<IDataBookingProps>();

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
                <h1>Air Freight</h1>
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
