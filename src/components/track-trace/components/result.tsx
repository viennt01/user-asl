import React from 'react';
import style from '../index.module.scss';
import Information from './information';
import { IRequireTrackTrade } from '../interface';
import Description from './description';

interface Props {
  data?: IRequireTrackTrade;
}

export default function Result({ data }: Props) {
  return (
    <div className={style.result} style={{ display: data ? '' : 'none' }}>
      <Information data={data} />
      <Description data={data} />
    </div>
  );
}
