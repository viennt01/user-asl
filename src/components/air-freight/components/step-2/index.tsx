import React, { useState } from 'react';
import style from './index.module.scss';
import Information from './information';
import EditDescription from './editDescription';
import { IDataBookingProps, IDataStep2Props } from '../..';
import { API_FEE_GROUP, API_SEA_QUOTATION } from '@/fetcherAxios/endpoint';
import { useQuery } from '@tanstack/react-query';
import { getSeaQuotationDetail } from '../../fetcher';
import dayjs from 'dayjs';
import { getFeeWithFeeGroup } from '@/components/fcl-ocean-freight/fetcher';
import { FeeTable } from '@/components/fcl-ocean-freight/interface';

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
            airQuotationID: data.data.airQuotationID,
            aodid: data.data.aodid,
            aolid: data.data.aolid,
            aodName: data.data.aodName,
            aolName: data.data.aolName,
            commodityID: data.data.commodityID,
            note: data.data.note,
            validityDate: dayjs(Number(data.data.validityDate)),
            effectDated: dayjs(Number(data.data.effectDated)),
            freqDate: data.data.freqDate,
            currencyID: data.data.currencyID,
            public: data.data.public,
            statusAirQuotation: data.data.statusAirQuotation,
            fscAirQuotation: data.data.fscAirQuotation,
            sscAirQuotation: data.data.sscAirQuotation,
            loadCapacityMinAirQuotation: data.data.loadCapacityMinAirQuotation,
            priceLoadCapacityMinAirQuotation:
              data.data.priceLoadCapacityMinAirQuotation,
            gw: data.data.public,
            forNewUser: data.data.public,
            vendorID: data.data.vendorID,
            transitTimeAirQuotation: data.data.transitTimeAirQuotation,
            airQuotationDetailDTOs: data.data.airQuotationDetailDTOs,
            airQuotaionFeeGroupDTOs: data.data.airQuotaionFeeGroupDTOs,
            salesLeadsAirQuotationDTOs: data.data.salesLeadsAirQuotationDTOs,
            airPricingID: data.data.airPricingID,
            dateInserted: data.data.dateInserted,
            insertedByUser: data.data.insertedByUser,
            dateUpdated: data.data.dateUpdated,
            updatedByUser: data.data.updatedByUser,
          },
        }));
        setFeeGroupID(
          data.data.airQuotaionFeeGroupDTOs.map((data) => data.feeGroupID)
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
