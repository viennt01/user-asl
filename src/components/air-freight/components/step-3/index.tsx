import React from 'react';
import style from './index.module.scss';
import ServiceStep3 from './description';
import { IDataBookingProps, IDataStep2Props } from '../..';
import Information from './information';

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  dataStep2PropsBooking: IDataStep2Props | undefined;
  dataPropsBooking: IDataBookingProps;
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
}

export default function Step3({
  displayStep,
  setDisplayStep,
  dataStep2PropsBooking,
  dataPropsBooking,
  setDataPropsBooking,
}: Props) {

  return (
    <div
      className={style.step3}
      style={{
        display: displayStep === 3 ? '' : 'none',
      }}
    >
      <Information
        dataPropsBooking={dataPropsBooking}
        dataQuotation={dataPropsBooking?.dataQuotation}
      />
      <div>
        <ServiceStep3
          setDisplayStep={setDisplayStep}
          dataStep2PropsBooking={dataStep2PropsBooking}
          dataPropsBooking={dataPropsBooking}
          setDataPropsBooking={setDataPropsBooking}
        />
      </div>
    </div>
  );
}
