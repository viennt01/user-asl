import React from 'react';
import style from '../index.module.scss';
import Information from './information';
import { IRequireTrackTrade } from '../interface';

interface Props {
  data?: IRequireTrackTrade;
}

export default function Result({ data }: Props) {
  return (
    <div className={style.result} style={{ display: data ? '' : 'none' }}>
      <Information data={data} />
    </div>
  );
}
