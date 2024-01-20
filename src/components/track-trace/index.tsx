import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Radio,
  Row,
} from 'antd';
import style from './index.module.scss';
import { useMutation } from '@tanstack/react-query';
import { IRequestTrackTrade, IRequireTrackTrade } from './interface';
import { searchTrackTrade } from './fetcher';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { useState } from 'react';
import Result from './components/result';
import Service from '../home-page/components/service';

const initialValues = {
  hblNo: 'hblNo',
  containerNo: '',
};

export default function TraceTrace() {
  const [form] = Form.useForm<IRequestTrackTrade>();
  const [dataTrackTrade, setDataTrackTrade] = useState<IRequireTrackTrade>();
  const searchTrackTradeMutation = useMutation({
    mutationFn: (body: IRequestTrackTrade) => {
      return searchTrackTrade(body);
    },
  });

  const onSubmit = (value: IRequestTrackTrade) => {
    const data = {
      hblNo: '',
      bookingNo: value.containerNo || '',
      containerNo: '',
    };
    searchTrackTradeMutation.mutate(data, {
      onSuccess: (data) => {
        data.status
          ? (successToast(data.message), setDataTrackTrade(data.data))
          : errorToast(data.message);
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.welcome}>
        <div className={style.container}>
          <div className={style.textCol}>
            <h1>Track & Trace</h1>
            <div className={style.desc}>
              Watch how your cargo travels with ASL and learn how we can help
              with each step!
            </div>
          </div>
        </div>
      </div>
      <Flex justify="center" style={{ width: '100%' }}>
        <div className={style.search}>
          <div className={style.searchBox}>
            <Form
              form={form}
              onFinish={onSubmit}
              initialValues={initialValues}
              layout="horizontal"
            >
              <Row gutter={24}>
                <Col span={4}>
                  <div className={style.title1}>Booking No:</div>{' '}
                </Col>
                <Col span={16}>
                  <Form.Item
                    name="containerNo"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a number no',
                      },
                    ]}
                  >
                    <Input
                      style={{ width: ' 100%' }}
                      size="large"
                      placeholder="Please enter a number no"
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Flex justify="center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={{ width: '100%', height: '40px' }}
                      loading={searchTrackTradeMutation.isLoading}
                    >
                      Search
                    </Button>
                  </Flex>
                </Col>
              </Row>
            </Form>
          </div>
          <div className={style.returnData}>
            <Result data={dataTrackTrade} />
          </div>
        </div>
      </Flex>
      <Service />
    </div>
  );
}
