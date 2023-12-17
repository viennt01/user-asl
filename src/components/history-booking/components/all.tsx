import { Button, Col, Input, List, Row, Space } from 'antd';
import style from '../index.module.scss';
import Box from './box';
import { useQuery } from '@tanstack/react-query';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { getHistoryBooking } from '../fetcher';
import { IDetailBooking, TYPE_STATUS } from '../interface';
import { useState } from 'react';

export default function All() {
  const [dataHistory, setDataHistory] = useState<IDetailBooking[]>([]);
  useQuery({
    queryKey: [API_BOOKING.GET_HISTORY_BOOKING_BY_USER],
    queryFn: () =>
      getHistoryBooking({
        statusBooking: [
          TYPE_STATUS.PENDING_CONFIRMATION,
          TYPE_STATUS.COMPLETED,
          TYPE_STATUS.PROCESSING,
          TYPE_STATUS.CANCELLED,
        ],
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
