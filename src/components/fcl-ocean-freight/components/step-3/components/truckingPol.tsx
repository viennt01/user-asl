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
  InputNumber,
  Input,
  Modal,
  Card,
  Table,
  Tag,
  PaginationProps,
} from 'antd';
import COLORS from '@/constants/color';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  API_BOOKING,
  API_LOAD_CAPACITY,
  API_LOCATION,
} from '@/fetcherAxios/endpoint';
import {
  getAllLoadCapacity,
  getAllLocation,
  getPriceTrucking,
} from '@/components/fcl-ocean-freight/fetcher';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  IQuotationTruckingRequire,
  IQuotationTruckingTable,
  IRequireSearchTrucking,
  TYPE_LOAD_CAPACITY,
  TYPE_LOCATION,
  TYPE_SERVICE,
} from '@/components/fcl-ocean-freight/interface';

interface Props {
  dataPropsBooking: IDataBookingProps;
}

import { useRouter } from 'next/router';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { ResponseWithPayload } from '@/fetcherAxios';
import { ColumnsType } from 'antd/lib/table';
import { ITypeDTOs } from '../../tableReturn';
import { TableRowSelection } from 'antd/lib/table/interface';
const { Panel } = Collapse;
const { Title } = Typography;
const dateFormat = 'YYYY/MM/DD';

const initalValueForm = {
  pickupID: '',
  deliveryID: '',
  typeService: TYPE_SERVICE.FCL,
  cargoReady: 1,
  commodities: [''],
  containers: [''],
  loadCapacities: [''],
  paginateRequest: {
    currentPage: DEFAULT_PAGINATION.current,
    pageSize: DEFAULT_PAGINATION.pageSize,
  },
};

export default function TruckingPol({ dataPropsBooking }: Props) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [dataTableResearch, setDataTableResearch] = useState<
    IQuotationTruckingTable[]
  >([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataResearch, setDataResearch] =
    useState<IRequireSearchTrucking>(initalValueForm);

  const onFinish = (formValues: IRequireSearchTrucking) => {
    // const _requestData = {
    //   pickupID: formValues.pickupID || '',
    //   deliveryID: dataPropsBooking?.dataColTableStep1?.podid || '',
    //   typeService: TYPE_SERVICE.FCL,
    //   loadCapacities: formValues.loadCapacities || [],
    //   commodities: dataPropsBooking?.step1?.commodities || [],
    //   containers: dataPropsBooking?.step1?.containers || [],
    //   cargoReady: formValues.cargoReady,
    //   paginateRequest: {
    //     currentPage: pagination.current,
    //     pageSize: pagination.pageSize,
    //   },
    // };

    // const _requestData = {
    //   pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
    //   deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
    //   typeService: 'FCL',
    //   cargoReady: 2222222,
    //   commodities: ['b8559fac-c496-4287-824c-0072a4c6a9fe'],
    //   containers: [
    //     'c7d25407-41c4-4652-a4ab-07c560c89050',
    //     '8682baf0-4159-4c2b-a149-af39628121fe',
    //     '5f9758fe-0e55-4883-8c79-90bcff124efd',
    //   ],
    //   loadCapacities: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
    //   paginateRequest: {
    //     currentPage: 1,
    //     pageSize: 10,
    //   },
    // };
    // setDataResearch(_requestData);
    // if (
    //   _requestData.pickupID === dataResearch.pickupID &&
    //   _requestData.loadCapacities === dataResearch.loadCapacities &&
    //   _requestData.cargoReady === dataResearch.cargoReady
    // ) {
    //   getPrice.refetch();
    // }

    setDataTableResearch([
      {
        key: 'b43e1c7a-2cfc-4a6d-b2f9-353d8c70c038',
        pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
        pickupName: 'MAARIANHAMINA/MARIEHAMN',
        deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
        deliveryName: 'CHAMPERICO',
        commodityID: 'b8559fac-c496-4287-824c-0072a4c6a9fe',
        commodityName: 'BULDING MATERIALS',
        truckingQuotationDetailDTOs: {
          "20' DC": '11.00000 VND',
          "20' GP": '11.00000 VND',
          "40' HC GOH": '11.00000 VND',
        },
      },
      {
        key: '7056db1f-a879-4e87-952b-36b1bcce1d94',
        pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
        pickupName: 'MAARIANHAMINA/MARIEHAMN',
        deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
        deliveryName: 'CHAMPERICO',
        commodityID: 'b8559fac-c496-4287-824c-0072a4c6a9fe',
        commodityName: 'BULDING MATERIALS',
        truckingQuotationDetailDTOs: {
          "20' DC": '11.00000 VND',
          "20' GP": '11.00000 VND',
          "40' HC GOH": '11.00000 VND',
        },
      },
      {
        key: 'd7191311-7c35-450e-8f6d-cfac9331c71e',
        pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
        pickupName: 'MAARIANHAMINA/MARIEHAMN',
        deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
        deliveryName: 'CHAMPERICO',
        commodityID: 'b8559fac-c496-4287-824c-0072a4c6a9fe',
        commodityName: 'BULDING MATERIALS',
        truckingQuotationDetailDTOs: {
          "20' DC": '11.00000 VND',
          "20' GP": '11.00000 VND',
          "40' HC GOH": '11.00000 VND',
        },
      },
      {
        key: '4066bab9-6f22-41e9-a207-fb8deea3ec3a',
        pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
        pickupName: 'MAARIANHAMINA/MARIEHAMN',
        deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
        deliveryName: 'CHAMPERICO',
        commodityID: 'b8559fac-c496-4287-824c-0072a4c6a9fe',
        commodityName: 'BULDING MATERIALS',
        truckingQuotationDetailDTOs: {
          "20' DC": '11.00000 VND',
          "20' GP": '11.00000 VND',
          "40' HC GOH": '11.00000 VND',
        },
      },
      {
        key: 'f1641491-a07c-4da3-bc89-031b3d94916b',
        pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
        pickupName: 'MAARIANHAMINA/MARIEHAMN',
        deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
        deliveryName: 'CHAMPERICO',
        commodityID: 'b8559fac-c496-4287-824c-0072a4c6a9fe',
        commodityName: 'BULDING MATERIALS',
        truckingQuotationDetailDTOs: {
          "20' DC": '11.00000 VND',
          "20' GP": '',
          "40' HC GOH": '',
        },
      },
      {
        key: '7b2b0959-1116-4bbd-ac2e-0f681179c117',
        pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
        pickupName: 'MAARIANHAMINA/MARIEHAMN',
        deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
        deliveryName: 'CHAMPERICO',
        commodityID: 'b8559fac-c496-4287-824c-0072a4c6a9fe',
        commodityName: 'BULDING MATERIALS',
        truckingQuotationDetailDTOs: {
          "20' DC": '11.00000 VND',
          "20' GP": '11.00000 VND',
          "40' HC GOH": '11.00000 VND',
        },
      },
      {
        key: '66a6cc2a-9dc3-423a-972e-167898a896fe',
        pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
        pickupName: 'MAARIANHAMINA/MARIEHAMN',
        deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
        deliveryName: 'CHAMPERICO',
        commodityID: 'b8559fac-c496-4287-824c-0072a4c6a9fe',
        commodityName: 'BULDING MATERIALS',
        truckingQuotationDetailDTOs: {
          "20' DC": '11.00000 VND',
          "20' GP": '',
          "40' HC GOH": '11.00000 VND',
        },
      },
      {
        key: 'dc3929ff-1cf0-4a2f-a029-25cbef6e7d3b',
        pickupID: '7dd273a3-adcc-4909-a5ad-00173e562e61',
        pickupName: 'MAARIANHAMINA/MARIEHAMN',
        deliveryID: '5a48b8f5-6814-42df-aa06-001b39c9d048',
        deliveryName: 'CHAMPERICO',
        commodityID: 'b8559fac-c496-4287-824c-0072a4c6a9fe',
        commodityName: 'BULDING MATERIALS',
        truckingQuotationDetailDTOs: {
          "20' DC": '11.00000 VND',
          "20' GP": '11.00000 VND',
          "40' HC GOH": '11.00000 VND',
        },
      },
    ]);
  };

  const getPrice = useQuery({
    queryKey: [API_BOOKING.SEARCH_TRUCKING_QUOTATION, dataResearch],
    queryFn: () => getPriceTrucking(dataResearch),
    enabled: dataResearch.pickupID !== '',
    onSuccess: (data: ResponseWithPayload<IQuotationTruckingRequire>) => {
      const { currentPage, pageSize, totalPages } = data.data;
      data.status
        ? data.data.data.length === 0
          ? warning()
          : (setDataTableResearch(
              data.data.data.map((data) => ({
                key: data.truckingQuotationID,
                pickupID: data.pickupID,
                pickupName: data.pickupName,
                deliveryID: data.deliveryID,
                deliveryName: data.deliveryName,
                commodityID: data.commodityID,
                commodityName: data.commodityName,
                truckingQuotationDetailDTOs: data.truckingQuotationDetailDTOs,
              }))
            ),
            setPagination({
              current: currentPage,
              pageSize: pageSize,
              total: totalPages,
            }))
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

  const getLoadCapacity = useQuery({
    queryKey: [API_LOAD_CAPACITY.GET_ALL],
    queryFn: () =>
      getAllLoadCapacity({
        type: TYPE_LOAD_CAPACITY.TRUCKING,
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

  const columns: ColumnsType<IQuotationTruckingTable> = [
    {
      title: <div className={style.title}>NO.</div>,
      dataIndex: 'index',
      width: 50,
      align: 'right',
      fixed: 'left',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    ...containerReturn,
  ];

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    pagination.current = page;
    pagination.pageSize = size;
    getPrice.refetch();
  };

  const rowSelection: TableRowSelection<IQuotationTruckingTable> = {
    type: 'radio',
    columnWidth: 48,
    selectedRowKeys,
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: IQuotationTruckingTable[]
    ) => {
      // Lưu giá trị được chọn vào state
      setSelectedRowKeys(selectedRowKeys);

      // Thực hiện các hành động khác nếu cần
      // Ví dụ: console.log giá trị được chọn
      console.log('Selected Row Keys:', selectedRowKeys);
      console.log('Selected Rows:', selectedRows);
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
                Trucking (POL)
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
                    <div className={style.titleInput}>Pick up address</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item
                      name="pickupID"
                      rules={[
                        {
                          required: true,
                          message: 'Please select pick up address',
                        },
                      ]}
                    >
                      <Select
                        style={{ margin: '0px' }}
                        showSearch
                        placeholder={'Please select pick up address'}
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
                      src={'/images/oceanFreight/weight.svg'}
                      alt="logo"
                      preview={false}
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
                        mode="multiple"
                        style={{ margin: '0px' }}
                        showSearch
                        placeholder={'Please select load capacity'}
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
              <Flex>
                <Image
                  src={'/images/oceanFreight/money.svg'}
                  alt="logo"
                  preview={false}
                  width={25}
                />
                <div
                  className={style.titleInput}
                  style={{
                    marginRight: '12px',
                    marginLeft: '12px',
                    width: '170px',
                    fontWeight: '700',
                    fontSize: '18px',
                  }}
                >
                  Price:
                </div>
              </Flex>
              <div
                style={{
                  width: '100%',
                  display: dataTableResearch.length === 0 ? 'none' : '',
                }}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Table: {
                        headerBg: 'rgb(202, 215, 238)',
                        headerColor: 'rgb(29, 68, 134)',
                        borderColor: '#000',
                      },
                    },
                  }}
                >
                  <Card>
                    <Table
                      scroll={{
                        x: 'max-content',
                      }}
                      columns={columns}
                      dataSource={dataTableResearch}
                      bordered
                      pagination={{
                        position: ['bottomRight'],
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${total} items`,
                        showSizeChanger: true,
                        ...pagination,
                        onChange: handlePaginationChange,
                      }}
                      rowSelection={rowSelection}
                    />
                  </Card>
                </ConfigProvider>
              </div>
            </Flex>
          </Panel>
        </Collapse>
      </Form>
    </ConfigProvider>
  );
}
