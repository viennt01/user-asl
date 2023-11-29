import React, { useEffect, useState } from 'react';
import style from '../index.module.scss';
import {
  Collapse,
  ConfigProvider,
  Flex,
  Form,
  Typography,
  Image,
  Tag,
  Table,
  PaginationProps,
  Card,
} from 'antd';
import COLORS from '@/constants/color';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { useQuery } from '@tanstack/react-query';
import { API_BOOKING, API_FEE_GROUP } from '@/fetcherAxios/endpoint';
import {
  getFeeWithFeeGroup,
  getPriceCustom,
} from '@/components/fcl-ocean-freight/fetcher';
import { ResponseWithPayload } from '@/fetcherAxios';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  IQuotationCustomsRequire,
  IQuotationCustomsTable,
  IRequireSearchCustoms,
} from '@/components/fcl-ocean-freight/interface';
import {
  ColumnsType,
  TableRowSelection,
} from 'antd/lib/table/interface';
import { formatNumber } from '@/utils/format-number';
import FeeOfCustoms from './feeOfCustoms';
const { Panel } = Collapse;
const { Title } = Typography;

interface Props {
  dataPropsBooking: IDataBookingProps;
}
const initalValueForm = {
  cargoReady: 1,
  // commodities: [],
  paginateRequest: {
    currentPage: DEFAULT_PAGINATION.current,
    pageSize: DEFAULT_PAGINATION.pageSize,
  },
};

export default function Customs({ dataPropsBooking }: Props) {
  const [form] = Form.useForm();
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [dataTableResearch, setDataTableResearch] = useState<
    IQuotationCustomsTable[]
  >([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<IQuotationCustomsTable[]>([]);
  const [dataResearch, setDataResearch] =
    useState<IRequireSearchCustoms>(initalValueForm);

  useEffect(() => {
    const _requestData = {
      cargoReady: dataPropsBooking?.step1?.cargoReady?.valueOf() || 1,
      commodities: dataPropsBooking?.step1?.commodities || [],
      paginateRequest: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      },
    };
    setDataResearch(_requestData);
  }, [dataPropsBooking]);

  const getPrice = useQuery({
    queryKey: [API_BOOKING.SEARCH_CUSTOMS_QUOTATION, dataResearch],
    queryFn: () => getPriceCustom(dataResearch),
    enabled: dataResearch.commodities !== undefined,
    onSuccess: (data: ResponseWithPayload<IQuotationCustomsRequire>) => {
      const { currentPage, pageSize, totalPages } = data.data;
      data.status
        ? (setDataTableResearch(
            data.data.data.map((data) => ({
              key: data.customQuotationID,
              typeDelaracrionID: data.typeDelaracrionID,
              typeDelaracrionCode: data.typeDelaracrionCode,
              transactionTypeID: data.transactionTypeID,
              transactionTypeName: data.transactionTypeName,
              currencyID: data.currencyID,
              abbreviations: data.abbreviations,
              commodityID: data.commodityID,
              commodityName: data.commodityName,
              customRedPrice: data.customRedPrice,
              customYellowPrice: data.customYellowPrice,
              customGreenPrice: data.customGreenPrice,
              listFeeGroup: data.listFeeGroup,
            }))
          ),
          setPagination({
            current: currentPage,
            pageSize: pageSize,
            total: totalPages,
          }))
        : setDataTableResearch([]);
    },
  });

  const columns: ColumnsType<IQuotationCustomsTable> = [
    {
      title: (
        <Flex align="center" justify="center">
          NO.
        </Flex>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      fixed: 'left',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    {
      title: (
        <Flex align="center" justify="center">
          Green Price
        </Flex>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        return (
          <Tag
            color="green"
            style={{
              height: '30px',
              fontWeight: '700',
              fontSize: '18px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {record.abbreviations}{' '}
            {record.customGreenPrice
              ? formatNumber(Number(record.customGreenPrice) || 0)
              : '-'}
          </Tag>
        );
      },
    },
    {
      title: (
        <Flex align="center" justify="center">
          Yellow Price
        </Flex>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        return (
          <Tag
            color="yellow"
            style={{
              height: '30px',
              fontWeight: '700',
              fontSize: '18px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {record.abbreviations}{' '}
            {record.customYellowPrice
              ? formatNumber(Number(record.customYellowPrice) || 0)
              : '-'}
          </Tag>
        );
      },
    },
    {
      title: (
        <Flex align="center" justify="center">
          Red Price
        </Flex>
      ),
      dataIndex: 'index',
      width: 50,
      align: 'center',
      render: (_, record, index) => {
        return (
          <Tag
            color="red"
            style={{
              height: '30px',
              fontWeight: '700',
              fontSize: '18px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {record.abbreviations}{' '}
            {record.customRedPrice
              ? formatNumber(Number(record.customRedPrice) || 0)
              : '-'}
          </Tag>
        );
      },
    },
  ];

  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    pagination.current = page;
    pagination.pageSize = size;
    getPrice.refetch();
  };

  const rowSelection: TableRowSelection<IQuotationCustomsTable> = {
    type: 'radio',
    columnWidth: 48,
    selectedRowKeys,
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: IQuotationCustomsTable[]
    ) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRow(selectedRows);
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
          Table: {
            headerBg: COLORS.GREY_COLOR_HOVER,
            headerColor: COLORS.WHITE,
          },
        },
      }}
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
              Customs (POL)
            </Title>
          }
          key="1"
        >
          <Flex style={{ padding: '0 8px 16px 0' }}>
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
            <Card
              title={
                <Title level={4} style={{ margin: '4px 0' }}>
                  Select price
                </Title>
              }
              style={{
                width: '100%',
              }}
            >
              <Table
                showHeader={false}
                scroll={{
                  x: 'max-content',
                }}
                style={{ width: '100%' }}
                columns={columns}
                dataSource={dataTableResearch}
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
          </Flex>
          <FeeOfCustoms
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
        </Panel>
      </Collapse>
    </ConfigProvider>
  );
}
