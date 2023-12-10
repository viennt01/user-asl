import React, { useMemo, useState } from 'react';
import style from '../index.module.scss';
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
  Modal,
  Table,
  Tag,
} from 'antd';
import COLORS from '@/constants/color';
import { useQuery } from '@tanstack/react-query';
import { API_BOOKING, API_LOCATION } from '@/fetcherAxios/endpoint';
import {
  getAllLocation,
  getPriceTrucking,
} from '@/components/fcl-ocean-freight/fetcher';
import {
  IQuotationTrucking,
  IQuotationTruckingTable,
  IRequireSearchTrucking,
  TYPE_LOCATION,
  TYPE_SERVICE,
} from '@/components/fcl-ocean-freight/interface';
import { useRouter } from 'next/router';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { ResponseWithPayload } from '@/fetcherAxios';
import { ColumnsType } from 'antd/lib/table';
import { ITypeDTOs } from '../../tableReturn';
import { TableRowSelection } from 'antd/lib/table/interface';
import { TYPE_POL_POD } from '../description';
interface Props {
  dataPropsBooking: IDataBookingProps;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  type: TYPE_POL_POD;
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
  containers: [''],
  loadCapacities: [''],
};

export default function Trucking({
  dataPropsBooking,
  selectedRowKeys,
  setSelectedRowKeys,
  type,
}: Props) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [dataTableResearch, setDataTableResearch] = useState<
    IQuotationTruckingTable[]
  >([]);
  const [dataResearch, setDataResearch] =
    useState<IRequireSearchTrucking>(initalValueForm);
  const onFinish = (formValues: IRequireSearchTrucking) => {
    const _requestData =
      type === TYPE_POL_POD.POD
        ? {
            deliveryID: formValues.deliveryID || '',
            pickupID: dataPropsBooking.dataQuotation?.podid || '',
            typeSeaService: TYPE_SERVICE.FCL,
            commodityID: dataPropsBooking.dataColTableStep1?.commodityID || '',
            containers: dataPropsBooking?.step1?.containers || [],
            cargoReady: dataPropsBooking?.step1?.cargoReady?.valueOf() || 1,
          }
        : {
            pickupID: formValues.pickupID || '',
            deliveryID: dataPropsBooking?.dataQuotation?.polid || '',
            typeSeaService: TYPE_SERVICE.FCL,
            commodityID: dataPropsBooking.dataColTableStep1?.commodityID || '',
            containers: dataPropsBooking?.step1?.containers || [],
            cargoReady: dataPropsBooking?.step1?.cargoReady?.valueOf() || 1,
          };
    setDataResearch(_requestData);
    if (
      _requestData.pickupID === dataResearch.pickupID &&
      // _requestData.loadCapacities === dataResearch.loadCapacities &&
      _requestData.cargoReady === dataResearch.cargoReady
    ) {
      getPrice.refetch();
    }
  };

  const getPrice = useQuery({
    queryKey: [
      API_BOOKING.RECOMMEND_TRUCKING_QUOTATION_FOR_BOOKING,
      dataResearch,
    ],
    queryFn: () => getPriceTrucking(dataResearch),
    enabled: dataResearch.pickupID !== '',
    onSuccess: (data: ResponseWithPayload<IQuotationTrucking>) => {
      data.status
        ? data.data
          ? setDataTableResearch([
              {
                key: data.data.truckingQuotationID,
                pickupID: data.data.pickupID,
                pickupName: data.data.pickupName,
                deliveryID: data.data.deliveryID,
                deliveryName: data.data.deliveryName,
                commodityID: data.data.commodityID,
                commodityName: data.data.commodityName,
                truckingQuotationDetailDTOs:
                  data.data.truckingQuotationDetailDTOs,
              },
            ])
          : warning()
        : warning();
    },
    onError() {
      warning();
    },
  });

  const getLocation = useQuery({
    queryKey: [API_LOCATION.GET_ALL],
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

  const warning = () => {
    Modal.warning({
      title: 'Your request did not match any existing records.',
    });
  };

  const containerReturn = useMemo(() => {
    const result = [];
    if (dataTableResearch) {
      for (const key in dataTableResearch[0]?.truckingQuotationDetailDTOs) {
        if (
          dataTableResearch[0].truckingQuotationDetailDTOs.hasOwnProperty(key)
        ) {
          const obj = {
            title: (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {key}
              </div>
            ),
            dataIndex: 'truckingQuotationDetailDTOs',
            render: (value: ITypeDTOs) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Tag
                    color="#F2F48E"
                    style={{ color: '#000', fontWeight: '450' }}
                  >{`${value[key]}`}</Tag>
                </div>
              );
            },
          };
          result.push(obj);
        }
      }
    }
    return result;
  }, [dataTableResearch]);

  const columns: ColumnsType<IQuotationTruckingTable> = [...containerReturn];

  const rowSelection: TableRowSelection<IQuotationTruckingTable> = {
    type: 'checkbox',
    columnWidth: 48,
    selectedRowKeys,
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: IQuotationTruckingTable[]
    ) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    hideSelectAll: true,
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
            <Flex style={{ padding: '0 8px' }}>
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
                  columns={columns}
                  dataSource={dataTableResearch}
                  pagination={false}
                  rowSelection={rowSelection}
                />
              </div>
            </Flex>
          </Panel>
        </Collapse>
      </Form>
    </ConfigProvider>
  );
}
