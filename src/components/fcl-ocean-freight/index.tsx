import React, { useState } from 'react';
import style from './index.module.scss';
import { Flex, Form, PaginationProps } from 'antd';
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
  TYPE_SERVICE,
} from './interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { searchQuotation } from './fetcher';
import { errorToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import { API_BOOKING, API_LOCATION } from '@/fetcherAxios/endpoint';
import { ResponseWithPayload } from '@/fetcherAxios';

export interface IDataBookingProps {
  idQuotation: string;
}

export const initalValueProps = {
  idQuotation: '',
};

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
  const [form] = Form.useForm();
  const [dataTableResearch, setDataTableResearch] = useState<IQuotationTable[]>(
    []
  );
  const [dataResearch, setDataResearch] = useState<IRequireSearchQuotation>(initalValueForm);

  const [displayStep, setDisplayStep] = useState<number>(5);
  const [dataPropsBooking, setDataPropsBooking] =
    useState<IDataBookingProps>(initalValueProps);
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);

  const searchQuotationsMutation = useQuery({
    queryKey: [API_BOOKING.SEARCH_SEA],
    queryFn: () => searchQuotation(dataResearch),
    enabled: dataResearch.podid !== '',
    onSuccess: (data: ResponseWithPayload<IQuotationRequire>) => {
      const { currentPage, pageSize, totalPages } = data.data;
      data.status
        ? (setDataTableResearch(
            data.data.data.map((data) => ({
              key: data.seaQuotationID,
              polid: data.podid,
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
        : errorToast(data.message);
    },
    onError() {
      errorToast(API_MESSAGE.ERROR);
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
    setDataResearch(_requestData);
    // searchQuotationsMutation.mutate(_requestData);
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
          />
          <TableReturn
            displayStep={displayStep}
            setDisplayStep={setDisplayStep}
            data={dataTableResearch}
            setDataPropsBooking={setDataPropsBooking}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
          />
          <Step2 displayStep={displayStep} setDisplayStep={setDisplayStep} />
          <Step3 displayStep={displayStep} setDisplayStep={setDisplayStep} />
          <Step4 displayStep={displayStep} setDisplayStep={setDisplayStep} />
          <Step5 displayStep={displayStep} setDisplayStep={setDisplayStep} />
        </div>
      </Flex>
      <Service />
    </div>
  );
}
