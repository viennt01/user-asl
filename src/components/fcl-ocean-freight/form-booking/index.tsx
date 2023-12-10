import React from 'react';
import { IDataBookingProps } from '..';
import CustomerInformation from './customer-information';
import ShipmentDetail from './shipment-details';
import QuotationDetail from './sea-quotation-detail';
import SeaOtherCharges from './sea-other-charge';
import TermsConditions from './terms-conditions';
import OtherServiceCharges from './other-service-charges';
import Finish from './finish';
import { Image } from 'antd';

interface Props {
  dataPropsBooking: IDataBookingProps;
}

export default function FormBooking({ dataPropsBooking }: Props) {
  return (
    <div>
      <div
        // span={24}
        style={{
          marginBottom: '24px',
          width: '100%',
        }}
      >
        <Image
          src={'/images/oceanFreight/contactAsl.png'}
          preview={false}
          style={{
            width: '100%',
          }}
        />
      </div>
      <CustomerInformation dataPropsBooking={dataPropsBooking} />
      <ShipmentDetail dataPropsBooking={dataPropsBooking} />
      <QuotationDetail dataPropsBooking={dataPropsBooking} />
      <SeaOtherCharges dataPropsBooking={dataPropsBooking} />
      <TermsConditions />
      <OtherServiceCharges dataPropsBooking={dataPropsBooking} />
      <Finish dataPropsBooking={dataPropsBooking} />
    </div>
  );
}
