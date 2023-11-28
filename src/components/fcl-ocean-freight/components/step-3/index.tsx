import React, { useState } from 'react';
import style from './index.module.scss';

import Information from './information';
import ServiceStep3 from './description';
import { IDataStep2Props } from '../..';

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  dataStep2PropsBooking: IDataStep2Props | undefined;
}

export default function Step3({
  displayStep,
  setDisplayStep,
  dataStep2PropsBooking,
}: Props) {
  console.log(dataStep2PropsBooking);
  
  return (
    <div
      className={style.step3}
      style={{
        display: displayStep === 3 ? '' : 'none',
      }}
    >
      <Information />
      <div>
        <ServiceStep3 setDisplayStep={setDisplayStep} />
      </div>
    </div>
  );
}
