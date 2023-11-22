import React from 'react';
import style from '../index.module.scss';
import {
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Flex,
  Typography,
} from 'antd';
import COLORS from '@/constants/color';
const { Text } = Typography;
export default function Finish() {
  const items: DescriptionsProps['items'] = [
    {
      label: (
        <Flex
          align="center"
          justify="center"
          style={{ fontSize: '14px', fontWeight: '720' }}
        >
          Issued by
        </Flex>
      ),
      children: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>ASL system</div>
      ),
    },
    {
      label: (
        <Flex
          align="center"
          justify="center"
          style={{ fontSize: '14px', fontWeight: '720' }}
        >
          Email
        </Flex>
      ),
      children: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>
          thanhviennguyen01@gmail.com
        </div>
      ),
    },
    {
      label: (
        <Flex
          align="center"
          justify="center"
          style={{ fontSize: '14px', fontWeight: '720' }}
        >
          Possition
        </Flex>
      ),
      children: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>ASL system</div>
      ),
    },
    {
      label: (
        <Flex
          align="center"
          justify="center"
          style={{ fontSize: '14px', fontWeight: '720' }}
        >
          Mobile
        </Flex>
      ),
      children: (
        <div style={{ fontSize: '14px', fontWeight: '720' }}>0914730992</div>
      ),
    },
  ];

  return (
    <div className={style.finish} style={{ width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <Text strong italic style={{ color: COLORS.GREY_COLOR_HOVER }}>
          ASL Logistics
        </Text>{' '}
        <Text>
          trust that the above quotation have met your requirement. Should you
          require any further assistance or clarification, please do not
          hesitate to contact the our pricing team or salesman as bellow
          signature issued.
        </Text>
      </div>
      <div>
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
          <Descriptions
            style={{ width: '100%' }}
            bordered
            column={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
            items={items}
          />
        </ConfigProvider>
        <Flex
          align="center"
          justify="center"
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: COLORS.GREY_COLOR_HOVER,
            color: COLORS.WHITE,
            fontSize: '18px',
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          THANK YOU FOR YOUR SUPPORTING TO ASL LOGISTICS
        </Flex>
      </div>
    </div>
  );
}
