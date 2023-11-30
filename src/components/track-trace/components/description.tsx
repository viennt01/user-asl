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
      label: <div className={style.titleDescription}>TRANS</div>,
      children: <>{data?.transID}</>,
    },
    {
      key: '2',
      label: <div className={style.titleDescription}>HWB</div>,
      children: <>{data?.hwbno}</>,
    },
    {
      key: '3',
      label: <div className={style.titleDescription}>SEA</div>,
      children: (
        <>
          {data?.isSealFCL === true ? 'FCL' : ''}
          {data?.isSeaLCL === true ? 'LCL' : ''}
        </>
      ),
    },
    {
      key: '4',
      label: <div className={style.titleDescription}>POT</div>,
      children: <>{data?.pot}</>,
    },
    {
      key: '7',
      label: <div className={style.titleDescription}>ETD PORT OF TRANSIT</div>,
      children: <>{data?.etdt}</>,
    },
    {
      key: '8',
      label: <div className={style.titleDescription}>ETA PORT OF TRANSIT</div>,
      children: <>{data?.etat}</>,
    },
    {
      key: '10',
      label: <div className={style.titleDescription}>CONTAINER NO</div>,
      children: <>{data?.containerNo}</>,
    },
    {
      key: '9',
      label: <div className={style.titleDescription}>CONTAINER TYPE</div>,
      children: <>{data?.containerType}</>,
    },
    {
      key: '11',
      label: (
        <div className={style.titleDescription}>
          CNTR/SEAL/SIZE RELEASE DATE
        </div>
      ),
      children: <>{data?.sealNo}</>,
    },
    {
      key: '5',
      label: <div className={style.titleDescription}>CARGO RELEASE DATE</div>,
      children: <>{formatDate(Number(data?.documentReleaseDate))}</>,
    },
    {
      key: '12',
      label: <div className={style.titleDescription}>QTY PKG</div>,
      children: <>{data?.qtyPkg}</>,
    },
    {
      key: '13',
      label: <div className={style.titleDescription}>UNIT PKG</div>,
      children: <>{data?.unitPkg}</>,
    },
    {
      key: '15',
      label: <div className={style.titleDescription}>GW</div>,
      children: <>{data?.gw}</>,
    },
    {
      key: '19',
      label: <div className={style.titleDescription}>TOTAL GW</div>,
      children: <>{data?.totalGW}</>,
    },
    {
      key: '16',
      label: <div className={style.titleDescription}>CBM</div>,
      children: <>{data?.cbm}</>,
    },
    {
      key: '20',
      label: <div className={style.titleDescription}>TOTAL CBM</div>,
      children: <>{data?.totalCBM}</>,
    },
    {
      key: '17',
      label: <div className={style.titleDescription}>PART</div>,
      children: <>{data?.isPart}</>,
    },
    {
      key: '18',
      label: <div className={style.titleDescription}>PIECES NO</div>,
      children: <>{data?.noPieces}</>,
    },

    {
      key: '21',
      label: <div className={style.titleDescription}>LOCAL VESSEL</div>,
      children: <>{data?.localVessel}</>,
    },
    {
      key: '22',
      label: <div className={style.titleDescription}>OCEAN VESSEL</div>,
      children: <>{data?.oceanVessel}</>,
    },
    {
      key: '14',
      label: <div className={style.titleDescription}>DESCRIPTION OF GOODS</div>,
      children: <>{data?.descriptionOfGood}</>,
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
