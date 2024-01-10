import React, { useState } from 'react';
import style from '../../index.module.scss';
import {
  Button,
  Col,
  Collapse,
  ConfigProvider,
  Flex,
  Form,
  Row,
  Typography,
  Image,
  Select,
  DatePicker,
  Input,
  Table,
  Tag,
  Result,
  Popover,
} from 'antd';
import COLORS from '@/constants/color';
import { useQuery } from '@tanstack/react-query';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import {
  getAllLocation,
  getPriceTrucking,
} from '@/components/fcl-ocean-freight/fetcher';
import {
  IFclTruckingQuotationDetails,
  IQuotationTrucking,
  IQuotationTruckingTable,
  IRequireSearchTrucking,
  TYPE_LOCATION,
} from '@/components/fcl-ocean-freight/interface';
import { useRouter } from 'next/router';
import { ResponseWithPayload } from '@/fetcherAxios';
import { ColumnsType } from 'antd/lib/table';
import { TYPE_POL_POD } from '../../description';
import { formatNumber } from '@/utils/format-number';
import { TYPE_SERVICE } from '@/components/history-booking/interface';
import { LoadCapacitiesType } from '@/components/air-freight/interface';
import DetailTrucking from './table-detail';
import {
  IDataBookingProps,
  IDataStep2Props,
} from '@/components/fcl-ocean-freight';

interface Props {
  dataPropsBooking: IDataBookingProps;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<string>>;
  type: TYPE_POL_POD;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}
const { Panel } = Collapse;
const { Title } = Typography;
const dateFormat = 'YYYY-MM-DD';

const initalValueForm = {
  pickupID: '',
  deliveryID: '',
  typeSeaService: TYPE_SERVICE.FCL,
  cargoReady: 1,
  commodityID: '',
  containers: {},
};

export default function Trucking({
  dataPropsBooking,
  setSelectedRowKeys,
  type,
  dataStep2PropsBooking,
}: Props) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [dataTableResearch, setDataTableResearch] = useState<
    IQuotationTruckingTable[]
  >([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [hoverKey, setHoverKey] = useState<string>('');

  const [dataResearch, setDataResearch] =
    useState<IRequireSearchTrucking>(initalValueForm);

  const onFinish = (formValues: IRequireSearchTrucking) => {
    const _requestData =
      type === TYPE_POL_POD.POD
        ? {
            deliveryID: formValues.deliveryID || '',
            pickupID: dataPropsBooking.dataQuotation?.podid || '',
            commodityID: dataPropsBooking.dataQuotation?.commodityID || '',
            cargoReady: formValues.cargoReady?.valueOf() || 1,
            containers:
              dataStep2PropsBooking?.listQuantityType?.reduce(
                (result: LoadCapacitiesType, item) => {
                  result[item.key] = item.quantity;
                  return result;
                },
                {}
              ) || {},
          }
        : {
            pickupID: formValues.pickupID || '',
            deliveryID: dataPropsBooking?.dataQuotation?.polid || '',
            commodityID: dataPropsBooking.dataQuotation?.commodityID || '',
            cargoReady: formValues.cargoReady?.valueOf() || 1,
            containers:
              dataStep2PropsBooking?.listQuantityType?.reduce(
                (result: LoadCapacitiesType, item) => {
                  result[item.key] = item.quantity;
                  return result;
                },
                {}
              ) || {},
          };
    setDataResearch(_requestData);
    if (
      _requestData.pickupID === dataResearch.pickupID &&
      _requestData.cargoReady === dataResearch.cargoReady
    ) {
      getPrice.refetch();
    }
  };

  const getPrice = useQuery({
    queryKey: [
      API_BOOKING.RECOMMEND_TRUCKING_QUOTATION_FOR_BOOKING_FCL,
      dataResearch,
    ],
    queryFn: () => getPriceTrucking(dataResearch),
    enabled: dataResearch.pickupID !== '',
    onSuccess: (data: ResponseWithPayload<IQuotationTrucking[]>) => {
      data.status
        ? data.data
          ? (setDataTableResearch(
              (data.data.map((item) => ({
                key: item.truckingQuotationID,
                pickupID: item.pickupID,
                pickupName: item.pickupName,
                deliveryID: item.deliveryID,
                deliveryName: item.deliveryName,
                commodityID: item.commodityID,
                commodityName: item.commodityName,
                abbreviations: item.abbreviations,
                fclTruckingQuotationDetails: item.fclTruckingQuotationDetails,
                totalPrice: item.totalPrice,
              })) as IQuotationTruckingTable[]) || []
            ),
            setShowError(false),
            setSelectedRowKeys(''))
          : (setShowError(true), setSelectedRowKeys(''))
        : (setShowError(true), setSelectedRowKeys(''));
    },
    onError() {
      setShowError(true), setSelectedRowKeys('');
    },
  });

  const getLocation = useQuery({
    queryKey: ['trucking'],
    queryFn: () =>
      getAllLocation({
        type: [
          TYPE_LOCATION.AIR_PORT,
          TYPE_LOCATION.DEPOT,
          TYPE_LOCATION.INDUSTRIAL_ZONE,
          TYPE_LOCATION.PORT,
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

  const contentDetail = (
    lclTruckingQuotationDetails: IFclTruckingQuotationDetails[],
    abbreviations: string
  ) => {
    return (
      <div>
        <DetailTrucking
          lclTruckingQuotationDetails={lclTruckingQuotationDetails}
          abbreviations={abbreviations}
        />
      </div>
    );
  };

  const columns: ColumnsType<IQuotationTruckingTable> = [
    {
      title: (
        <Flex align="center" justify="center">
          Place of pick up
        </Flex>
      ),
      dataIndex: 'pickupName',
      key: 'pickupName',
    },
    {
      title: (
        <Flex align="center" justify="center">
          Place of Delivery
        </Flex>
      ),
      dataIndex: 'deliveryName',
      key: 'deliveryName',
    },
    {
      title: (
        <Flex align="center" justify="center">
          Price
        </Flex>
      ),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'right',
      render: (value, record) => {
        return (
          <Popover
            content={contentDetail(
              record.fclTruckingQuotationDetails,
              record.abbreviations
            )}
            visible={hoverKey === record.key ? true : false}
          >
            <Tag color="#F2F48E" style={{ color: '#000', fontWeight: '450' }}>
              {value ? `${formatNumber(value)} ${record?.abbreviations}` : '-'}
            </Tag>
          </Popover>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: IQuotationTruckingTable[]
    ) => {
      setSelectedRowKeys(selectedRowKeys?.[0] as string);
    },
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerBg: COLORS.WHITE,
            colorBorder: 'rgba(0, 0, 0, 0.5)',
            fontSizeIcon: 16,
          },
        },
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Collapse
          defaultActiveKey={['1']}
          style={{ width: '100%', marginBottom: '24px' }}
        >
          <Panel
            className={style.panel}
            forceRender
            header={
              <Title className="vioer" level={4} style={{ margin: '4px 0' }}>
                Trucking ({type === TYPE_POL_POD.POD ? 'DESTINATION' : 'ORIGIN'}
                )
              </Title>
            }
            extra={
              <Button
                type="primary"
                htmlType="submit"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Search
              </Button>
            }
            key="1"
          >
            <Row>
              <Col className={style.input} span={24}>
                <Flex align={'center'}>
                  <Flex align={'center'} className={style.headerInput}>
                    <Image
                      src={'/images/oceanFreight/location.svg'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>
                      {type === TYPE_POL_POD.POD ? 'Delivery at' : 'Pick up at'}
                    </div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item
                      name={
                        type === TYPE_POL_POD.POD ? 'deliveryID' : 'pickupID'
                      }
                      rules={[
                        {
                          required: true,
                          message:
                            type === TYPE_POL_POD.POD
                              ? 'Please select delivery address'
                              : 'Please select pick up address',
                        },
                      ]}
                    >
                      <Select
                        style={{ margin: '0px' }}
                        showSearch
                        placeholder={
                          type === TYPE_POL_POD.POD
                            ? 'Please select delivery address'
                            : 'Please select pick up address'
                        }
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
                      src={'/images/oceanFreight/date.png'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>Cargo ready</div>
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

              <Col className={style.input} span={24}>
                <Flex align={'center'}>
                  <Flex align={'center'} className={style.headerInput}>
                    <Image
                      src={'/images/oceanFreight/note.svg'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>Note</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item name="note">
                      <Input.TextArea
                        style={{ margin: '0px' }}
                        placeholder={'Please enter note'}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </Flex>
              </Col>
            </Row>
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                height: '1px',
                margin: '12px 0',
              }}
            />
            <Flex
              style={{
                padding: '0 8px',
                display: !showError ? '' : 'none',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: dataTableResearch.length === 0 ? 'none' : '',
                }}
              >
                <Table
                  scroll={{
                    x: 'max-content',
                  }}
                  onRow={(record) => {
                    return {
                      onMouseEnter: (e) => {
                        // handleOnDoubleClick(e, record);
                        // console.log('vào', record.key);
                        setHoverKey(record.key);
                      },
                      onMouseLeave: (e) => {
                        // handleOnDoubleClick(e, record);
                        setHoverKey('');
                        // console.log('ra', record.key);
                      },
                    };
                  }}
                  columns={columns}
                  dataSource={dataTableResearch || []}
                  pagination={false}
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
                />
              </div>
            </Flex>
            <Flex style={{ padding: '0 8px' }}>
              <div
                style={{
                  width: '100%',
                  display: showError ? '' : 'none',
                }}
              >
                <Result title="Please contact ASL's staff to receive a quotation" />
              </div>
            </Flex>
          </Panel>
        </Collapse>
      </Form>
    </ConfigProvider>
  );
}
