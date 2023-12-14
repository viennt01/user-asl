import { Button, Col, Input, List, Row, Space, Image } from 'antd';
import style from '../index.module.scss';
import Box from './box';
import { useQuery } from '@tanstack/react-query';
import { IDetailBookingLCL, TYPE_STATUS } from '../interface';
import { useState } from 'react';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { getHistoryBooking } from '../fetcher';

export default function Processing() {
  const [dataHistory, setDataHistory] = useState<IDetailBookingLCL[]>([]);
  useQuery({
    queryKey: [API_BOOKING.GET_HISTORY_BOOKING_BY_USER],
    queryFn: () =>
      getHistoryBooking({
        statusBooking: [TYPE_STATUS.PROCESSING],
      }),
    onSuccess(data) {
      if (data.status) {
        if (data.data) {
          setDataHistory(data.data || []);
        }
      }
    },
  });
  return (
    <div className={style.all}>
      <div className={style.search}>
        <Row>
          <Col span={24} md={12}>
            <Space.Compact style={{ width: '100%' }}>
              <Input size="large" placeholder="Please enter name to search" />
              <Button size="large" type="primary">
                Submit
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      </div>
      <div className={style.result}>
        <List
          dataSource={dataHistory}
          renderItem={(item: any) => <Box data={item} />}
        />
      </div>
    </div>
  );
}
