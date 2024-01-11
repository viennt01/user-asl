import React, { useState } from 'react';
import style from '../../index.module.scss';
import {
  Collapse,
  ConfigProvider,
  Flex,
  Typography,
  Table,
  Result,
  Form,
  Button,
  Row,
  Col,
  Image,
  Input,
} from 'antd';
import COLORS from '@/constants/color';
import {
  IDataBookingProps,
  IDataStep2Props,
} from '@/components/lcl-ocean-freight';
import { useQuery } from '@tanstack/react-query';
import { API_BOOKING } from '@/fetcherAxios/endpoint';
import { getPriceCustom } from '@/components/lcl-ocean-freight/fetcher';
import {
  IQuotationCustomsTable,
  IRequireSearchCustoms,
} from '@/components/lcl-ocean-freight/interface';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatNumber } from '@/utils/format-number';
import FeeOfCustoms, {
  ISeaQuotationFeeFormValue,
  ISubmitFeeCustoms,
} from './feeOfCustoms';
import { TYPE_POL_POD } from '../../description';
const { Panel } = Collapse;
const { Title, Text } = Typography;

interface Props {
  type: TYPE_POL_POD;
  dataPropsBooking: IDataBookingProps;
  setSubmitFeeCustoms: React.Dispatch<
    React.SetStateAction<ISubmitFeeCustoms[]>
  >;
  setSelectedRowKey: React.Dispatch<React.SetStateAction<string>>;
  selectedRowKey: string;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}
const initalValueForm = {
  cargoReady: 22222222222222,
  commodityID: '',
};

export default function Customs({
  type,
  dataPropsBooking,
  setSubmitFeeCustoms,
  setSelectedRowKey,
  selectedRowKey,
  dataStep2PropsBooking,
}: Props) {
  const [form] = Form.useForm();
  const [dataAPIResearch, setDataAPIResearch] = useState<
    IQuotationCustomsTable[]
  >([]);
  const [dataResearch, setDataResearch] =
    useState<IRequireSearchCustoms>(initalValueForm);
  const [showError, setShowError] = useState<boolean>(false);
  const [dataFee, setDataFee] = useState<ISeaQuotationFeeFormValue[]>([]);

  const getPrice = useQuery({
    queryKey: [
      API_BOOKING.RECOMMEND_CUSTOM_QUOTATION_FOR_BOOKING,
      dataResearch,
    ],
    queryFn: () => getPriceCustom(dataResearch),
    enabled: dataResearch.typeDeclarationName !== undefined,
    onSuccess: (data) => {
      data.status
        ? data.data
          ? (setDataAPIResearch(
              data.data.map((data) => ({
                key: data.customQuotationID,
                typeDelaracrionID: data.typeDelaracrionID,
                typeDelaracrionCode: data.typeDelaracrionCode,
                transactionTypeID: data.transactionTypeID,
                transactionTypeName: data.transactionTypeName,
                currencyID: data.currencyID,
                abbreviations: data.abbreviations,
                commodityID: data.commodityID,
                commodityName: data.commodityName,
                listFeeGroup: data.listFeeGroup,
                customQuotationLCLDetailForBooking:
                  data.customQuotationLCLDetailForBooking,
              }))
            ),
            setShowError(false))
          : setShowError(true)
        : setShowError(true);
    },
    onError() {
      setShowError(true);
    },
  });

  const columns: ColumnsType<IQuotationCustomsTable> = [
    {
      title: (
        <Text color={'green'} style={{ color: 'green' }}>
          Green Router
        </Text>
      ),
      dataIndex: 'priceGreenLane',
      align: 'center',
      render: (value, record) => {
        return formatNumber(
          Number(record.customQuotationLCLDetailForBooking?.priceGreenLane) ||
            '0'
        );
      },
    },
    {
      title: <Text style={{ color: '#d4b106' }}>Yellow Router</Text>,
      dataIndex: 'priceYellowLane',
      align: 'center',
      render: (value, record) => {
        return formatNumber(
          Number(record.customQuotationLCLDetailForBooking?.priceYellowLane) ||
            '0'
        );
      },
    },
    {
      title: <Text style={{ color: '#cf1322' }}>Red Router</Text>,
      dataIndex: 'priceRedLane',
      align: 'center',
      render: (value, record) => {
        return formatNumber(
          Number(record.customQuotationLCLDetailForBooking?.priceRedLane) || '0'
        );
      },
    },
  ];

  const onFinish = (formValues: IRequireSearchCustoms) => {
    const _requestData = {
      polid: dataPropsBooking.dataQuotation?.polid || '',
      podid: dataPropsBooking.dataQuotation?.podid || '',
      customsService: type,
      typeDeclarationName: formValues.typeDeclarationName || '',
      cargoReady: dataPropsBooking?.step1?.cargoReady?.valueOf() || 1,
      commodityID: dataPropsBooking.dataColTableStep1?.commodityID || '',
    };
    setDataResearch(_requestData);
    if (_requestData.cargoReady === dataResearch.cargoReady) {
      getPrice.refetch();
    }
  };
  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: IQuotationCustomsTable[]
    ) => {
      setSelectedRowKey((selectedRowKeys?.[0] as string) || '');
      setSubmitFeeCustoms([]);
      setDataFee(
        selectedRows.find((item) => item.key === selectedRowKeys[0])
          ?.listFeeGroup || []
      );
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
              <Title level={4} style={{ margin: '4px 0' }}>
                Customs ({type === TYPE_POL_POD.POD ? 'DESTINATION' : 'ORIGIN'})
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
                    <div className={style.titleInput}>{'Type Declaration'}</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item name={'typeDeclarationName'}>
                      <Input
                        style={{ margin: '0px' }}
                        placeholder={'Please enter type declaration'}
                        size="large"
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
                display: !showError ? '' : 'none',
              }}
            >
              <div
                style={{
                  display: dataAPIResearch.length === 0 ? 'none' : '',
                }}
              >
                <Flex style={{ padding: '0 8px 16px 0' }}>
                  <Table
                    scroll={{
                      x: 'max-content',
                    }}
                    style={{ width: '100%' }}
                    columns={columns}
                    dataSource={dataAPIResearch || []}
                    pagination={false}
                    rowSelection={{
                      type: 'radio',
                      ...rowSelection,
                    }}
                  />
                </Flex>
                <div
                  style={{
                    display: selectedRowKey === '' ? 'none' : '',
                  }}
                >
                  <FeeOfCustoms
                    dataFee={dataFee}
                    setSubmitFeeCustoms={setSubmitFeeCustoms}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: showError ? '' : 'none',
              }}
            >
              <Flex style={{ padding: '0 8px' }}>
                <div
                  style={{
                    width: '100%',
                  }}
                >
                  <Result title="Please contact ASL's staff to receive a quotation" />
                </div>
              </Flex>
            </div>
          </Panel>
        </Collapse>
      </Form>
    </ConfigProvider>
  );
}
