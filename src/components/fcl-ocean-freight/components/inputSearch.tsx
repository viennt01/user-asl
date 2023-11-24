import React from 'react';
import style from '../index.module.scss';
import {
  Col,
  Flex,
  Form,
  Row,
  Image,
  Select,
  Button,
  DatePicker,
  FormInstance,
} from 'antd';
import { useQuery } from '@tanstack/react-query';
import {
  API_COMMODITY,
  API_CONTAINER_TYPE,
  API_LOCATION,
} from '@/fetcherAxios/endpoint';
import {
  getAllCommodity,
  getAllContainerType,
  getAllLocation,
} from '../fetcher';
import { TYPE_LOCATION } from '../interface';
import { useRouter } from 'next/router';
const dateFormat = 'YYYY/MM/DD';

interface Props {
  displayStep: number;
  form: FormInstance<any>;
  onFinish: (formValues: any) => void;
  onReset: () => void;
}

export default function InputFclOceanFreight({
  displayStep,
  form,
  onFinish,
  onReset,
}: Props) {
  const router = useRouter();

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
    queryFn: () => getAllLocation({ type: TYPE_LOCATION.SEA }),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
      }
    },
    onError: () => {
      router.back();
    },
  });

  const getContainerType = useQuery({
    queryKey: [API_CONTAINER_TYPE.GET_ALL],
    queryFn: () => getAllContainerType(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
      }
    },
    onError: () => {
      router.back();
    },
  });

  const getCommodity = useQuery({
    queryKey: [API_COMMODITY.GET_ALL],
    queryFn: () => getAllCommodity(),
    onSuccess: (data) => {
      if (!data.status) {
        router.back();
      }
    },
    onError: () => {
      router.back();
    },
  });

  return (
    <div
      style={{ display: displayStep === 1 ? '' : 'none' }}
      className={style.inputSearch}
    >
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col className={style.input} lg={12} span={24}>
            <Flex align={'center'}>
              <Flex align={'center'} className={style.headerInput}>
                <Image
                  src={'/images/oceanFreight/anchor.png'}
                  alt="logo"
                  preview={false}
                  className={style.iconInput}
                  width={25}
                />
                <div className={style.titleInput}>POL</div>
              </Flex>
              <div className={style.contentInput}>
                <Form.Item
                  name="pol"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Port of Loading',
                    },
                  ]}
                >
                  <Select
                    style={{ margin: '0px' }}
                    showSearch
                    placeholder={'Please Select Port of Loading'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    size="large"
                    options={
                      getLocation.data?.data?.map((item) => {
                        return {
                          value: item.locationID,
                          label: item.locationName,
                        };
                      }) || []
                    }
                  />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col className={style.input} lg={12} span={24}>
            <Flex align={'center'}>
              <Flex align={'center'} className={style.headerInput}>
                <Image
                  src={'/images/oceanFreight/anchor.png'}
                  alt="logo"
                  preview={false}
                  className={style.iconInput}
                  width={25}
                />
                <div className={style.titleInput}>POD</div>
              </Flex>
              <div className={style.contentInput}>
                <Form.Item
                  name="pod"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Port of Discharge',
                    },
                  ]}
                >
                  <Select
                    style={{ margin: '0px' }}
                    showSearch
                    placeholder={'Please Select Port of Discharge'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    size="large"
                    options={
                      getLocation.data?.data?.map((item) => {
                        return {
                          value: item.locationID,
                          label: item.locationName,
                        };
                      }) || []
                    }
                  />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col className={style.input} lg={12} span={24}>
            <Flex align={'center'}>
              <Flex align={'center'} className={style.headerInput}>
                <Image
                  src={'/images/oceanFreight/date.png'}
                  alt="logo"
                  preview={false}
                  className={style.iconInput}
                  width={25}
                />
                <div className={style.titleInput}>Date</div>
              </Flex>
              <div className={style.contentInput}>
                <Form.Item
                  name="effectDated"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a effect date',
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col className={style.input} lg={12} span={24}>
            <Flex align={'center'}>
              <Flex align={'center'} className={style.headerInput}>
                <Image
                  src={'/images/oceanFreight/date.png'}
                  alt="logo"
                  preview={false}
                  className={style.iconInput}
                  width={25}
                />
                <div className={style.titleInput}>To</div>
              </Flex>
              <div className={style.contentInput}>
                <Form.Item
                  name="validityDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a validity date',
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    format={dateFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col className={style.input} span={24}>
            <Flex align={'center'}>
              <Flex align={'center'} className={style.headerInput}>
                <Image
                  src={'/images/oceanFreight/container.png'}
                  alt="logo"
                  preview={false}
                  className={style.iconInput}
                  width={25}
                />
                <div className={style.titleInput}>Type of container</div>
              </Flex>
              <div className={style.contentInput}>
                <Form.Item
                  name="container"
                  rules={[
                    {
                      required: true,
                      message: 'Please select type of container',
                    },
                  ]}
                >
                  <Select
                    style={{ margin: '0px' }}
                    showSearch
                    placeholder={'Please select type of container'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    size="large"
                    mode="multiple"
                    options={
                      getContainerType.data?.data?.map((item) => {
                        return {
                          value: item.containerTypeID,
                          label: item.code,
                        };
                      }) || []
                    }
                  />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          
          <Col className={style.input} span={24}>
            <Flex align={'center'}>
              <Flex align={'center'} className={style.headerInput}>
                <Image
                  src={'/images/oceanFreight/commodity.png'}
                  alt="logo"
                  preview={false}
                  className={style.iconInput}
                  width={25}
                />
                <div className={style.titleInput}>Commodity</div>
              </Flex>
              <div className={style.contentInput}>
                <Form.Item
                  name="commodity"
                  rules={[
                    {
                      required: true,
                      message: 'Please select commodity',
                    },
                  ]}
                >
                  <Select
                    style={{ margin: '0px' }}
                    showSearch
                    placeholder={'Please select commodity'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    size="large"
                    mode="multiple"
                    options={
                      getCommodity.data?.data?.map((item) => {
                        return {
                          value: item.commodityID,
                          label: item.commodityName,
                        };
                      }) || []
                    }
                  />
                </Form.Item>
              </div>
            </Flex>
          </Col>
          <Col span={24} style={{ margin: '24px 0' }}>
            <Flex justify={'center'} align={'center'}>
              <Button
                style={{
                  marginRight: '8px',
                  color: 'red',
                  width: '120px',
                  height: '40px',
                }}
                onClick={onReset}
              >
                Clear
              </Button>
              <Button
                style={{ width: '120px', height: '40px' }}
                type="primary"
                htmlType="submit"
              >
                Search
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
