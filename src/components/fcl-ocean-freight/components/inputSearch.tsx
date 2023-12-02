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
  Input,
} from 'antd';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { API_COMMODITY, API_LOCATION } from '@/fetcherAxios/endpoint';
import { getAllCommodity, getAllLocation } from '../fetcher';
import {
  IPaginationOfAntd,
  IQuotationTable,
  IRequireSearchQuotation,
  ITypeOfTransport,
  RequireTypeContainer,
  TYPE_LOCATION,
} from '../interface';
import { useRouter } from 'next/router';
import { ResponseWithPayload } from '@/fetcherAxios';
import TableReturn from './tableReturn';
import { IDataBookingProps } from '..';
const dateFormat = 'YYYY-MM-DD';

interface Props {
  displayStep: number;
  form: FormInstance<any>;
  onFinish: (formValues: IRequireSearchQuotation) => void;
  onReset: () => void;
  loading: boolean;
  getContainerType: UseQueryResult<
    ResponseWithPayload<RequireTypeContainer[]>,
    unknown
  >;
  getTypeTransport: UseQueryResult<
    ResponseWithPayload<ITypeOfTransport[]>,
    unknown
  >;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  dataTableResearch: IQuotationTable[];
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
  pagination: IPaginationOfAntd;
  handlePaginationChange: (page: number, pageSize: number) => void;
}

export default function InputFclOceanFreight({
  displayStep,
  form,
  onFinish,
  onReset,
  loading,
  getContainerType,
  getTypeTransport,
  setDisplayStep,
  dataTableResearch,
  setDataPropsBooking,
  pagination,
  handlePaginationChange,
}: Props) {
  const router = useRouter();
  const trafficPol = Form.useWatch('trafficPol', form);
  const trafficPod = Form.useWatch('trafficPod', form);

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
    queryFn: () => getAllLocation({ type: [TYPE_LOCATION.PORT] }),
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
    <div className={style.step1}>
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
                    name="polid"
                    rules={[
                      {
                        required: true,
                        message: 'Please select port of loading',
                      },
                    ]}
                  >
                    <Select
                      style={{ margin: '0px' }}
                      showSearch
                      placeholder={'Please select port of loading'}
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
                    name="podid"
                    rules={[
                      {
                        required: true,
                        message: 'Please select port of discharge',
                      },
                    ]}
                  >
                    <Select
                      style={{ margin: '0px' }}
                      showSearch
                      placeholder={'Please select port of discharge'}
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
                    src={'/images/oceanFreight/traffic.svg'}
                    alt="logo"
                    preview={false}
                    className={style.iconInput}
                    width={25}
                  />
                  <div className={style.titleInput}>Traffic mode (POL)</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="trafficPol"
                    rules={[
                      {
                        required: true,
                        message: 'Please select traffic mode',
                      },
                    ]}
                  >
                    <Select
                      style={{ margin: '0px' }}
                      showSearch
                      placeholder={'Please select traffic mode'}
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
                        getTypeTransport.data?.data?.map((item) => {
                          return {
                            value: item.typeOfTransportID,
                            label: item.name,
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
                    src={'/images/oceanFreight/traffic.svg'}
                    alt="logo"
                    preview={false}
                    className={style.iconInput}
                    width={25}
                  />
                  <div className={style.titleInput}>Traffic mode (POD)</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="trafficPod"
                    rules={[
                      {
                        required: true,
                        message: 'Please select traffic mode',
                      },
                    ]}
                  >
                    <Select
                      style={{ margin: '0px' }}
                      showSearch
                      placeholder={'Please select traffic mode'}
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
                        getTypeTransport.data?.data?.map((item) => {
                          return {
                            value: item.typeOfTransportID,
                            label: item.name,
                          };
                        }) || []
                      }
                    />
                  </Form.Item>
                </div>
              </Flex>
            </Col>

            <Col
              span={
                getTypeTransport.data?.data
                  ?.map((item) => {
                    return {
                      value: item.typeOfTransportID,
                      label: item.name,
                    };
                  })
                  .find((item) => item.value === trafficPol)?.label !== 'DOOR'
                  ? 12
                  : 0
              }
            ></Col>

            <Col
              className={style.input}
              lg={
                getTypeTransport.data?.data
                  ?.map((item) => {
                    return {
                      value: item.typeOfTransportID,
                      label: item.name,
                    };
                  })
                  .find((item) => item.value === trafficPol)?.label === 'DOOR'
                  ? 12
                  : 0
              }
              span={
                getTypeTransport.data?.data
                  ?.map((item) => {
                    return {
                      value: item.typeOfTransportID,
                      label: item.name,
                    };
                  })
                  .find((item) => item.value === trafficPol)?.label === 'DOOR'
                  ? 24
                  : 0
              }
            >
              <Flex align={'center'}>
                <Flex align={'center'} className={style.headerInput}>
                  <Image
                    src={'/images/oceanFreight/location.svg'}
                    alt="logo"
                    preview={false}
                    className={style.iconInput}
                    width={25}
                  />
                  <div className={style.titleInput}>Place of Receipt</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="receipt"
                    rules={[
                      {
                        required: trafficPol === 'DOOR',
                        message: 'Please ent delivery (POL)',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      style={{ margin: '0px' }}
                      placeholder={'Please enter place of receipt'}
                    />
                  </Form.Item>
                </div>
              </Flex>
            </Col>
            <Col
              className={style.input}
              lg={
                getTypeTransport.data?.data
                  ?.map((item) => {
                    return {
                      value: item.typeOfTransportID,
                      label: item.name,
                    };
                  })
                  .find((item) => item.value === trafficPod)?.label === 'DOOR'
                  ? 12
                  : 0
              }
              span={
                getTypeTransport.data?.data
                  ?.map((item) => {
                    return {
                      value: item.typeOfTransportID,
                      label: item.name,
                    };
                  })
                  .find((item) => item.value === trafficPod)?.label === 'DOOR'
                  ? 24
                  : 0
              }
            >
              <Flex align={'center'}>
                <Flex align={'center'} className={style.headerInput}>
                  <Image
                    src={'/images/oceanFreight/location.svg'}
                    alt="logo"
                    preview={false}
                    className={style.iconInput}
                    width={25}
                  />
                  <div className={style.titleInput}>Place of Delivery</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="delivery"
                    rules={[
                      {
                        required: trafficPod === 'DOOR',
                        message: 'Please enter place of delivery',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      style={{ margin: '0px' }}
                      placeholder={'Please enter place of delivery'}
                    />
                  </Form.Item>
                </div>
              </Flex>
            </Col>

            <Col
              span={
                getTypeTransport.data?.data
                  ?.map((item) => {
                    return {
                      value: item.typeOfTransportID,
                      label: item.name,
                    };
                  })
                  .find((item) => item.value === trafficPod)?.label !== 'DOOR'
                  ? 12
                  : 0
              }
            ></Col>

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
                  <div className={style.titleInput}>Cargo Ready</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="cargoReady"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a cargo ready',
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
                  <div className={style.titleInput}>Cargo Cutoff To</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="cargoCutOffDated"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a cargo cutoff to',
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
                    name="containers"
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
                        getContainerType?.data?.data?.map((item) => {
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
                    name="commodities"
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
                  loading={loading}
                >
                  Search
                </Button>
              </Flex>
            </Col>
          </Row>
        </Form>
      </div>
      <TableReturn
        displayStep={displayStep}
        setDisplayStep={setDisplayStep}
        data={dataTableResearch}
        setDataPropsBooking={setDataPropsBooking}
        pagination={pagination}
        handlePaginationChange={handlePaginationChange}
      />
    </div>
  );
}
