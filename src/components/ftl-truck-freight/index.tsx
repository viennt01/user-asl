import React, { useState } from 'react';
import style from './index.module.scss';
import { Flex, Form, PaginationProps } from 'antd';
import HeaderFclOceanFreight from './components/header';
import InputFclOceanFreight from './components/inputSearch';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '@/components/fcl-ocean-freight/interface';
import Step2 from './components/step-2';
import Step4 from './components/step-4';
import Step5 from './components/step-5';
import Service from '../home-page/components/service';
import {
  IDetailBooking,
  IQuotationRequire,
  IQuotationTable,
  IRequireSearchQuotation,
  IQuotationDetail,
  IStep1,
} from './interface';
import { useQuery } from '@tanstack/react-query';
import { searchQuotation } from './fetcher';
import { errorToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import {
  API_BOOKING,
  API_CONTAINER_TYPE,
  API_TYPE_OF_TRANSPORT,
} from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import { useRouter } from 'next/router';
import { IQuantity } from './components/step-2/description';
import {
  getAllContainerType,
  getListTypeTransport,
} from '@/components/fcl-ocean-freight/fetcher';
import { TYPE_SERVICE } from '../history-booking/interface';

export interface IDataBookingProps {
  idBooking?: string;
  idQuotation: string;
  dataQuotation?: IQuotationDetail;
  dataColTableStep1?: IQuotationTable;
  step1?: IStep1;
  listContainerType?: { label: string; value: string }[];
  listQuantityType?: IQuantity[];
  detailBooking?: IDetailBooking;
}

export const initalValueProps = {
  idQuotation: '',
  idBooking: '',
};

export interface IDataStep2Props {
  listQuantityType?: IQuantity[];
}

export const initalValueForm = {
  pickupID: '',
  deliveryID: '',
  typeSeaService: TYPE_SERVICE.FTL,
  cargoReady: 1,
  commodities: [''],
  containers: [''],
  paginateRequest: {
    currentPage: DEFAULT_PAGINATION.current,
    pageSize: DEFAULT_PAGINATION.pageSize,
  },
};

export default function FtlTruckFreight() {
  const router = useRouter();
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

  const getTypeTransport = useQuery(
    [API_TYPE_OF_TRANSPORT.GET_ALL],
    getListTypeTransport
  );

  const searchQuotationsMutation = useQuery({
    queryKey: [API_BOOKING.SEARCH_SEA, dataResearch],
    queryFn: () => searchQuotation(dataResearch),
    enabled: dataResearch.pickupID !== '',
    onSuccess: (data: ResponseWithPayload<IQuotationRequire>) => {
      if (data.data) {
        const { currentPage, pageSize, totalPages } = data.data;
        data.status
          ? data.data.data.length === 0
            ? (setShowError(true), setDataTableResearch([]))
            : (setDataTableResearch(
                data.data.data.map((data) => ({
                  key: data.truckingQuotationID,
                  deliveryID: data.deliveryID,
                  deliveryName: data.deliveryName,
                  pickupID: data.pickupID,
                  pickupName: data.pickupName,
                  commodityID: data.commodityID,
                  commodityName: data.commodityName,
                  truckingQuotationDetailDTOs: data.truckingQuotationDetailDTOs,
                }))
              ),
              setPagination({
                current: currentPage,
                pageSize: pageSize,
                total: totalPages,
              }),
              setShowError(false))
          : (errorToast(data.message),
            setShowError(true),
            setDataTableResearch([]));
      } else {
        errorToast(data.message), setShowError(true), setDataTableResearch([]);
      }
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
      setShowError(true);
      setDataTableResearch([]);
    },
  });

  const onFinish = (formValues: IRequireSearchQuotation) => {
    const _requestData = {
      pickupID: formValues.pickupID,
      deliveryID: formValues.deliveryID,
      typeSeaService: TYPE_SERVICE.FTL,
      cargoReady: formValues.cargoReady?.valueOf(),
      commodities: formValues.commodities,
      containers: formValues.containers,
      paginateRequest: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      },
    };
    setDataPropsBooking((pre) => ({
      ...pre,
      step1: {
        receipt: formValues.receipt,
        delivery: formValues.delivery,
        containers: formValues.containers,
        commodities: formValues.commodities,
        cargoReady: formValues.cargoReady,
      },
      listContainerType:
        formValues.containers?.map((selectedValue: string) => {
          const containerType = getContainerType.data?.data.find(
            (item) => item.containerTypeID === selectedValue
          );
          return {
            value: selectedValue,
            label: containerType?.code || '',
          };
        }) || [],
    }));
    console.log(2);

    setDataResearch(_requestData);
    if (
      _requestData.pickupID === dataResearch.pickupID &&
      _requestData.deliveryID === dataResearch.deliveryID &&
      _requestData.cargoReady === dataResearch.cargoReady &&
      _requestData.commodities === dataResearch.commodities &&
      _requestData.containers === dataResearch.containers
    ) {
      console.log(1);

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
                <h1>Ocean Freight</h1>
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
            getContainerType={getContainerType}
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
