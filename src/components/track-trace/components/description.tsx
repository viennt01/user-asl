import React from 'react';
import style from '../index.module.scss';
import {
  Col,
  Flex,
  Row,
  Image,
  Descriptions,
  DescriptionsProps,
  ConfigProvider,
} from 'antd';
import { IRequireTrackTrade } from '../interface';
import { formatDate } from '@/utils/format-number';
import COLORS from '@/constants/color';

interface Props {
  data?: IRequireTrackTrade;
}

export default function Description({ data }: Props) {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: <div className={style.titleDescription}>REF NO</div>,
      children: <>{data?.refNo}</>,
    },
    {
      key: '4',
      label: <div className={style.titleDescription}>Conform Job No</div>,
      children: <>{data?.conformJobNo}</>,
    },
    {
      key: '2',
      label: <div className={style.titleDescription}>HWB</div>,
      children: <>{data?.hwbno}</>,
    },
    {
      key: '7',
      label: <div className={style.titleDescription}>ETD PORT OF TRANSIT</div>,
      children: <>{data?.etd}</>,
    },
    {
      key: '8',
      label: <div className={style.titleDescription}>ETA PORT OF TRANSIT</div>,
      children: <>{data?.eta}</>,
    },

    {
      key: '21',
      label: <div className={style.titleDescription}>LOCAL VESSEL</div>,
      children: <>{data?.estimatedVessel}</>,
    },
  ];
  return (
    <div className={style.description}>
      <ConfigProvider
        theme={{
          components: {
            Descriptions: {},
          },
        }}
      >
        <Descriptions
          bordered
          items={items}
          column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        />
      </ConfigProvider>
    </div>
  );
}
