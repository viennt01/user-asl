import React, { useState } from 'react';
import style from './index.module.scss';
import Information from './information';
import EditDescription from './description';
import { IDataBookingProps, IDataStep2Props } from '../..';
import { API_FEE_GROUP, API_SEA_QUOTATION } from '@/fetcherAxios/endpoint';
import { useQuery } from '@tanstack/react-query';
import { getQuotationDetail } from '../../fetcher';
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
    queryFn: () => getQuotationDetail(idQuotation as string),
    enabled: idQuotation !== '',
    onSuccess: (data) => {
      if (data.status) {
        setDataPropsBooking((pre) => ({
          ...pre,
          dataQuotation: {
            truckingQuotationID: data.data.truckingQuotationID,
            truckingPricingID: data.data.truckingPricingID,
            truckingQuotationNo: data.data.truckingQuotationNo,
            pickupID: data.data.pickupID,
            deliveryID: data.data.deliveryID,
            commodityID: data.data.commodityID,
            currencyID: data.data.currencyID,
            vendorID: data.data.vendorID,
            note: data.data.note,
            effectDated: dayjs(Number(data.data.effectDated)),
            validityDate: dayjs(Number(data.data.effectDated)),
            freqDate: data.data.freqDate,
            forNewUser: data.data.forNewUser,
            public: data.data.public,
            statusTruckingQuotation: data.data.statusTruckingQuotation,
            transitTimetruckingPricing: data.data.transitTimetruckingPricing,
            pickupName: data.data.pickupName,
            deliveryName: data.data.deliveryName,
            commodityName: data.data.commodityName,
            currencyAbbreviations: data.data.currencyAbbreviations,
            dateInserted: data.data.dateInserted,
            insertedByUser: data.data.insertedByUser,
            dateUpdated: data.data.dateUpdated,
            updatedByUser: data.data.updatedByUser,
            confirmDated: data.data.confirmDated,
            confirmByUser: data.data.confirmByUser,
            truckingQuotationDetailByContainerTypeDTOs:
              data.data.truckingQuotationDetailByContainerTypeDTOs,
            truckingQuotationDetailByLoadCapacityDTOs:
              data.data.truckingQuotationDetailByLoadCapacityDTOs,
            truckingQuotationFeeGroupDTOs:
              data.data.truckingQuotationFeeGroupDTOs,
            salesLeadsTruckingQuotationDTOs:
              data.data.salesLeadsTruckingQuotationDTOs,
            truckingQuotaionGroupPartnerDTOs:
              data.data.truckingQuotaionGroupPartnerDTOs,
          },
        }));
        setFeeGroupID(
          data.data.truckingQuotationFeeGroupDTOs.map((data) => data.feeGroupID)
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
