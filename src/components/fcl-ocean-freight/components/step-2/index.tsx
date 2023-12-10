import React, { useState } from 'react';
import style from './index.module.scss';
import Information from './information';
import EditDescription from './editDescription';
import { IDataBookingProps, IDataStep2Props } from '../..';
import { API_FEE_GROUP, API_SEA_QUOTATION } from '@/fetcherAxios/endpoint';
import { useQuery } from '@tanstack/react-query';
import { getFeeWithFeeGroup, getSeaQuotationDetail } from '../../fetcher';
import dayjs from 'dayjs';
import { FeeTable } from '../../interface';

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  dataPropsBooking: IDataBookingProps;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
  setDataStep2PropsBooking: React.Dispatch<
    React.SetStateAction<IDataStep2Props | undefined>
  >;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}

export default function Step2({
  displayStep,
  setDisplayStep,
  dataPropsBooking,
  setDataPropsBooking,
  setDataStep2PropsBooking,
  dataStep2PropsBooking,
}: Props) {
  const { idQuotation } = dataPropsBooking;
  const [dataFeeTable, setDataFeeTable] = useState<FeeTable[]>([]);
  const [feeGroupID, setFeeGroupID] = useState<string[]>([]);

  useQuery({
    queryKey: [API_SEA_QUOTATION.GET_DETAIL, idQuotation],
    queryFn: () => getSeaQuotationDetail(idQuotation as string),
    enabled: idQuotation !== '',
    onSuccess: (data) => {
      if (data.status) {
        setDataPropsBooking((pre) => ({
          ...pre,
          dataQuotation: {
            seaQuotationID: data.data.seaQuotationID,
            podid: data.data.podid,
            polid: data.data.polid,
            podName: data.data.podName,
            polName: data.data.polName,
            commodityID: data.data.commodityID,
            vendor: data.data.vendor,
            note: data.data.note,
            dateEffect: dayjs(Number(data.data.dateEffect)),
            validityDate: dayjs(Number(data.data.validityDate)),
            freqDate: data.data.freqDate,
            demSeaQuotation: data.data.demSeaQuotation,
            detSeaQuotation: data.data.detSeaQuotation,
            stoSeaQuotation: data.data.stoSeaQuotation,
            lclMinSeaQuotation: data.data.lclMinSeaQuotation,
            lclSeaQuotation: data.data.lclSeaQuotation,
            currencyID: data.data.currencyID,
            public: data.data.public,
            statusSeaQuotation: data.data.statusSeaQuotation,
            seaQuotationDetailDTOs: data.data.seaQuotationDetailDTOs,
            seaQuotaionFeeGroupDTOs: data.data.seaQuotaionFeeGroupDTOs,
            dateInserted: data.data.dateInserted,
            insertedByUser: data.data.insertedByUser,
            dateUpdated: data.data.dateUpdated,
            updatedByUser: data.data.updatedByUser,
            confirmDated: data.data.confirmDated,
            confirmByUser: data.data.confirmByUser,
            salesLeadsSeaQuotationDTOs: data.data.salesLeadsSeaQuotationDTOs,
            seaQuotaionGroupPartnerDTOs: data.data.seaQuotaionGroupPartnerDTOs,
          },
        }));
        setFeeGroupID(
          data.data.seaQuotaionFeeGroupDTOs.map((data) => data.feeGroupID)
        );
      } else {
        setDisplayStep(1);
      }
    },
  });

  useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP, feeGroupID],
    queryFn: () => getFeeWithFeeGroup({ id: feeGroupID }),
    enabled: feeGroupID !== undefined,
    onSuccess(data) {
      setDataFeeTable([]);
      if (data.status) {
        if (data.data) {
          setDataFeeTable(data.data);
        }
      }
    },
  });

  return (
    <div
      className={style.step2}
      style={{
        display: displayStep === 2.2 ? '' : 'none',
      }}
    >
      <Information
        dataPropsBooking={dataPropsBooking}
        dataQuotation={dataPropsBooking?.dataQuotation}
      />
      <div
        style={{
          display: displayStep === 2.2 ? '' : 'none',
        }}
      >
        <EditDescription
          setDisplayStep={setDisplayStep}
          setDataPropsBooking={setDataPropsBooking}
          dataPropsBooking={dataPropsBooking}
          dataQuotation={dataPropsBooking?.dataQuotation}
          dataFeeTable={dataFeeTable}
          setDataStep2PropsBooking={setDataStep2PropsBooking}
          dataStep2PropsBooking={dataStep2PropsBooking}
        />
      </div>
    </div>
  );
}
