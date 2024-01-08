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
  Tag,
} from 'antd';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { API_COMMODITY, API_LOCATION } from '@/fetcherAxios/endpoint';
import { IQuotationTable, IStep1 } from '../interface';
import { useRouter } from 'next/router';
import { ResponseWithPayload } from '@/fetcherAxios';
import TableReturn from './tableReturn';
import { IDataBookingProps } from '..';
import {
  getAllCommodity,
  getAllLocation,
} from '@/components/fcl-ocean-freight/fetcher';
import {
  IPaginationOfAntd,
  ITypeOfTransport,
  RequireTypeLoadCapacity,
  TYPE_LOCATION,
} from '@/components/fcl-ocean-freight/interface';
const dateFormat = 'YYYY-MM-DD';

interface Props {
  displayStep: number;
  form: FormInstance<any>;
  onFinish: (formValues: IStep1) => void;
  onReset: () => void;
  loading: boolean;
  getLoadCapacity: UseQueryResult<
    ResponseWithPayload<RequireTypeLoadCapacity[]>,
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
  showError: boolean;
}

export default function InputFclOceanFreight({
  displayStep,
  form,
  onFinish,
  onReset,
  loading,
  getLoadCapacity,
  getTypeTransport,
  setDisplayStep,
  dataTableResearch,
  setDataPropsBooking,
  pagination,
  handlePaginationChange,
  showError,
}: Props) {
  const router = useRouter();

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
    queryFn: () =>
      getAllLocation({
        type: [
          TYPE_LOCATION.PORT,
          TYPE_LOCATION.AIR_PORT,
          TYPE_LOCATION.DEPOT,
          TYPE_LOCATION.INDUSTRIAL_ZONE,
        ],
      }),
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
                  <div className={style.titleInput}>Place of pick up</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="pickupID"
                    rules={[
                      {
                        required: true,
                        message: 'Please select place of pick up',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder={'Select place of pick up'}
                      optionFilterProp="label"
                      filterOption={(input, option) => {
                        return (option?.display ?? '').includes(
                          input.toString().toLocaleUpperCase()
                        );
                      }}
                      size="large"
                      options={
                        getLocation.data?.data?.map((item) => {
                          return {
                            value: item.locationID,
                            display: item.locationName,
                            label: (
                              <Flex justify="space-between">
                                <Flex>{item.locationName}</Flex>
                                <Flex align="center">
                                  {item.typeLocation.map((item) => {
                                    return (
                                      <Tag
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          height: '20px',
                                          marginRight: '4px',
                                        }}
                                      >
                                        {item}
                                      </Tag>
                                    );
                                  })}
                                </Flex>
                              </Flex>
                            ),
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
                  <div className={style.titleInput}>Place of delivery</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="deliveryID"
                    rules={[
                      {
                        required: true,
                        message: 'Please select place of delivery',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder={'Select place of delivery'}
                      optionFilterProp="label"
                      filterOption={(input, option) => {
                        return (option?.display ?? '').includes(
                          input.toString().toLocaleUpperCase()
                        );
                      }}
                      size="large"
                      options={
                        getLocation.data?.data?.map((item) => {
                          return {
                            value: item.locationID,
                            display: item.locationName,
                            label: (
                              <Flex justify="space-between">
                                <Flex>{item.locationName}</Flex>
                                <Flex align="center">
                                  {item.typeLocation.map((item) => {
                                    return (
                                      <Tag
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          height: '20px',
                                          marginRight: '4px',
                                        }}
                                      >
                                        {item}
                                      </Tag>
                                    );
                                  })}
                                </Flex>
                              </Flex>
                            ),
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
                    src={'/images/oceanFreight/location.svg'}
                    alt="logo"
                    preview={false}
                    className={style.iconInput}
                    width={25}
                  />
                  <div className={style.titleInput}>Address of pick up</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="receipt"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter of pick up',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder={'Enter place of pick up'}
                    />
                  </Form.Item>
                </div>
              </Flex>
            </Col>
            <Col className={style.input} lg={12} span={24}>
              <Flex align={'center'}>
                <Flex align={'center'} className={style.headerInput}>
                  <Image
                    src={'/images/oceanFreight/location.svg'}
                    alt="logo"
                    preview={false}
                    className={style.iconInput}
                    width={25}
                  />
                  <div className={style.titleInput}>Address of delivery</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="delivery"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter address of delivery',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder={'Enter address of delivery'}
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
                      showSearch
                      placeholder={'Select commodity'}
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
                  <div className={style.titleInput}>Load capacity</div>
                </Flex>
                <div className={style.contentInput}>
                  <Form.Item
                    name="loadCapacities"
                    rules={[
                      {
                        required: true,
                        message: 'Please select load capacity',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder={'Select load capacity'}
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
                      // mode="multiple"
                      options={
                        getLoadCapacity.data?.data?.map((item) => {
                          return {
                            value: item.loadCapacityID,
                            label: item.name,
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
        showError={showError}
      />
    </div>
  );
}
