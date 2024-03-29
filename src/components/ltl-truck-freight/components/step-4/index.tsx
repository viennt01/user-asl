import React, { useState } from 'react';
import style from './index.module.scss';
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  ConfigProvider,
  Checkbox,
  Spin,
} from 'antd';
import { IDataBookingProps } from '../..';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ResponseWithPayload } from '@/fetcherAxios';
import { IDetailBooking, IRequireDetailBooking } from '../../interface';
import { errorToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { useRouter } from 'next/router';
import { confirmBooking } from '@/components/fcl-ocean-freight/fetcher';
import { getDetailBooking } from '../../fetcher';
import FormBooking from '../../form-booking';

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  dataPropsBooking: IDataBookingProps;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
}

export default function Step4({
  displayStep,
  setDisplayStep,
  dataPropsBooking,
  setDataPropsBooking,
}: Props) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const onChange = () => {
    setIsChecked(!isChecked);
  };
  const getDataBooking = useQuery({
    queryKey: [API_BOOKING.GET_TRUCK_BOOKING_BY_ID, dataPropsBooking.idBooking],
    queryFn: () => getDetailBooking({ id: dataPropsBooking.idBooking }),
    enabled: dataPropsBooking.idBooking !== '',
    onSuccess: (data: ResponseWithPayload<IDetailBooking>) => {
      if (data.status) {
        setDataPropsBooking((pre) => ({ ...pre, detailBooking: data.data }));
      }
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
    },
  });

  const confirmBookingMutation = useMutation({
    mutationFn: (body: IRequireDetailBooking) => {
      return confirmBooking(body);
    },
  });

  return (
    <div
      className={style.step4}
      style={{
        display: displayStep === 4 ? '' : 'none',
      }}
    >
      <Card className={style.cardMain} title="Review Booking">
        <ConfigProvider
          theme={{
            components: {
              Spin: {
                dotSize: 100,
                dotSizeLG: 100,
                dotSizeSM: 100,
              },
            },
          }}
        >
          <Spin
            tip="Loading"
            size="small"
            style={{
              display: getDataBooking.isFetching ? '' : 'none',
              marginTop: '50px',
            }}
          >
            <div className="content" />
          </Spin>
        </ConfigProvider>

        <div
          style={{
            display: !getDataBooking.isFetching ? '' : 'none',
          }}
        >
          <FormBooking dataPropsBooking={dataPropsBooking?.detailBooking} />
          <div style={{ width: '100%', marginTop: '16px' }}>
            <ConfigProvider
              theme={{
                components: {
                  Checkbox: {
                    fontSize: 16,
                    controlInteractiveSize: 20,
                  },
                },
              }}
            >
              <Checkbox
                value={isChecked}
                onChange={onChange}
                style={{ marginBottom: '16px', fontWeight: 600 }}
              >
                I confirm the accuracy of the information provided above.
              </Checkbox>
            </ConfigProvider>
            <Flex justify="center">
              <Button
                style={{ width: '150px', height: '40px' }}
                type="primary"
                onClick={() =>
                  confirmBookingMutation.mutate(
                    { id: dataPropsBooking.idBooking || '' },
                    {
                      onSuccess: (data) => {
                        data.status
                          ? (setDisplayStep(5),
                            router.push('/ltl-truck-freight/#headerStep'))
                          : errorToast(data.message);
                      },
                      onError() {
                        errorToast(API_MESSAGE.ERROR);
                      },
                    }
                  )
                }
                disabled={!isChecked}
              >
                Submit booking
              </Button>
            </Flex>
          </div>
        </div>
      </Card>
    </div>
  );
}
