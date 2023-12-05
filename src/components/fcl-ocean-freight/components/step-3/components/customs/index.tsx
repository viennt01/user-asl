import React, { useEffect, useState } from 'react';
import style from '../../index.module.scss';
import {
  Collapse,
  ConfigProvider,
  Flex,
  Typography,
  Tag,
  Table,
  PaginationProps,
  Card,
} from 'antd';
import COLORS from '@/constants/color';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { useQuery } from '@tanstack/react-query';
import { API_BOOKING, API_UNIT } from '@/fetcherAxios/endpoint';
import {
  getListTypeUnit,
  getPriceCustom,
} from '@/components/fcl-ocean-freight/fetcher';
import { ResponseWithPayload } from '@/fetcherAxios';
import {
  DEFAULT_PAGINATION,
  ICustomQuotationFCLDetailForBookings,
  IPaginationOfAntd,
  IQuotationCustoms,
  IQuotationCustomsRequire,
  IQuotationCustomsTable,
  IRequireSearchCustoms,
  TYPE_UNIT,
} from '@/components/fcl-ocean-freight/interface';
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface';
import { formatNumber } from '@/utils/format-number';
import FeeOfCustoms, { ISubmitFeeCustoms } from './feeOfCustoms';
import { TYPE_POL_POD } from '../../description';
const { Panel } = Collapse;
const { Title, Text } = Typography;

interface Props {
  type: TYPE_POL_POD;
  dataPropsBooking: IDataBookingProps;
  setSubmitFeeCustoms: React.Dispatch<
    React.SetStateAction<ISubmitFeeCustoms[]>
  >;
}
const initalValueForm = {
  cargoReady: 22222222222222,
  commodityID: '888f5c7f-3e74-45e8-9b74-cac0aa9c32ab',
};

export default function Customs({
  type,
  dataPropsBooking,
  setSubmitFeeCustoms,
}: Props) {
  const [dataAPIResearch, setDataAPIResearch] = useState<IQuotationCustoms>();
  const [dataResearch, setDataResearch] =
    useState<IRequireSearchCustoms>(initalValueForm);
  const [dataUnit, setDataUnit] = useState<{ label: string; value: string }[]>(
    []
  );

  useQuery({
    queryKey: [API_UNIT.GET_ALL],
    queryFn: () => getListTypeUnit({ typeUnit: TYPE_UNIT.SEA }),
    onSuccess: (data) => {
      if (data.status) {
        const newData = data.data.map((unit) => ({
          label: unit.internationalCode,
          value: unit.unitID,
        }));
        setDataUnit(newData);
      }
    },
  });

  useEffect(() => {
    // const _requestData = {
    //   cargoReady: dataPropsBooking?.step1?.cargoReady?.valueOf() || 1,
    //   commodityID: dataPropsBooking.dataColTableStep1?.commodityID || '',
    // };
    const _requestData = {
      cargoReady: 22222222222222,
      commodityID: '888f5c7f-3e74-45e8-9b74-cac0aa9c32ab',
    };
    setDataResearch(_requestData);
  }, [dataPropsBooking]);

  useQuery({
    queryKey: [
      API_BOOKING.RECOMMEND_CUSTOM_QUOTATION_FOR_BOOKING,
      dataResearch,
    ],
    queryFn: () => getPriceCustom(dataResearch),
    enabled: dataResearch.commodityID !== undefined,
    onSuccess: (data: ResponseWithPayload<IQuotationCustoms>) => {
      if (data.status) {
        setDataAPIResearch({
          customQuotationID: data.data.customQuotationID,
          typeDelaracrionID: data.data.typeDelaracrionID,
          typeDelaracrionCode: data.data.typeDelaracrionCode,
          transactionTypeID: data.data.transactionTypeID,
          transactionTypeName: data.data.transactionTypeName,
          currencyID: data.data.currencyID,
          abbreviations: data.data.abbreviations,
          commodityID: data.data.commodityID,
          commodityName: data.data.commodityName,
          listFeeGroup: data.data.listFeeGroup,
          customQuotationFCLDetailForBookings:
            data.data.customQuotationFCLDetailForBookings,
        });
      }
    },
  });

  const columns: ColumnsType<ICustomQuotationFCLDetailForBookings> = [
    {
      title: 'Unit',
      dataIndex: 'unitID',
      align: 'center',
      render: (value) => {
        return dataUnit.find((item) => item.value === value)?.label;
      },
    },
    {
      title: <Text style={{ color: 'green' }}>Base Green Lane</Text>,
      dataIndex: 'basePriceGreenLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <Text style={{ color: '#d4b106' }}>Base Yellow Lane</Text>,
      dataIndex: 'basePriceYellowLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <Text style={{ color: '#cf1322' }}>Base Red Lane</Text>,
      dataIndex: 'basePriceRedLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: (
        <Text color={'green'} style={{ color: 'green' }}>
          Green Lane
        </Text>
      ),
      dataIndex: 'priceGreenLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <Text style={{ color: '#d4b106' }}>Yellow Lane</Text>,
      dataIndex: 'priceYellowLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
    {
      title: <Text style={{ color: '#cf1322' }}>Red Lane</Text>,
      dataIndex: 'priceRedLane',
      align: 'center',
      render: (value) => {
        return formatNumber(Number(value) || 0);
      },
    },
  ];

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
            // headerBg: COLORS.GREY_COLOR_HOVER,
            // headerColor: COLORS.WHITE,
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
              Customs ({type === TYPE_POL_POD.POD ? 'DESTINATION' : 'ORIGIN'})
            </Title>
          }
          key="1"
        >
          <Flex style={{ padding: '0 8px 16px 0' }}>
            <Table
              scroll={{
                x: 'max-content',
              }}
              style={{ width: '100%' }}
              columns={columns}
              dataSource={dataAPIResearch?.customQuotationFCLDetailForBookings}
              pagination={false}
            />
          </Flex>
          <FeeOfCustoms
            dataAPIResearch={dataAPIResearch}
            setSubmitFeeCustoms={setSubmitFeeCustoms}
          />
        </Panel>
      </Collapse>
    </ConfigProvider>
  );
}
