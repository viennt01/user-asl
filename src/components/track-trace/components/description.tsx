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
      label: <div className={style.titleDescription}>transID</div>,
      children: <>{data?.transID}</>,
    },
    {
      key: '2',
      label: <div className={style.titleDescription}>hwbno</div>,
      children: <>{data?.hwbno}</>,
    },
    {
      key: '3',
      label: <div className={style.titleDescription}>isSeaLCL</div>,
      children: <>{data?.isSealFCL}</>,
    },
    {
      key: '3.1',
      label: <div className={style.titleDescription}>isSealFCL</div>,
      children: <>{data?.isSealFCL}</>,
    },
    {
      key: '4',
      label: <div className={style.titleDescription}>pot</div>,
      children: <>{data?.pot}</>,
    },
    {
      key: '5',
      label: <div className={style.titleDescription}>documentReleaseDate</div>,
      children: <>{data?.documentReleaseDate}</>,
    },
    {
      key: '7',
      label: <div className={style.titleDescription}>etdt</div>,
      children: <>{data?.etdt}</>,
    },
    {
      key: '8',
      label: <div className={style.titleDescription}>etat</div>,
      children: <>{data?.etat}</>,
    },
    {
      key: '9',
      label: <div className={style.titleDescription}>containerType</div>,
      children: <>{data?.containerType}</>,
    },
    {
      key: '10',
      label: <div className={style.titleDescription}>containerNo</div>,
      children: <>{data?.containerNo}</>,
    },
    {
      key: '11',
      label: <div className={style.titleDescription}>sealNo</div>,
      children: <>{data?.sealNo}</>,
    },
    {
      key: '12',
      label: <div className={style.titleDescription}>qtyPkg</div>,
      children: <>{data?.qtyPkg}</>,
    },
    {
      key: '13',
      label: <div className={style.titleDescription}>unitPkg</div>,
      children: <>{data?.unitPkg}</>,
    },
    {
      key: '14',
      label: <div className={style.titleDescription}>descriptionOfGood</div>,
      children: <>{data?.descriptionOfGood}</>,
    },
    {
      key: '15',
      label: <div className={style.titleDescription}>gw</div>,
      children: <>{data?.gw}</>,
    },
    {
      key: '16',
      label: <div className={style.titleDescription}>cbm</div>,
      children: <>{data?.cbm}</>,
    },
    {
      key: '17',
      label: <div className={style.titleDescription}>isPart</div>,
      children: <>{data?.isPart}</>,
    },
    {
      key: '18',
      label: <div className={style.titleDescription}>noPieces</div>,
      children: <>{data?.noPieces}</>,
    },
    {
      key: '19',
      label: <div className={style.titleDescription}>totalGW</div>,
      children: <>{data?.totalGW}</>,
    },
    {
      key: '20',
      label: <div className={style.titleDescription}>totalCBM</div>,
      children: <>{data?.totalCBM}</>,
    },
    {
      key: '21',
      label: <div className={style.titleDescription}>localVessel</div>,
      children: <>{data?.localVessel}</>,
    },
    {
      key: '22',
      label: <div className={style.titleDescription}>oceanVessel</div>,
      children: <>{data?.oceanVessel}</>,
    },
  ];
  return (
    <div className={style.description}>
      <ConfigProvider
        theme={{
          components: {
            Descriptions: {
              colorTextSecondary: COLORS.GREY_COLOR_HOVER,
              colorFillAlter: '#e7eeff',
              colorSplit: '#000',
              borderRadiusLG: 0,
            },
          },
        }}
      >
        <Descriptions bordered items={items} />
      </ConfigProvider>
    </div>
  );
}
