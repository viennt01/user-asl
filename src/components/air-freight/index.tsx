import React, { useState } from 'react';
import style from './index.module.scss';
import { Flex, Form, PaginationProps } from 'antd';
import HeaderFclOceanFreight from './components/header';
import InputFclOceanFreight from './components/inputSearch';
import Step2 from './components/step-2';
import Step3 from './components/step-3';
import Step4 from './components/step-4';
import Step5 from './components/step-5';
import Service from '../home-page/components/service';
import {
  IDetailBooking,
  IQuotationRequire,
  IQuotationTable,
  IRequireSearchQuotation,
  ISeaBookingLCLDetailRegisterRequest,
  ISeaPricingDetail,
  IStep1,
  ITypeOfTransport,
} from './interface';
import { useQuery } from '@tanstack/react-query';
import { searchQuotation } from './fetcher';
import { API_BOOKING, API_TYPE_OF_TRANSPORT } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import { getListTypeTransport } from '../fcl-ocean-freight/fetcher';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '../fcl-ocean-freight/interface';

export interface IQuantity {
  key: string;
  quantity: string;
  name: string;
}

export interface IDataBookingProps {
  idBooking?: string;
  idQuotation: string;
  dataQuotation?: ISeaPricingDetail;
  dataColTableStep1?: IQuotationTable;
  step1?: IStep1;
  listContainerType?: { label: string; value: string }[];
  detailBooking?: IDetailBooking;
}

export const initalValueProps = {
  idQuotation: '',
  idBooking: '',
};

export interface IDataStep2Props {
  packageBookingLCLDetail?: ISeaBookingLCLDetailRegisterRequest;
  listQuantityType?: IQuantity[];
}

export const initalValueForm = {
  aolid: '',
  aodid: '',
  cargoReady: 1,
  commodities: [''],
  paginateRequest: {
    currentPage: DEFAULT_PAGINATION.current,
    pageSize: DEFAULT_PAGINATION.pageSize,
  },
};

export default function AirFreight() {
  const [form] = Form.useForm();
  const [dataTableResearch, setDataTableResearch] = useState<IQuotationTable[]>(
    []
  );
  const [dataResearch, setDataResearch] =
    useState<IRequireSearchQuotation>(initalValueForm);
  const [displayStep, setDisplayStep] = useState<number>(1);
  const [dataPropsBooking, setDataPropsBooking] =
    useState<IDataBookingProps>(initalValueProps);
  const [dataStep2PropsBooking, setDataStep2PropsBooking] =
    useState<IDataStep2Props>();
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const [showError, setShowError] = useState<boolean>(false);

  const getTypeTransport = useQuery(
    [API_TYPE_OF_TRANSPORT.GET_ALL],
    getListTypeTransport
  );

  const searchQuotationsMutation = useQuery({
    queryKey: [API_BOOKING.SEARCH_SEA, dataResearch],
    queryFn: () => searchQuotation(dataResearch),
    enabled: dataResearch.aolid !== '',
    onSuccess: (data: ResponseWithPayload<IQuotationRequire>) => {
      if (data.data) {
        const { currentPage, pageSize, totalPages } = data?.data;
        data.status
          ? data.data.data.length === 0
            ? (setShowError(true), setDataTableResearch([]))
            : (setDataTableResearch(
                data.data.data.map((data) => ({
                  key: data.airQuotationID,
                  aodName: data.aodName,
                  aolName: data.aolName,
                  commodityName: data.commodityName,
                  currencyAbbreviations: data.currencyAbbreviations,
                  freqDate: data.freqDate,
                  fscAirQuotation: data.fscAirQuotation,
                  loadCapacityMinAirQuotation: data.loadCapacityMinAirQuotation,
                  priceLoadCapacityMinAirQuotation:
                    data.priceLoadCapacityMinAirQuotation,
                  sscAirQuotation: data.sscAirQuotation,
                  transitTimeAirQuotation: data.transitTimeAirQuotation,
                  vendorName: data.vendorName,
                  airQuotationDetailDTOs: data.airQuotationDetailDTOs,
                }))
              ),
              setPagination({
                current: currentPage,
                pageSize: pageSize,
                total: totalPages,
              }),
              setShowError(false))
          : (setShowError(true), setDataTableResearch([]));
      } else {
        setShowError(true), setDataTableResearch([]);
      }
    },
    onError() {
      setShowError(true);
      setDataTableResearch([]);
    },
  });

  const onFinish = (formValues: IStep1) => {
    const _requestData = {
      aolid: formValues.aolid,
      aodid: formValues.aodid,
      cargoReady: formValues.cargoReady?.valueOf(),
      commodities: [formValues.commodities],
      paginateRequest: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      },
    };
    setDataPropsBooking((pre) => ({
      ...pre,
      step1: {
        aolid: formValues.aolid,
        aodid: formValues.aodid,
        trafficPol: getTypeTransport?.data?.data.find(
          (item: ITypeOfTransport) =>
            item.typeOfTransportID === formValues.trafficPol
        ),
        trafficPod: getTypeTransport?.data?.data.find(
          (item: ITypeOfTransport) =>
            item.typeOfTransportID === formValues.trafficPod
        ),
        receipt: formValues.receipt,
        delivery: formValues.delivery,
        commodities: formValues.commodities,
        cargoReady: formValues.cargoReady,
        cargoCutOffDated: formValues.cargoCutOffDated,
      },
    }));
    setDataResearch(_requestData);
    if (
      _requestData.aolid === dataResearch.aolid &&
      _requestData.aodid === dataResearch.aodid &&
      _requestData.cargoReady === dataResearch.cargoReady &&
      _requestData.commodities === dataResearch.commodities
    ) {
      searchQuotationsMutation.refetch();
    }
  };
  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    pagination.current = page;
    pagination.pageSize = size;
    searchQuotationsMutation.refetch();
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <section className={style.wrapper}>
      <div className={style.bg}>
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex>
                <h1>Air Freight</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Watch how your cargo travels with ASL and learn how we can
                  help with each step!
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex className={style.checkPrice} vertical>
        <div className={style.content}>
          <HeaderFclOceanFreight displayStep={displayStep} />
          <InputFclOceanFreight
            displayStep={displayStep}
            form={form}
            onFinish={onFinish}
            onReset={onReset}
            loading={searchQuotationsMutation.isFetching}
            getTypeTransport={getTypeTransport}
            setDisplayStep={setDisplayStep}
            dataTableResearch={dataTableResearch}
            setDataPropsBooking={setDataPropsBooking}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            showError={showError}
          />
          <Step2
            displayStep={displayStep}
            setDisplayStep={setDisplayStep}
            dataPropsBooking={dataPropsBooking}
            setDataPropsBooking={setDataPropsBooking}
            setDataStep2PropsBooking={setDataStep2PropsBooking}
            dataStep2PropsBooking={dataStep2PropsBooking}
          />
          <Step3
            displayStep={displayStep}
            setDisplayStep={setDisplayStep}
            dataStep2PropsBooking={dataStep2PropsBooking}
            dataPropsBooking={dataPropsBooking}
            setDataPropsBooking={setDataPropsBooking}
          />
          <Step4
            displayStep={displayStep}
            setDisplayStep={setDisplayStep}
            dataPropsBooking={dataPropsBooking}
            setDataPropsBooking={setDataPropsBooking}
          />
          <Step5
            displayStep={displayStep}
            dataPropsBooking={dataPropsBooking}
          />
        </div>
      </Flex>
      <Service />
    </section>
  );
}
