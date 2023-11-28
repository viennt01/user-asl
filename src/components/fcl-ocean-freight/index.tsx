import React, { useState } from 'react';
import style from './index.module.scss';
import { Flex, Form, Modal, PaginationProps } from 'antd';
import HeaderFclOceanFreight from './components/header';
import InputFclOceanFreight from './components/inputSearch';
import TableReturn from './components/tableReturn';
import Step2 from './components/step-2';
import Step3 from './components/step-3';
import Step4 from './components/step-4';
import Step5 from './components/step-5';
import Service from '../home-page/components/service';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
  IQuotationRequire,
  IQuotationTable,
  IRequireSearchQuotation,
  ISeaPricingDetail,
  IStep1,
  TYPE_SERVICE,
} from './interface';
import { useQuery } from '@tanstack/react-query';
import { getAllContainerType, searchQuotation } from './fetcher';
import { errorToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import {
  API_BOOKING,
  API_CONTAINER_TYPE,
  API_LOCATION,
} from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';
import { useRouter } from 'next/router';
import { IQuantity } from './components/step-2/editDescription';

export interface IDataBookingProps {
  idQuotation: string;
  dataQuotation?: ISeaPricingDetail;
  dataColTableStep1?: IQuotationTable;
  step1?: IStep1;
  listContainerType?: { label: string; value: string }[];
  listQuantityType?: IQuantity[];
}

export const initalValueProps = {
  idQuotation: '',
};

export interface IDataStep2Props {
  listQuantityType?: IQuantity[];
}

export const initalValueForm = {
  polid: '',
  podid: '',
  typeService: TYPE_SERVICE.FCL,
  cargoReady: 1,
  commodities: [''],
  containers: [''],
  paginateRequest: {
    currentPage: DEFAULT_PAGINATION.current,
    pageSize: DEFAULT_PAGINATION.pageSize,
  },
};

export default function FclOceanFreight() {
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

  const searchQuotationsMutation = useQuery({
    queryKey: [API_BOOKING.SEARCH_SEA, dataResearch],
    queryFn: () => searchQuotation(dataResearch),
    enabled: dataResearch.podid !== '',
    onSuccess: (data: ResponseWithPayload<IQuotationRequire>) => {
      const { currentPage, pageSize, totalPages } = data.data;
      data.status
        ? data.data.data.length === 0
          ? warning()
          : (setDataTableResearch(
              data.data.data.map((data) => ({
                key: data.seaQuotationID,
                polid: data.polid,
                polName: data.polName,
                podid: data.podid,
                podName: data.podName,
                commodityID: data.commodityID,
                commodityName: data.commodityName,
                seaQuotationDetailDTOs: data.seaQuotationDetailDTOs,
              }))
            ),
            setPagination({
              current: currentPage,
              pageSize: pageSize,
              total: totalPages,
            }))
        : (errorToast(data.message), warning());
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
      warning();
    },
  });

  const onFinish = (formValues: IRequireSearchQuotation) => {
    const _requestData = {
      polid: formValues.polid,
      podid: formValues.podid,
      typeService: TYPE_SERVICE.FCL,
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
        trafficPol: formValues.trafficPol,
        trafficPod: formValues.trafficPod,
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
    setDataResearch(_requestData);
    if (
      _requestData.polid === dataResearch.polid &&
      _requestData.podid === dataResearch.podid &&
      _requestData.cargoReady === dataResearch.cargoReady &&
      _requestData.commodities === dataResearch.commodities &&
      _requestData.containers === dataResearch.containers
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

  const warning = () => {
    Modal.warning({
      title: 'Your request did not match any existing records.',
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.bg}>
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex>
                <h1>Ocean Freight</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Find the right route for your goods with guaranteed container
                  allocation by ocean freight.
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
          />
          <TableReturn
            displayStep={displayStep}
            setDisplayStep={setDisplayStep}
            data={dataTableResearch}
            setDataPropsBooking={setDataPropsBooking}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
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
          <Step4 displayStep={displayStep} setDisplayStep={setDisplayStep} />
          <Step5 displayStep={displayStep} setDisplayStep={setDisplayStep} />
        </div>
      </Flex>
      <Service />
    </div>
  );
}
